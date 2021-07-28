using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Member;
using Core.Entities;
using Core.Entities.Member.Parameters;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<Like>> GetUserLikes(LikesParams likesParams);

    }
}