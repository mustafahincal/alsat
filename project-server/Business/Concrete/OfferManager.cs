using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
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
        IUnitOfWork _unitOfWork;
        public OfferManager(IOfferDal offerDal, IUnitOfWork unitOfWork)
        {
            _offerDal = offerDal;
            _unitOfWork = unitOfWork;
        }

         public IResult Add(Offer offer)
        {
            _offerDal.Add(offer);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Teklif eklendi");
        }

        public IResult Delete(Offer offer)
        {
            _offerDal.Delete(offer);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Teklif silindi");
        }

        public IResult Update(Offer offer)
        {
            _offerDal.Update(offer);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Teklif güncellendi");
        }
        public IDataResult<List<Offer>> GetAll()
        {
            return new SuccessDataResult<List<Offer>>(_offerDal.GetAll(), "Teklifler listelendi");
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

        public IDataResult<List<OfferDetailDto>> GetOfferDetailsById(int id)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(_offerDal.GetOfferDetails(o => o.OfferId == id), "Teklifler getirildi");
        }
    }
}
