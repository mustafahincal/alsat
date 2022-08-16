using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities.Helpers.FileHelper;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
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
        IUnitOfWork _unitOfWork;

        public ProductImageManager(IProductImageDal productImageDal, IFileHelper fileHelper, IUnitOfWork unitOfWork)
        {
            _productImageDal = productImageDal;
            _fileHelper = fileHelper;
            _unitOfWork = unitOfWork;
        }

        public IResult Add(IFormFile file, ProductImage productImage, int productId)
        {
            
            productImage.ImagePath = _fileHelper.Upload(file, FilePath.ImagesPath);
            productImage.ProductId = productId;
            _productImageDal.Add(productImage);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Fotoğraf eklendi");
        }

        public IResult Update(IFormFile file, ProductImage productImage, int productId, int productImageId)
        {
            //var fileLength = file.Length;
            //if (fileLength > 400)
            //    return new ErrorResult("dosya büyüklüğü en fazla 400kb olabilir");
            productImage.ImagePath = _fileHelper.Update(file, FilePath.ImagesPath + productImage.ImagePath, FilePath.ImagesPath);
            productImage.ProductId = productId;
            productImage.ProductImageId = productImageId;
            _productImageDal.Update(productImage);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Fotoğraf Güncellendi");
        }

       


        public IResult Delete(ProductImage productImage)
        {
            _fileHelper.Delete(FilePath.ImagesPath + productImage.ImagePath);
            _productImageDal.Delete(productImage);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Fotoğraf Silindi");
        }

        public IDataResult<List<ProductImage>> GetAll()
        {
            return new SuccessDataResult<List<ProductImage>>(_productImageDal.GetAll(), "Araba fotoğrafları getirildi");
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
            var result = _productImageDal.Get(p => p.ProductImageId == imageId);
            return new SuccessDataResult<ProductImage>(_productImageDal.Get(p => p.ProductImageId == imageId));
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
