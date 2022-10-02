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
        Task<IDataResult<List<CreditCard>>> GetAll();
        Task<IDataResult<CreditCard>> GetById(int creditCardId);
        Task<IResult> Add(CreditCard creditCard);
        Task<IResult> Delete(int creditCardId);
        Task<IResult> Update(CreditCardForUpdateDto creditCardForUpdateDto);
        Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetails();
        Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetailsById(int id);
        Task<IDataResult<List<CreditCardDetailDto>>> GetCreditCardDetailsByUserId(int userId);
    }
}
