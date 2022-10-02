using DataAccess.Repository.EntityFramework;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUsingStateDal : EfEntityRepositoryBase<UsingState>, IUsingStateDal
    {
        public EfUsingStateDal(PrimeforContext primeforContext) : base(primeforContext)
        {
        }
    }
}
