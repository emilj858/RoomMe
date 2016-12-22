using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        [Required]
        public int ConversationId { get; set; }
        public string UserId { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string Text { get; set; }
        public virtual Conversation Conversation { get; set; } 
        public virtual User User { get; set; }
        
   

    }
}