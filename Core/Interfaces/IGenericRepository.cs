using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Core.Entities;
using System.Runtime.CompilerServices;
using Core.Specifications;
using System.Threading;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    }
}