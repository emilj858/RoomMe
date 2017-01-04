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
    public class ConversationsController : ApiController
    {
        private RoomMeDataContext db = new RoomMeDataContext();

        // GET: api/Conversations
        [Authorize]
        public IHttpActionResult GetConversations()
        {
            var username = User.Identity.Name;

            var user = db.Users.FirstOrDefault(u => u.UserName == username);

            var resultSet = db.Conversations
                .Where(c => c.User1Id == user.Id || c.User2Id == user.Id)
                .Select(c => new
                {
                    c.ConversationId,
                    c.User1Id,
                    c.User2Id
                });

            return Ok(resultSet);
        }

        // GET: api/Conversations/5
        [Authorize]
        [ResponseType(typeof(Conversation))]
        public IHttpActionResult GetConversation(int id)
        {
            Conversation conversation = db.Conversations.Find(id);
            if (conversation == null)
            {
                return NotFound();
            }
            var resultSet = db.Conversations.Select(c => new
            {
                c.ConversationId,
                c.User1Id,
                c.User2Id

            });
            return Ok(resultSet);
        }




        // POST: api/Conversations
        [Authorize]
        [ResponseType(typeof(Conversation))]
        public IHttpActionResult PostConversation(Conversation conversation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Conversations.Add(conversation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = conversation.ConversationId }, conversation);
        }




        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ConversationExists(int id)
        {
            return db.Conversations.Count(e => e.ConversationId == id) > 0;
        }
    }
}