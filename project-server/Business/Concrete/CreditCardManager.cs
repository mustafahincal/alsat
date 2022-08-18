using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
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
        IUnitOfWork _unitOfWork;
        public CreditCardManager(ICreditCardDal creditCardDal, IUnitOfWork unitOfWork)
        {
            _creditCardDal = creditCardDal;
            _unitOfWork = unitOfWork;
        }

        public IDataResult<List<CreditCard>> GetAll()
        {
            return new SuccessDataResult<List<CreditCard>>(_creditCardDal.GetAll(), "Kredi Kartları getirildi");
        }

        public IDataResult<CreditCard> GetById(int creditCardId)
        {
            return new SuccessDataResult<CreditCard>(_creditCardDal.Get(cc => cc.CreditCardId == creditCardId), "Kredi Kartları getirildi");
        }

        public IResult Add(CreditCard creditCard)
        {
            _creditCardDal.Add(creditCard);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kredi Kartı eklendi");
        }

        public IResult Delete(CreditCard creditCard)
        {
            _creditCardDal.Delete(creditCard);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kredi Kartı silindi");
        }

        public IResult Update(CreditCard creditCard)
        {
            _creditCardDal.Update(creditCard);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kredi Kartı güncellendi");
        }
    }
}
