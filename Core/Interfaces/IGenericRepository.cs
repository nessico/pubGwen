using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Core.Entities;
using System.Runtime.CompilerServices;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
    }
}