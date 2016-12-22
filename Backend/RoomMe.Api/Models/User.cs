using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RoomMe.Api.Models
{
    public class User : IdentityUser
    {
        // custom fields + relationships go here

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public virtual ICollection<Listing> Listings { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Conversation> SentConversations { get; set; }
        public virtual ICollection<Conversation> ReceivedConversations { get; set; }

        public virtual ICollection<Message> Messages { get; set; }

    }
}