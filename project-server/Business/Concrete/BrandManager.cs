﻿using Business.Abstract;
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
    public class BrandManager : IBrandService
    {
        IBrandDal _brandDal;
        IUnitOfWork _unitOfWork;
        public BrandManager(IBrandDal brandDal, IUnitOfWork unitOfWork)
        {
            _brandDal = brandDal;
            _unitOfWork = unitOfWork;
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
            _brandDal.Add(brand);
            return new SuccessResult("Marka eklendi");
        }

        public IResult Delete(Brand brand)
        {
            _brandDal.Delete(brand);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Marka silindi");
        }

        public IResult Update(Brand brand)
        {
            _brandDal.Update(brand);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Marka güncellendi");
        }
    }
}
