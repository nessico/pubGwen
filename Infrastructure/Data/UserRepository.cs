using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Member.Parameters;
using Core.Interfaces;
using AutoMapper;
using Core.Entities.Identity;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Core.Entities.Member;

namespace Infrastructure.Data.Identity
{
    public class UserRepository : IUserRepository
    {
        private readonly IdentityDataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(IdentityDataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Member> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<Member>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<Member>> GetMembersAsync(UserParams userParams)
        {
            // Turn off tracking in entity framework, b/c you created static method called CreateAsync, you can use it here at this class
            // Add this info to our response header in the UsersController
            var query = _context.Users.AsQueryable();

            // Want to return all user except the currently logged in one
            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<Member>.CreateAsync(query.ProjectTo<Member>(_mapper.ConfigurationProvider).AsNoTracking(),
                userParams.pageIndex, userParams.PageSize);


        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}