using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class OfferManager : IOfferService
    {
        IOfferDal _offerDal;
        public OfferManager(IOfferDal offerDal)
        {
            _offerDal = offerDal;
        }

         public IResult Add(Offer offer)
        {
            throw new NotImplementedException();
        }

        public IResult Delete(Offer offer)
        {
            throw new NotImplementedException();
        }

        public IResult Update(Offer offer)
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

        public IDataResult<List<Offer>> GetByUserId(int userId)
        {
            return new SuccessDataResult<List<Offer>>(_offerDal.GetAll(o => o.UserId == userId));
        }

        public IDataResult<List<OfferDetailDto>> GetOfferDetails()
        {
            return new SuccessDataResult<List<OfferDetailDto>>(_offerDal.GetOfferDetails(), "Teklifler listelendi");
        }

        public IDataResult<List<OfferDetailDto>> GetOfferDetailsByOwnerId(int ownerId)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(_offerDal.GetOfferDetails(o => o.OwnerId == ownerId), "Teklifler listelendi");
        }

        public IDataResult<List<OfferDetailDto>> GetOfferDetailsByUserId(int userId)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(_offerDal.GetOfferDetails(o => o.UserId == userId), "Teklifler listelendi");
        }

        
    }
}
