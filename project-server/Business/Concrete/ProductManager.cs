using Business.Abstract;
using Business.Constants;
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
        ICategoryService _categoryService;
        IProductImageService _productImageService;
        IOfferService _offerService;
        public ProductManager(IProductDal productDal, ICategoryService categoryService, IProductImageService productImageService, IOfferService offerService)
        {
            _productDal = productDal;
            _categoryService = categoryService;
            _productImageService = productImageService;
            _offerService = offerService;
        }

        public IDataResult<List<Product>> Add(ProductForAddDto productForAddDto)
        {

            IResult result = BusinessRules.Run(
                CheckIfProductNameExists(productForAddDto.Name)
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
            _productDal.Commit();
            ProductImage productImageToAdd = new ProductImage
            {
                ProductId = productToAdd.ProductId
            };
            _productImageService.Add(productForAddDto.file, productToAdd.ProductId);
            
            var productInfo = _productDal.GetAll(p => p.ProductId == productToAdd.ProductId);
            return new SuccessDataResult<List<Product>>(productInfo, Messages.ProductAdded);
        }

        public IResult Update(ProductForUpdateDto productForUpdateDto)
        {
            var productToUpdate = _productDal.Get(p => p.ProductId == productForUpdateDto.ProductId);
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
                var offersToDelete = _offerService.GetAllByProductId(productToUpdate.ProductId);
                foreach(Offer offer in offersToDelete)
                {
                    if (offer.OfferId != productForUpdateDto.OfferId)
                    {
                        _offerService.Delete(offer.OfferId);
                    }
                }
            }

            _productDal.Update(productToUpdate);
            _productDal.Commit();
            return new SuccessResult(Messages.ProductUpdated);
        }

        public IResult Delete(int productId)
        {
            var productToDelete = _productDal.Get(p => p.ProductId == productId);
            _productDal.Delete(productToDelete);
            _productDal.Commit();
            return new SuccessResult(Messages.ProductDeleted);
        }

        public IDataResult<List<Product>> GetAll()
        {

            return new SuccessDataResult<List<Product>>(_productDal.GetAll(), Messages.ProductsListed);
        }

        public IDataResult<List<Product>> GetAllByCategoryId(int id)
        {
            return new SuccessDataResult<List<Product>>(_productDal.GetAll(p => p.CategoryId == id));
        }

        public IDataResult<Product> GetById(int productId)
        {
            return new SuccessDataResult<Product>(_productDal.Get(p => p.ProductId == productId));
        }
        public IDataResult<List<ProductDetailDto>> GetProductDetailsById(int id)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(p => p.ProductId == id), "Ürün Listelendi");
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetailsByCategoryId(int categoryId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(p => p.CategoryId == categoryId), "Ürün Listelendi");
        }

        public IDataResult<List<Product>> GetByUnitPrice(decimal min, decimal max)
        {
            return new SuccessDataResult<List<Product>>(_productDal.GetAll(p => p.Price <= max && p.Price >= min));
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetails()
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(), Messages.ProductsListed);
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetailsByBrandId(int brandId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(p => p.BrandId == brandId), Messages.ProductsListed);
        }
        public IDataResult<List<ProductDetailDto>> GetProductDetailsByColorId(int colorId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(p => p.ColorId == colorId), Messages.ProductsListed);
        }

        public IDataResult<List<ProductDetailDto>> GetProductDetailsByOwnerId(int ownerId)
        {
            return new SuccessDataResult<List<ProductDetailDto>>(_productDal.GetProductDetails(p => p.OwnerId == ownerId), Messages.ProductsListed);
        }

        private IResult CheckIfProductNameExists(string productName)
        {
            var result = _productDal.GetAll(p => p.Name == productName).Any();
            if (result)
            {
                return new ErrorResult(Messages.ProductNameAlreadyExists);
            }
            return new SuccessResult();
        }



    }
}
