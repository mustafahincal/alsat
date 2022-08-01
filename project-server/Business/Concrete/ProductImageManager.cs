using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities.Helpers.FileHelper;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ProductImageManager : IProductImageService
    {
        IProductImageDal _productImageDal;
        IFileHelper _fileHelper;

        public ProductImageManager(IProductImageDal productImageDal, IFileHelper fileHelper)
        {
            _productImageDal = productImageDal;
            _fileHelper = fileHelper;
        }

        public IResult Add(IFormFile file, ProductImage productImage, int productId)
        {
            IResult result = BusinessRules.Run(CheckIfCarImageLimit(productImage.ProductImageId));
            if (result != null)
            {
                return result;
            }
            productImage.ImagePath = _fileHelper.Upload(file, FilePath.ImagesPath);
            productImage.ProductImageId = productId;
            _productImageDal.Add(productImage);
            return new SuccessResult("Resim eklendi");
        }

        public IResult Delete(ProductImage productImage)
        {
            _fileHelper.Delete(FilePath.ImagesPath + productImage.ImagePath);
            _productImageDal.Delete(productImage);
            return new SuccessResult();
        }

        public IDataResult<List<ProductImage>> GetAll()
        {
            return new SuccessDataResult<List<ProductImage>>(_productImageDal.GetAll(), "Araba resimleri getirildi");
        }

        public IDataResult<List<ProductImage>> GetByProductId(int productId)
        {
            var result = BusinessRules.Run(CheckCarImage(productId));
            if (result != null)
            {
                return new ErrorDataResult<List<ProductImage>>("default image");
            }
            return new SuccessDataResult<List<ProductImage>>(_productImageDal.GetAll(p => p.ProductId == productId));
        }

        public IDataResult<ProductImage> GetByImageId(int imageId)
        {
            return new SuccessDataResult<ProductImage>(_productImageDal.Get(p => p.ProductId == imageId));
        }

        public IResult Update(IFormFile file, ProductImage productImage)
        {
            productImage.ImagePath = _fileHelper.Update(file, FilePath.ImagesPath + productImage.ImagePath, FilePath.ImagesPath);
            _productImageDal.Update(productImage);
            return new SuccessResult();
        }

        private IResult CheckIfCarImageLimit(int productId)
        {
            var result = _productImageDal.GetAll(p => p.ProductId == productId).Count;
            if (result >= 5)
            {
                return new ErrorResult();
            }
            return new SuccessResult();
        }

        private IResult CheckCarImage(int productId)
        {
            var result = _productImageDal.GetAll(p => p.ProductId == productId).Count;
            if (result > 0)
            {
                return new SuccessResult();
            }
            return new ErrorResult();
        }
    }
}
