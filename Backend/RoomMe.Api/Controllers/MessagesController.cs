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
    public class MessagesController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Messages
        [Authorize]
        public IHttpActionResult GetMessages()
        {
            var resultSet = db.Messages.Select(m => new
            {
                m.ConversationId,
                m.MessageId,
                m.Text,
                m.UserId,
                m.CreatedAt
            });
            return Ok(resultSet);
        }

        // POST: api/Messages
        [Authorize]
        public IHttpActionResult PostMessage(Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Messages.Add(message);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = message.MessageId }, message);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MessageExists(int id)
        {
            return db.Messages.Count(e => e.MessageId == id) > 0;
        }
    }
}