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

        public IDataResult<List<CreditCard>> GetAll()
        {
            return new SuccessDataResult<List<CreditCard>>(_creditCardDal.GetAll(), "Kredi Kartları getirildi");
        }

        public IDataResult<CreditCard> GetById(int userId)
        {
            return new SuccessDataResult<CreditCard>(_creditCardDal.Get(cc => cc.UserId == userId), "Kredi Kartı getirildi");
        }

        public IResult Add(CreditCard creditCard)
        {
            _creditCardDal.Add(creditCard);
            _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı eklendi");
        }

        public IResult Delete(int creditCardId)
        {
            var creditCardToDelete = _creditCardDal.Get(cc => cc.CreditCardId == creditCardId);
            _creditCardDal.Delete(creditCardToDelete);
            _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı silindi");
        }

        public IResult Update(CreditCardForUpdateDto creditCardForUpdateDto)
        {
            var creditCardToUpdate = _creditCardDal.Get(cc => cc.CreditCardId == creditCardForUpdateDto.CreditCardId);
            creditCardToUpdate.CardHolder = creditCardForUpdateDto.CardHolder;
            creditCardToUpdate.CardNumber = creditCardForUpdateDto.CardNumber;
            creditCardToUpdate.CvvCode = creditCardForUpdateDto.CvvCode;
            creditCardToUpdate.ExpirationDate = creditCardForUpdateDto.ExpirationDate;
            _creditCardDal.Update(creditCardToUpdate);
            _creditCardDal.Commit();
            return new SuccessResult("Kredi Kartı güncellendi");
        }

        public IDataResult<List<CreditCardDetailDto>> GetCreditCardDetails()
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(_creditCardDal.GetCreditCardDetails(), "Kredi Kartları Listelendi");
        }

        public IDataResult<List<CreditCardDetailDto>> GetCreditCardDetailsById(int id)
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(_creditCardDal.GetCreditCardDetails(cc => cc.CreditCardId == id), "Kredi Kartı Listelendi");
        }

        public IDataResult<List<CreditCardDetailDto>> GetCreditCardDetailsByUserId(int userId)
        {
            return new SuccessDataResult<List<CreditCardDetailDto>>(_creditCardDal.GetCreditCardDetails(cc => cc.UserId == userId), "Kullanıcının Kartı Listelendi");
        }
    }
}
