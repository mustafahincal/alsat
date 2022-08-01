using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IOfferService
    {
        IDataResult<List<Offer>> GetAll();
        IDataResult<Offer> GetById(int offerId);
        IResult Add(Offer offer);
        IResult Delete(Offer offer);
        IResult Update(Offer offer);
    }
}
