using Core.Entities;
using DataAccess.Concrete.EntityFramework.Context;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using System.Linq.Expressions;

namespace DataAccess.Repository.EntityFramework
{
    public class EfEntityRepositoryBase<T> : IUnitOfWork, IEntityRepository<T> where T : class, IEntity, new()
    {
        protected PrimeforContext _primeforContext;

        public EfEntityRepositoryBase(PrimeforContext primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return filter == null ? _primeforContext.Set<T>().ToList() : _primeforContext.Set<T>().Where(filter).ToList();
        }

        public T Get(Expression<Func<T, bool>> filter = null)
        {
            return _primeforContext.Set<T>().Where(filter).FirstOrDefault();
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

        public void Commit() => _primeforContext.SaveChanges();
        
    }
}
