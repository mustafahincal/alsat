using DataAccess.Concrete.EntityFramework.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.EntityFramework.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public void SaveChanges()
        {
            //using (PrimeforContext context = new PrimeforContext())
            //{
            //    context.SaveChanges();
            //}
        }
    }
}
