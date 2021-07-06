using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Employee;
using Core.Entities;
using Core.Employee.Parameters;

namespace Core.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<Like>> GetUserLikes(LikesParams likesParams);

    }
}