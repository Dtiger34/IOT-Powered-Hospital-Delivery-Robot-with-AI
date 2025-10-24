﻿using API_Powered_Hospital_Delivery_Robot.Models.Entities;
using API_Powered_Hospital_Delivery_Robot.Repositories.IRepository;
using Microsoft.EntityFrameworkCore;

namespace API_Powered_Hospital_Delivery_Robot.Repositories.ImplRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly RobotManagerContext _context;

        public UserRepository(RobotManagerContext context)
        {
            _context = context;
        }

        public async Task<User> CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetAllAsync(bool? isActive = null)
        {
            var getAll = _context.Users.AsQueryable();
            if (isActive.HasValue)
            {
                getAll = getAll.Where(u => u.IsActive == isActive.Value);
            }
            return await getAll.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(ulong id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> UpdateAsync(ulong id, User user)
        {
            var existing = await _context.Users.FindAsync(id);
            if (existing == null)
            {
                return null;
            }

            existing.Username = user.Username;
            existing.PasswordHash = user.PasswordHash;
            existing.FullName = user.FullName;
            existing.Role = user.Role;
            existing.IsActive = user.IsActive;
            existing.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
