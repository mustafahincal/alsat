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
            _offerDal.Add(offer);
            _offerDal.Commit();
            return new SuccessResult("Teklif eklendi");
        }

        public IResult Delete(int offerId)
        {
            var offerToDelete = _offerDal.Get(o => o.OfferId == offerId);
            _offerDal.Delete(offerToDelete);
            _offerDal.Commit();
            return new SuccessResult("Teklif silindi");
        }

        public IResult Update(OfferForUpdateDto offerForUpdateDto)
        {
            var offerToUpdate = _offerDal.Get(o => o.OfferId == offerForUpdateDto.OfferId);
            offerToUpdate.OfferedPrice = offerForUpdateDto.OfferedPrice;
            offerToUpdate.IsApproved = offerForUpdateDto.IsApproved;
             _offerDal.Update(offerToUpdate);
            _offerDal.Commit();
            return new SuccessResult("Teklif güncellendi");
        }
        public IDataResult<List<Offer>> GetAll()
        {
            return new SuccessDataResult<List<Offer>>(_offerDal.GetAll(), "Teklifler listelendi");
        }

        public List<Offer> GetAllByProductId(int productId)
        {
            return new List<Offer>(_offerDal.GetAll(offer => offer.ProductId == productId));
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
