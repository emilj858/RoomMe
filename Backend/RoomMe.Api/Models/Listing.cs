using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class Listing
    {
        public int ListingId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        [Required]
        public string Zip { get; set; }
        public string Price { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
        public string Description { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<ListingPhoto> ListingPhotoes { get; set; } 
    }
}