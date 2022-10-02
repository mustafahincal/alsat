using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
using Entities.Dtos;

namespace Business.Concrete
{
    public class ProductManager : IProductService
    {
        IProductDal _productDal;
        IProductImageService _productImageService;
        IOfferService _offerService;
        public ProductManager(IProductDal productDal, IProductImageService productImageService, IOfferService offerService)
        {
            _productDal = productDal;
            _productImageService = productImageService;
            _offerService = offerService;
        }

        [ValidationAspect(typeof(ProductValidator))]
        public async Task<IDataResult<List<Product>>> Add(ProductForAddDto productForAddDto)
        {
            
            IResult result =  BusinessRules.Run(
                 // await CheckIfProductNameExists(productForAddDto.Name)
                ); ;


            if (result != null)
            {
                return new ErrorDataResult<List<Product>>(result.Message);
            }

            var size = productForAddDto.file.Length;
            var limit = 400 * Math.Pow(2, 10);
            if (size > limit)
            {
                return new ErrorDataResult<List<Product>>(Messages.ProductImageSizeInvalid);
            }

            var extension = System.IO.Path.GetExtension(productForAddDto.file.FileName);
            if(!(extension == ".jpg" || extension == ".png" || extension == ".jpeg"))
            {
                return new ErrorDataResult<List<Product>>(Messages.ProductImageTypeInvalid);
            }

            Product productToAdd = new Product
            {
                Name = productForAddDto.Name,
                CategoryId = productForAddDto.CategoryId,
                BrandId = productForAddDto.BrandId,
                ColorId = productForAddDto.ColorId,
                Price = productForAddDto.Price,
                UsingStateId = productForAddDto.UsingStateId,
                Description = productForAddDto.Description,
                IsOfferable = productForAddDto.IsOfferable,
                IsSold = productForAddDto.IsSold,
                OwnerId = productForAddDto.OwnerId
            };

            _productDal.Add(productToAdd);
            await _productDal.Commit();
            ProductImage productImageToAdd = new ProductImage
            {
                ProductId = productToAdd.ProductId
            };

            await _productImageService.Add(productForAddDto.file, productToAdd.ProductId);
            
            var productInfo =await _productDal.GetAll(p => p.ProductId == productToAdd.ProductId);
            return new SuccessDataResult<List<Product>>(productInfo, Messages.ProductAdded);
        }

        public async Task<IResult> Update(ProductForUpdateDto productForUpdateDto)
        {
            var productToUpdate = await _productDal.Get(p => p.ProductId == productForUpdateDto.ProductId);
            productToUpdate.ColorId = productForUpdateDto.ColorId;
            productToUpdate.BrandId = productForUpdateDto.BrandId;
            productToUpdate.CategoryId = productForUpdateDto.CategoryId;
            productToUpdate.UsingStateId = productForUpdateDto.UsingStateId;
            productToUpdate.Name = productForUpdateDto.Name;
            productToUpdate.Description = productForUpdateDto.Description;
            productToUpdate.IsSold = productForUpdateDto.IsSold;
            productToUpdate.IsOfferable = productForUpdateDto.IsOfferable;
            productToUpdate.Price = productForUpdateDto.Price;

            if (productToUpdate.IsSold)
            {
                var offersToDelete = await _offerService.GetAllByProductId(productToUpdate.ProductId);
                foreach(Offer offer in offersToDelete)
                {
                    if (offer.OfferId != productForUpdateDto.OfferId)
                    {
                        await _offerService.Delete(offer.OfferId);
                    }
                }
            }

            var offerControl = await _offerService.GetByProductId(productToUpdate.ProductId);
            if (offerControl.Data.Count == 0)
            {
                Offer offerToAdd = new Offer
                {
                    OfferedPrice = productForUpdateDto.Price,
                    IsApproved = true,
                    ProductId = productForUpdateDto.ProductId,
                    UserId = productForUpdateDto.UserId,
                };
                await _offerService.Add(offerToAdd);
            }
           
            _productDal.Update(productToUpdate);
            await _productDal.Commit();
            return new SuccessResult(Messages.ProductUpdated);
        }

        public async Task<IResult> Delete(int productId)
        {
            var productToDelete = await  _productDal.Get(p => p.ProductId == productId);
            _productDal.Delete(productToDelete);
            await _productDal.Commit();
            return new SuccessResult(Messages.ProductDeleted);
        }

        public async Task<IDataResult<List<Product>>> GetAll()
        {
            return new SuccessDataResult<List<Product>>(await _productDal.GetAll(), Messages.ProductsListed);
        }
        public async Task<IDataResult<List<Product>>> GetAllByOwnerId(int ownerId)
        {
            return new SuccessDataResult<List<Product>>(await _productDal.GetAll(p => p.OwnerId == ownerId));
        }
        public async Task<IDataResult<List<Product>>> GetAllByCategoryId(int id)
        {
            return new SuccessDataResult<List<Product>>(await _productDal.GetAll(p => p.CategoryId == id));
        }
        public async Task<IDataResult<Product>> GetById(int productId)
        {
            return new SuccessDataResult<Product>( await _productDal.Get(p => p.ProductId == productId));
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsById(int id)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(p => p.ProductId == id), "Ürün Listelendi");
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByCategoryId(int categoryId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(p => p.CategoryId == categoryId), "Ürün Listelendi");
        }
        public async Task<IDataResult<List<Product>>> GetByUnitPrice(decimal min, decimal max)
        {
            return new SuccessDataResult<List<Product>>(await _productDal.GetAll(p => p.Price <= max && p.Price >= min));
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetails()
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(), Messages.ProductsListed);
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByBrandId(int brandId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>( await _productDal.GetProductDetails(p => p.BrandId == brandId), Messages.ProductsListed);
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByColorId(int colorId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(p => p.ColorId == colorId), Messages.ProductsListed);
        }
        public async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByUsingStateId(int usingStateId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(p => p.UsingStateId == usingStateId), Messages.ProductsListed);
        }
        public  async Task<IDataResult<List<ProductDetailDto>>> GetProductDetailsByOwnerId(int ownerId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(await _productDal.GetProductDetails(p => p.OwnerId == ownerId), Messages.ProductsListed);
        }
        private async Task<IResult> CheckIfProductNameExists(string productName)
        {
            var result =(await _productDal.GetAll(p => p.Name == productName)).Any();
            if (result)
            {
                return new ErrorResult(Messages.ProductNameAlreadyExists);
            }
            return new SuccessResult();
        }



    }
}
