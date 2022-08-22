using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ICreditCardService
    {
        IDataResult<List<CreditCard>> GetAll();
        IDataResult<CreditCard> GetById(int creditCardId);
        IResult Add(CreditCard creditCard);
        IResult Delete(int creditCardId);
        IResult Update(CreditCardForUpdateDto creditCardForUpdateDto);
        IDataResult<List<CreditCardDetailDto>> GetCreditCardDetails();
        IDataResult<List<CreditCardDetailDto>> GetCreditCardDetailsById(int id);
        IDataResult<List<CreditCardDetailDto>> GetCreditCardDetailsByUserId(int userId);
    }
}
