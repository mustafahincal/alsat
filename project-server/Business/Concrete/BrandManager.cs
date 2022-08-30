using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Concrete
{
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;
        public BrandManager(IBrandDal brandDal)
        {
            _brandDal = brandDal;
        }

        public async Task<IDataResult<List<Brand>>> GetAll()
        {
            return new SuccessDataResult<List<Brand>>(await _brandDal.GetAll(), "Markalar getirildi");
        }

        public async Task<IDataResult<Brand>> GetById(int brandId)
        {
            return new SuccessDataResult<Brand>(await _brandDal.Get(b => b.BrandId == brandId), "Marka getirildi");
        }

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(BrandValidator))]
        public async Task<IResult> Add(Brand brand)
        {

            IResult result =  BusinessRules.Run(
                await CheckIfBrandNameExists(brand.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Brand>>(result.Message);
            }

            _brandDal.Add(brand);
            await _brandDal.Commit();
            return new SuccessResult("Marka eklendi");
        }

        [SecuredOperation("Admin")]
        public async Task<IResult> Delete(int brandId)
        {
            var brandToDelete = await _brandDal.Get(b => b.BrandId == brandId);
            _brandDal.Delete(brandToDelete);
            await _brandDal.Commit();
            return new SuccessResult("Marka silindi");
        }

        [SecuredOperation("Admin")]
        public async Task<IResult> Update(BrandForUpdateDto brandForUpdateDto)
        {

            IResult result =  BusinessRules.Run(
               await CheckIfBrandNameExists(brandForUpdateDto.Name)
               ); ;


            if (result != null)
            {
                return new ErrorDataResult<List<Brand>>(result.Message);
            }

            var brandToUpdate = await _brandDal.Get(b => b.BrandId == brandForUpdateDto.BrandId);
            brandToUpdate.Name = brandForUpdateDto.Name;
            _brandDal.Update(brandToUpdate);
            await _brandDal.Commit();
            return new SuccessResult("Marka güncellendi");
        }

        private async Task<IResult> CheckIfBrandNameExists(string brandName)
        {
            var result = (await _brandDal.GetAll(b => b.Name == brandName)).Any();
            if (result)
            {
                return new ErrorResult(Messages.BrandNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
