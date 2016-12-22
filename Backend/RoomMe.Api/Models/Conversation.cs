using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class Conversation
    {
        public int ConversationId { get; set; }
        public string User1Id { get; set; }
        public string User2Id { get; set; }
        public virtual User User1 { get; set; }

        public virtual User User2 { get; set; }
        public virtual ICollection <Message> Messages { get; set; }
        
    }
}