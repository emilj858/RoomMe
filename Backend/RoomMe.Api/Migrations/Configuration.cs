namespace RoomMe.Api.Migrations
{
    using Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RoomMe.Api.Infrastructure.RoomMeDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RoomMe.Api.Infrastructure.RoomMeDataContext context)
        { 
            #region Generate random users
            if (context.Users.Count() == 0)
            {
                var store = new UserStore<User>(context);

                using (var manager = new UserManager<User>(store))
                {
                    for (int i = 0; i < 100; i++)
                    {
                        string randomEmailAddress = Faker.Internet.Email();

                        var user = new User
                        {
                            Id = Guid.NewGuid().ToString(),
                            UserName = randomEmailAddress,
                            FirstName = Faker.Name.First(),
                            LastName = Faker.Name.Last(),
                            Email = randomEmailAddress,
                            PhoneNumber = Faker.Phone.Number()
                        };

                        manager.Create(user, "password123");
                    }
                }
            }
            #endregion

            context = new RoomMeDataContext();

            #region Generate random listings
            foreach (var user in context.Users)
            {
                int numberOfListings = Faker.RandomNumber.Next(0, 5);

                for(int i = 0; i < numberOfListings; i++)
                {
                    var listing = new Listing
                    {
                        UserId = user.Id,
                        Address = Faker.Address.StreetAddress(),
                        City = Faker.Address.City(),
                        State = Faker.Address.UsState(),
                        Zip = Faker.Address.ZipCode(),
                        Description = Faker.Company.BS(),
                        Price = Faker.RandomNumber.Next(100, 10000),
                        Latitude = (float)new Bogus.Faker().Address.Latitude(),
                        Longitude = (float)new Bogus.Faker().Address.Longitude()
                    };

                    context.Listings.Add(listing);
                }
            }

            context.SaveChanges();
            #endregion

            #region Generate random photos for listings
            foreach (var listing in context.Listings)
            {
                int numberOfPhotos = Faker.RandomNumber.Next(0, 5);

                for (int j = 0; j < numberOfPhotos; j++)
                {
                    context.ListingPhotoes.Add(new ListingPhoto
                    {
                        ListingId = listing.ListingId,
                        Title = Faker.Company.BS(),
                        Url = new Bogus.Faker().Image.City(randomize: false)
                    });
                }
            }

            context.SaveChanges();
            #endregion
        }
    }
}
