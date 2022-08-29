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

         public async Task<IResult > Add(Offer offer)
        {
            _offerDal.Add(offer);
            await _offerDal.Commit();
            return new SuccessResult("Teklif eklendi");
        }

        public async Task<IResult> Delete(int offerId)
        {
            var offerToDelete = await _offerDal.Get(o => o.OfferId == offerId);
            _offerDal.Delete(offerToDelete);
            await _offerDal.Commit();
            return new SuccessResult("Teklif reddedildi");
        }

        public async Task<IResult> Update(OfferForUpdateDto offerForUpdateDto)
        {
            var offerToUpdate = await _offerDal.Get(o => o.OfferId == offerForUpdateDto.OfferId);
            offerToUpdate.OfferedPrice = offerForUpdateDto.OfferedPrice;
            offerToUpdate.IsApproved = offerForUpdateDto.IsApproved;
             _offerDal.Update(offerToUpdate);
            await _offerDal.Commit();
            return new SuccessResult("Teklif güncellendi");
        }
        public async Task<IDataResult<List<Offer>>> GetAll()
        {
            return new SuccessDataResult<List<Offer>>(await _offerDal.GetAll(), "Teklifler listelendi");
        }

        public async Task<List<Offer>> GetAllByProductId(int productId)
        {
            return new List<Offer>(await _offerDal.GetAll(offer => offer.ProductId == productId));
        }

        public async Task<IDataResult<Offer>> GetById(int offerId)
        {
            throw new NotImplementedException();
        }

        public async Task<IDataResult<List<Offer>>> GetByUserId(int userId)
        {
            return new SuccessDataResult<List<Offer>>(await _offerDal.GetAll(o => o.UserId == userId));
        }
        public async Task<IDataResult<List<Offer>>> GetByProductId(int productId)
        {
            return new SuccessDataResult<List<Offer>>(await _offerDal.GetAll(o => o.ProductId == productId));
        }

        public async Task<IDataResult<List<OfferDetailDto>>> GetOfferDetails()
        {
            return new SuccessDataResult<List<OfferDetailDto>>(await _offerDal.GetOfferDetails(), "Teklifler listelendi");
        }

        public async Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsByOwnerId(int ownerId)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(await _offerDal.GetOfferDetails(o => o.OwnerId == ownerId), "Teklifler listelendi");
        }

        public async Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsByUserId(int userId)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(await _offerDal.GetOfferDetails(o => o.UserId == userId), "Teklifler listelendi");
        }

        public async Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsById(int id)
        {
            return new SuccessDataResult<List<OfferDetailDto>>(await _offerDal.GetOfferDetails(o => o.OfferId == id), "Teklifler getirildi");
        }
    }
}
