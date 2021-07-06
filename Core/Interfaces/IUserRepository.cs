using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Employee;
using Core.Entities;
using Core.Employee.Parameters;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<Member>> GetMembersAsync(UserParams userParams);
        Task<Member> GetMemberAsync(string username);
        Task<string> GetUserGender(string username);
    }
}