using System;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    // IDisposable to dispose context after finishing transaction
    public interface IUnitOfWork : IDisposable
    {
        // Uses shared database context for all repos inside the Unit Of Work
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILikesRepository LikesRepository { get; }

        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;

        // Save all changes or save none and roll back (guarantees that there are no partial updates)
        Task<int> Complete();
        Task<int> CompleteStore();
        bool HasChanges();

    }
}