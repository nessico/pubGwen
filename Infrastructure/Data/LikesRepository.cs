using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Member.Parameters;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Core.Entities.Member;

namespace Infrastructure.Data.Identity
{

    // Joint query
    public class LikesRepository : ILikesRepository
    {
        private readonly IdentityDataContext _context;
        public LikesRepository(IdentityDataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int LikedUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, LikedUserId);
        }

        // List of users that liked this user
        public async Task<PagedList<Like>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likesParams.predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                users = likes.Select(like => like.LikedUser);
            }

            if (likesParams.predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == likesParams.UserId);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new Like
            {
                Username = user.UserName,
                DisplayName = user.DisplayName,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                Id = user.Id
            });

            return await PagedList<Like>.CreateAsync(likedUsers, likesParams.pageIndex, likesParams.PageSize);
        }

        // List of user that this user has liked
        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
            .Include(x => x.LikedUsers)
            .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}