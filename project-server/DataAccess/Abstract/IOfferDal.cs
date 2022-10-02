using DataAccess.Repository;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IOfferDal : IEntityRepository<Offer>
    {
        Task<List<OfferDetailDto>> GetOfferDetails(Expression<Func<OfferDetailDto, bool>> filter = null);
    }
}
