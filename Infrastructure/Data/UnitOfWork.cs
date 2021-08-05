
using System.Threading.Tasks;
using Core.Interfaces;
using AutoMapper;
using Core.Entities;
using System.Collections;
using System;

namespace Infrastructure.Data.Identity
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly IdentityDataContext _context;
        private Hashtable _repositories;
        private readonly StoreContext _storeContext;
        // As we initialize Unit of work, we will create new instance of our store context and any repositories we use in those contexts will be stored
        // Inside the hashtable
        public UnitOfWork(IdentityDataContext context, StoreContext storeContext, IMapper mapper)
        {
            _storeContext = storeContext;
            _context = context;
            _mapper = mapper;
        }

        //create instance of repositories then pass it
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);


        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            //Check if hashtable is created
            if (_repositories == null) _repositories = new Hashtable();

            var type = typeof(TEntity).Name;

            //pass in context that our unit of works owns as a parameter into this new repository
            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _storeContext);

                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>)_repositories[type];
        }

        public async Task<int> CompleteStore()
        {
            return await _storeContext.SaveChangesAsync();
        }
        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
            _storeContext.Dispose();
        }

        public bool HasChanges()
        {
            _context.ChangeTracker.DetectChanges();
            var changes = _context.ChangeTracker.HasChanges();
            return changes;
        }

    }
}