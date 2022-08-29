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
    public interface IOfferService
    {
        Task<IDataResult<List<Offer>>> GetAll();
        Task<IDataResult<Offer>> GetById(int offerId);
        Task<IResult> Add(Offer offer);
        Task<IResult> Delete(int offerId);
        Task<IResult> Update(OfferForUpdateDto offerForUpdateDto);

        Task<IDataResult<List<Offer>>> GetByUserId(int userId);

        Task<List<Offer>> GetAllByProductId(int productId);

        Task<IDataResult<List<OfferDetailDto>>> GetOfferDetails();
        Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsByUserId(int userId);
        Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsByOwnerId(int ownerId);
        Task<IDataResult<List<OfferDetailDto>>> GetOfferDetailsById(int id);
        Task<IDataResult<List<Offer>>> GetByProductId(int productId);
    }
}
