﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RoomMe.Api.Infrastructure;
using RoomMe.Api.Models;
using Geocoding.Google;
using Geocoding;

namespace RoomMe.Api.Controllers
{
    public class ListingsController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Listings
        public IHttpActionResult GetListings()
        {
            var resultSet = db.Listings.OrderByDescending(l => l.ListingId).Select(l => new
            {
                l.ListingId,
                l.UserId,
                l.Address,
                l.City,
                l.State,
                l.Zip,
                l.Price,
                l.Longitude,
                l.Latitude,
                l.Description,
                ListingPhotoes = l.ListingPhotoes.Select(lp => new
                {
                    lp.ListingPhotoId,
                    lp.Url,
                    lp.Title
                })
                
    });
            return Ok(resultSet);
        }

        // GET: api/Listings/5
        [Authorize]
        [ResponseType(typeof(Listing))]
        public IHttpActionResult GetListing(int id)
        {
            Listing listing = db.Listings.Find(id);
            if (listing == null)
            {
                return NotFound();
            }
            var resultSet =  new
            {
                listing.ListingId,
                listing.UserId,
                listing.User.FirstName,
                listing.User.LastName,
                listing.User.Email,
                listing.Address,
                listing.City,
                listing.State,
                listing.Zip,
                listing.Price,
                listing.Longitude,
                listing.Latitude,
                listing.Description,
                ListingPhotoes = listing.ListingPhotoes.Select(lp => new
                {
                    lp.ListingPhotoId,
                    lp.Url,
                    lp.Title
                })
            };
            return Ok(resultSet);
        }

        // PUT: api/Listings/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutListing(int id, Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listing.ListingId)
            {
                return BadRequest();
            }

            var dbListing = db.Listings.Find(id);

            dbListing.Address = listing.Address;
            dbListing.City = listing.City;
            dbListing.State = listing.State;
            dbListing.Zip = listing.Zip;
            dbListing.Price = listing.Price;
            dbListing.Longitude = listing.Longitude;
            dbListing.Latitude = listing.Latitude;
            dbListing.Description = listing.Description;

            db.Entry(dbListing).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Listings
        [Authorize]
        [ResponseType(typeof(Listing))]
        public IHttpActionResult PostListing(Listing listing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.Identity.Name;

            var currentUser = db.Users.FirstOrDefault(u => u.UserName == username);

            // this is where we'll add lat/long
            IGeocoder geocoder = new GoogleGeocoder();
            var addresses = geocoder.Geocode($"{listing.Address}, {listing.City} {listing.State} {listing.Zip}");

            try
            {
                listing.UserId = currentUser.Id;
                listing.Latitude = addresses.First().Coordinates.Latitude;
                listing.Longitude = addresses.First().Coordinates.Longitude;
            }
            catch (Exception)
            {
            }

            db.Listings.Add(listing);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = listing.ListingId }, new
            {
                listing.ListingId,
                listing.UserId,
                listing.Latitude,
                listing.Longitude,
                listing.Address,
                listing.City,
                listing.Description,
                listing.Price,
                listing.State,
                listing.Zip
            });
        }

        // DELETE: api/Listings/5
        [Authorize]
        [ResponseType(typeof(Listing))]
        public IHttpActionResult DeleteListing(int id)
        {
            Listing listing = db.Listings.Find(id);
            if (listing == null)
            {
                return NotFound();
            }

            db.Listings.Remove(listing);
            db.SaveChanges();

            return Ok(listing);
        }

        
        //Post photo to listing
        [Authorize]
        [HttpPost, Route("api/listingPhotoes/{listingPhotoId}/{listingId}")]
        public IHttpActionResult AddListingPhotoToListing(int listingPhotoId, int listingId)
        {
            ListingPhoto listingPhoto = new ListingPhoto();

            listingPhoto.ListingPhotoId = listingPhotoId;
            listingPhoto.ListingId = listingId;

            db.ListingPhotoes.Add(listingPhoto);
            db.SaveChanges();

            return Ok();
        }

        //Delete photo of listing
        [Authorize]
        [HttpDelete, Route("api/listingPhotoes/{listingPhotoId}/{listingId}")]
        public IHttpActionResult DeleteListingPhotoFromListing(int listingPhotoId, int listingId)
        {
            var listingPhoto = db.ListingPhotoes.Find(listingPhotoId, listingId);
            db.ListingPhotoes.Remove(listingPhoto);
            db.SaveChanges();

            return Ok();
        }


       

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingExists(int id)
        {
            return db.Listings.Count(e => e.ListingId == id) > 0;
        }
    }
}