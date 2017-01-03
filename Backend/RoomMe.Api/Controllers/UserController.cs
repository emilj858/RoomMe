using RoomMe.Api.Infrastructure;
using RoomMe.Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web.Http;
using System.Web.Http.Description;
using System.Linq;

namespace RoomMe.Api.Controllers
{
    public class UsersController : ApiController
    {
        private UserManager<User> _userManager;
        private RoomMeDataContext db;

        public UsersController()
        {
            db = new RoomMeDataContext();
            var store = new UserStore<User>(db);

            _userManager = new UserManager<User>(store);
        }

        //GET: api/Users
        [Authorize]
        public IHttpActionResult GetUsers()
        {
            var resultSet = db.Users.Select(u => new
            {
                u.Id,
                u.FirstName,
                u.LastName
            

            });
            return Ok(resultSet);
        }
        // GET: api/users/5
        [Authorize]
        public IHttpActionResult GetUser(string id)
        {
            var user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName,              
                Listings = user.Listings.Select(l => new
                { 
                    l.ListingId,
                    l.Price,
                    l.Address,
                              
                }),
                Favorites = user.Favorites.Select(f => new
                {
                    f.FavoriteId,
                    f.Listing.ListingId,
                    f.Listing.Address,
                    f.Listing.Price
                })
            });
        }
        

        // POST: api/users/register
        [AllowAnonymous]
        [Route("api/users/register")]
        public IHttpActionResult Register(RegistrationModel registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                UserName = registration.EmailAddress,
                Email = registration.EmailAddress
            };

            var result = _userManager.Create(user, registration.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Invalid user registration");
            }
        }
        // PUT api/users/5
        [Authorize]
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdateUser(string id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != user.Id)
            {
                return BadRequest();
            }
            var dbUser = db.Users.Find(id);

            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.Email = user.Email;

            return Ok();
        }

        
        // DELETE api/users/5
        [Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser (string id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

         //Post Favorite to User
        [Authorize]
        [HttpPost, Route("api/favorites/{listingId}/{userId}")]
        public IHttpActionResult AddFavoriteToUser(int listingId, string userId)
        {
            Favorite favorite = new Favorite();

            favorite.ListingId = listingId;
            favorite.UserId = userId;

            db.Favorites.Add(favorite);
            db.SaveChanges();

            return Ok();
        }

        //Delete Favorite of User
        [Authorize]
        [HttpDelete, Route("api/favorites/{listingId}/{userId}")]
        public IHttpActionResult DeleteFavoriteFromUser(int listingId, string userId)
        {
            var favorite = db.Favorites.Find(listingId, userId);
            db.Favorites.Remove(favorite);
            db.SaveChanges();

            return Ok();
        }
        
        protected override void Dispose(bool disposing)
        {
            _userManager.Dispose();
        }

      
    }

    
}