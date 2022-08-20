using Core.Entities;
using DataAccess.Concrete.EntityFramework.Context;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using System.Linq.Expressions;

namespace DataAccess.Repository.EntityFramework
{
    public class EfEntityRepositoryBase<T> : IUnitOfWork, IEntityRepository<T> where T : class, IEntity, new()
    {
        protected PrimeforContext _companyContext;

        public EfEntityRepositoryBase(PrimeforContext companyContext)
        {
            _companyContext = companyContext;
        }

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return filter == null ? _companyContext.Set<T>().ToList() : _companyContext.Set<T>().Where(filter).ToList();
        }

        public T Get(Expression<Func<T, bool>> filter = null)
        {
            return _companyContext.Set<T>().Where(filter).FirstOrDefault();
        }

        public void Add(T model)
        {
            _companyContext.Set<T>().Add(model);

        }

        public void Delete(T model)
        {
            _companyContext.Set<T>().Remove(model);
        }

        public void Update(T model)
        {
            _companyContext.Set<T>().Update(model);
        }

        public void Commit() => _companyContext.SaveChanges();

        public void SaveChanges()
        {

        }
    }
}
