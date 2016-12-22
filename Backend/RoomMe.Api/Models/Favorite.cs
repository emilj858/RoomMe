using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class Favorite
    {
        public int FavoriteId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public int ListingId { get; set; }
        public virtual Listing Listing { get; set; }
        public virtual User User { get; set; }

    }
}