using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RoomMe.Api.Models
{
    public class ListingPhoto
    {
        public int ListingPhotoId { get; set; }
        [Required]
        public int ListingId { get; set; }
        [Required]
        public string Url { get; set; }
        public string Title { get; set; }
        public virtual Listing Listing { get; set; }

    }
}