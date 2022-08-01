using Business.Abstract;
using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class OfferManager : IOfferService
    {
        public IResult Add(Offer offer)
        {
            throw new NotImplementedException();
        }

        public IResult Delete(Offer offer)
        {
            throw new NotImplementedException();
        }

        public IDataResult<List<Offer>> GetAll()
        {
            throw new NotImplementedException();
        }

        public IDataResult<Offer> GetById(int offerId)
        {
            throw new NotImplementedException();
        }

        public IResult Update(Offer offer)
        {
            throw new NotImplementedException();
        }
    }
}
