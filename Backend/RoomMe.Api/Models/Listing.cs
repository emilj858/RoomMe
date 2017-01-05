using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class Listing
    {
        public Listing()
        {
            Favorites = new Collection<Favorite>();
            ListingPhotoes = new Collection<ListingPhoto>();
        }
        public int ListingId { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        [Required]
        public string Zip { get; set; }
        public decimal Price { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }
        public string Description { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<ListingPhoto> ListingPhotoes { get; set; } 
    }
}