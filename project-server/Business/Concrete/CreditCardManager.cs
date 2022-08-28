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
    public class CreditCardManager : ICreditCardService
    {
        ICreditCardDal _creditCardDal;
        public CreditCardManager(ICreditCardDal creditCardDal)
        {
            _creditCardDal = creditCardDal;
        }

        public async Task<IDataResult<List<CreditCard>>> GetAll()
        {
            return new SuccessDataResult<List<CreditCard>>(await _creditCardDal.GetAll(), "Kredi Kartları getirildi");
        }

        public async Task<IDataResult<CreditCard>> GetById(int userId)
        {
            return new SuccessDataResult<CreditCard>(await _creditCardDal.Get(cc => cc.UserId == userId), "Kredi Kartı getirildi");
        }

        public async Task<IResult> Add(CreditCard creditCard)
        {
            _creditCardDal.Add(creditCard);
            await _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı eklendi");
        }

        public async Task<IResult> Delete(int creditCardId)
        {
            var creditCardToDelete = await _creditCardDal.Get(cc => cc.CreditCardId == creditCardId);
            _creditCardDal.Delete(creditCardToDelete);
            await _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı silindi");
        }

        public async Task<IResult> Update(CreditCardForUpdateDto creditCardForUpdateDto)
        {
            var creditCardToUpdate = await _creditCardDal.Get(cc => cc.CreditCardId == creditCardForUpdateDto.CreditCardId);
            creditCardToUpdate.CardHolder = creditCardForUpdateDto.CardHolder;
            creditCardToUpdate.CardNumber = creditCardForUpdateDto.CardNumber;
            creditCardToUpdate.CvvCode = creditCardForUpdateDto.CvvCode;
            creditCardToUpdate.ExpirationDate = creditCardForUpdateDto.ExpirationDate;
            _creditCardDal.Update(creditCardToUpdate);
            await _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı güncellendi");
        }

        public async Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetails()
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(await _creditCardDal.GetCreditCardDetails(), "Kredi Kartları Listelendi");
        }

        public async Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetailsById(int id)
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(await _creditCardDal.GetCreditCardDetails(cc => cc.CreditCardId == id), "Kredi Kartı Listelendi");
        }

        public async Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetailsByUserId(int userId)
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(await _creditCardDal.GetCreditCardDetails(cc => cc.UserId == userId), "Kullanıcının Kartı Listelendi");
        }
    }
}
