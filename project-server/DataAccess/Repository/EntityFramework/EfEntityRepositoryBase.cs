using Core.Entities;
using DataAccess.Concrete.EntityFramework.Context;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Repository.EntityFramework
{
    public class EfEntityRepositoryBase<T> : IUnitOfWork, IEntityRepository<T> where T : class, IEntity, new()
    {
        protected PrimeforContext _primeforContext { get; set; }

        public EfEntityRepositoryBase(PrimeforContext primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return filter == null ? await _primeforContext.Set<T>().ToListAsync() : await _primeforContext.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<T> Get(Expression<Func<T, bool>> filter)
        {
            return await _primeforContext.Set<T>().Where(filter).FirstOrDefaultAsync();
        }

        public void Add(T model)
        {
            _primeforContext.Set<T>().Add(model);
        }

        public void Delete(T model)
        {
            _primeforContext.Set<T>().Remove(model);
        }

        public void Update(T model) 
        {
            _primeforContext.Set<T>().Update(model);
        }

        public async Task Commit() => await _primeforContext.SaveChangesAsync();
    }
}
