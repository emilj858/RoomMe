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
    public class ListingPhotoesController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/ListingPhotoes
        [Authorize]
        public IHttpActionResult GetListingPhotoes()
        {
            var resultSet = db.ListingPhotoes.Select(lp => new
            {
                lp.ListingId,
                lp.ListingPhotoId,
                lp.Title,
                lp.Url
            });
            return Ok(resultSet);
        }

        // GET: api/ListingPhotoes/5
        [Authorize]
        public IHttpActionResult GetListingPhoto(int id)
        {
            ListingPhoto listingPhoto = db.ListingPhotoes.Find(id);
            if (listingPhoto == null)
            {
                return NotFound();
            }

            var resultSet = db.ListingPhotoes.Select(lp => new
            {
                lp.ListingId,
                lp.ListingPhotoId,
                lp.Title,
                lp.Url
            });
            return Ok(resultSet);
        }

        // POST: api/ListingPhotoes
        [Authorize]
        public IHttpActionResult PostListingPhoto(ListingPhoto listingPhoto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ListingPhotoes.Add(listingPhoto);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = listingPhoto.ListingPhotoId }, listingPhoto);
        }

        // DELETE: api/ListingPhotoes/5
        [Authorize]
        public IHttpActionResult DeleteListingPhoto(int id)
        {
            ListingPhoto listingPhoto = db.ListingPhotoes.Find(id);
            if (listingPhoto == null)
            {
                return NotFound();
            }

            db.ListingPhotoes.Remove(listingPhoto);
            db.SaveChanges();

            return Ok(listingPhoto);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingPhotoExists(int id)
        {
            return db.ListingPhotoes.Count(e => e.ListingPhotoId == id) > 0;
        }
    }
}