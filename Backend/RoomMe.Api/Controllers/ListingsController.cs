using System;
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

namespace RoomMe.Api.Controllers
{
    public class ListingsController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Listings
        public IHttpActionResult GetListings()
        {
            var resultSet = db.Listings.Select(l => new
            {
                l.ListingId,
                l.UserId,
                l.Address,
                l.City,
                l.State,
                l.Zip,
                l.Price,
                l.Description
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
            var resultSet = db.Listings.Select(l => new
            {
                l.ListingId,
                l.UserId,
                l.Address,
                l.City,
                l.State,
                l.Zip,
                l.Price,
                l.Description
            });
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
            dbListing.Description = listing.Description;

            db.Entry(listing).State = EntityState.Modified;

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

            db.Listings.Add(listing);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = listing.ListingId }, listing);
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