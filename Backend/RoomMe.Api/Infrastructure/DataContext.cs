using RoomMe.Api.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace RoomMe.Api.Infrastructure
{
    public class RoomMeDataContext : IdentityDbContext<User>
    {
        public RoomMeDataContext() : base("RoomMe.Api")
        {

        }
        public IDbSet<Listing> Listings { get; set; }
        public IDbSet<ListingPhoto> ListingPhotoes { get; set; }
        public IDbSet<Message> Messages { get; set; }
        public IDbSet<Favorite> Favorites { get; set; }
        public IDbSet<Conversation> Conversations { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //user has many messages
            modelBuilder.Entity<User>()
                .HasMany(u => u.Messages)
                .WithOptional(m => m.User)
                .HasForeignKey(m => m.UserId);
             

            //user has many received convos
            modelBuilder.Entity<User>()
                .HasMany(u => u.ReceivedConversations)
                .WithOptional(r => r.User2)
                .HasForeignKey(r => r.User2Id);

            //user has many many sent convos
            modelBuilder.Entity<User>()
                .HasMany(u => u.SentConversations)
                .WithOptional(r => r.User1)
                .HasForeignKey(r => r.User1Id);

            //user has many favs
            modelBuilder.Entity<User>()
                .HasMany(u => u.Favorites)
                .WithRequired(f => f.User)
                .HasForeignKey(f => f.UserId);

            //user has many listings
            modelBuilder.Entity<User>()
                .HasMany(u => u.Listings)
                .WithRequired(l => l.User)
                .HasForeignKey(l => l.UserId);

            //listing has many photoes
            modelBuilder.Entity<Listing>()
                .HasMany(l => l.ListingPhotoes)
                .WithRequired(lp => lp.Listing)
                .HasForeignKey(lp => lp.ListingId);

            //listing has many favorites
            modelBuilder.Entity<Listing>()
                .HasMany(l => l.Favorites)
                .WithRequired(f => f.Listing)
                .HasForeignKey(f => f.ListingId)
                .WillCascadeOnDelete(false);

            //convo has many messages
            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithRequired(m => m.Conversation)
                .HasForeignKey(m => m.ConversationId);

            // compound key for favorites using listings and users
            modelBuilder.Entity<Favorite>()
                .HasKey(f => new
                {
                    f.ListingId, f.UserId
                });

        }

       
    }
}