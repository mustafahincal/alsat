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

        public ProductImageManager(IProductImageDal productImageDal, IFileHelper fileHelper)
        {
            _productImageDal = productImageDal;
            _fileHelper = fileHelper;
        }

        public async Task<Core.Utilities.Results.IResult> Add(IFormFile file, int productId)
        {
            Core.Utilities.Results.IResult result =  BusinessRules.Run(
                await CheckIfImageSizeInvalid(file)
                ); ;

            if (result != null)
            {
                return new ErrorDataResult<List<Product>>(result.Message);
            }


            ProductImage productImageToAdd = new ProductImage
            {
                ImagePath = _fileHelper.Upload(file, FilePath.ImagesPath),
                ProductId = productId
            };
            _productImageDal.Add(productImageToAdd);
            await _productImageDal.Commit();
            return new SuccessResult("Fotoğraf eklendi");
        }

        public async Task<Core.Utilities.Results.IResult> Update(IFormFile file, int productImageId)
        {
            Core.Utilities.Results.IResult result =  BusinessRules.Run(
                await CheckIfImageSizeInvalid(file)
                ); ;

            if (result != null)
            {
                return new ErrorDataResult<List<Product>>(result.Message);
            }

            ProductImage productImageToUpdate =await _productImageDal.Get(image => image.ProductImageId == productImageId);

            productImageToUpdate.ImagePath = _fileHelper.Update(file, FilePath.ImagesPath + productImageToUpdate.ImagePath, FilePath.ImagesPath);
            productImageToUpdate.ProductId = productImageToUpdate.ProductId;
            productImageToUpdate.ProductImageId = productImageToUpdate.ProductImageId;
            _productImageDal.Update(productImageToUpdate);
            await _productImageDal.Commit();
            return new SuccessResult("Fotoğraf Güncellendi");
        }

       


        public async Task<Core.Utilities.Results.IResult> Delete(int productImageId)
        {
            var productImageToDelete =await _productImageDal.Get(productImage => productImage.ProductImageId == productImageId);
            _fileHelper.Delete(FilePath.ImagesPath + productImageToDelete.ImagePath);
            _productImageDal.Delete(productImageToDelete);
            await _productImageDal.Commit();
            return new SuccessResult("Fotoğraf Silindi");
        }

        public async Task<IDataResult<List<ProductImage>>> GetAll()
        {
            return new SuccessDataResult<List<ProductImage>>(await _productImageDal.GetAll(), "Araba fotoğrafları getirildi");
        }

        public async Task<IDataResult<List<ProductImage>>> GetByProductId(int productId)
        {
            var result =  BusinessRules.Run( await CheckCarImage(productId));
            if (result != null)
            {
                return new ErrorDataResult<List<ProductImage>>("default image");
            }
            return new SuccessDataResult<List<ProductImage>>(await _productImageDal.GetAll(p => p.ProductId == productId));
        }

        public async Task<IDataResult<ProductImage>> GetByImageId(int imageId)
        {
            var result =await _productImageDal.Get(p => p.ProductImageId == imageId);
            return new SuccessDataResult<ProductImage>(await _productImageDal.Get(p => p.ProductImageId == imageId));
        }

        
        private async Task<Core.Utilities.Results.IResult> CheckCarImage(int productId)
        {
            var result = (await _productImageDal.GetAll(p => p.ProductId == productId)).Count;
            if (result > 0)
            {
                return new SuccessResult();
            }
            return new ErrorResult();
        }

        private async Task<Core.Utilities.Results.IResult> CheckIfImageSizeInvalid(IFormFile file)
        {
            var size = file.Length;
            var limit = 400 * Math.Pow(2, 10);
            if (size > limit)
            {
                return new ErrorResult(Messages.ProductImageSizeInvalid);
            }
            return new SuccessResult();
        }
    }
}
