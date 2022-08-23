using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
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
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;
        public BrandManager(IBrandDal brandDal)
        {
            _brandDal = brandDal;
        }

        public IDataResult<List<Brand>> GetAll()
        {
            return new SuccessDataResult<List<Brand>>(_brandDal.GetAll(), "Markalar getirildi");
        }

        public IDataResult<Brand> GetById(int brandId)
        {
            return new SuccessDataResult<Brand>(_brandDal.Get(b => b.BrandId == brandId), "Marka getirildi");
        }

        public IResult Add(Brand brand)
        {

            IResult result = BusinessRules.Run(
                CheckIfBrandNameExists(brand.Name)
                ); ;


            if (result != null)
            {
                return new ErrorDataResult<List<Brand>>(result.Message);
            }

            _brandDal.Add(brand);
            _brandDal.Commit();
            return new SuccessResult("Marka eklendi");
        }

        public IResult Delete(int brandId)
        {
            var brandToDelete = _brandDal.Get(b => b.BrandId == brandId);
            _brandDal.Delete(brandToDelete);
            _brandDal.Commit();
            return new SuccessResult("Marka silindi");
        }

        public IResult Update(BrandForUpdateDto brandForUpdateDto)
        {

            IResult result = BusinessRules.Run(
               CheckIfBrandNameExists(brandForUpdateDto.Name)
               ); ;


            if (result != null)
            {
                return new ErrorDataResult<List<Brand>>(result.Message);
            }

            var brandToUpdate = _brandDal.Get(b => b.BrandId == brandForUpdateDto.BrandId);
            brandToUpdate.Name = brandForUpdateDto.Name;
            _brandDal.Update(brandToUpdate);
            _brandDal.Commit();
            return new SuccessResult("Marka güncellendi");
        }

        private IResult CheckIfBrandNameExists(string brandName)
        {
            var result = _brandDal.GetAll(b => b.Name == brandName).Any();
            if (result)
            {
                return new ErrorResult(Messages.BrandNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
