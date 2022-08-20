using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using DataAccess.Repository.EntityFramework;
using Entities.Concrete;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfBrandDal : EfEntityRepositoryBase<Brand>, IBrandDal
    {
        public EfBrandDal(PrimeforContext companyContext) : base(companyContext)
        {
        }
    }
}
