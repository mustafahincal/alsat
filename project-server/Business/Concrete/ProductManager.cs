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
        IUnitOfWork _unitOfWork;
        public ProductManager(IProductDal productDal, ICategoryService categoryService, IProductImageService productImageService, IUnitOfWork unitOfWork)
        {
            _productDal = productDal;
            _categoryService = categoryService;
            _productImageService = productImageService;
            _unitOfWork = unitOfWork;
        }

        public IDataResult<List<Product>> Add(ProductForAddDto productForAddDto)
        {

            IResult result = BusinessRules.Run(
                CheckIfProductCountOfCategoryCorrect(productForAddDto.CategoryId),
                CheckIfProductNameExists(productForAddDto.Name),
                CheckIfCategoryLimitExceded()
                );

            if (result != null)
            {
                return new ErrorDataResult<List<Product>>(result.Message);
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
            //_productDal.Commit();
            ProductImage productImageToAdd = new ProductImage
            {
                ProductId = productToAdd.ProductId
            };
            _productImageService.Add(productForAddDto.file, productImageToAdd, productToAdd.ProductId);
            
            var productInfo = _productDal.GetAll(p => p.ProductId == productToAdd.ProductId);
            return new SuccessDataResult<List<Product>>(productInfo, Messages.ProductAdded);
        }

        public IResult Update(Product product)
        {
            _productDal.Update(product);
            _unitOfWork.SaveChanges();
            return new SuccessResult(Messages.ProductUpdated);
        }

        public IResult Delete(Product product)
        {
            _productDal.Delete(product);
            _unitOfWork.SaveChanges();
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
        private IResult CheckIfProductCountOfCategoryCorrect(int categoryId)
        {
            return new SuccessResult();
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

        private IResult CheckIfCategoryLimitExceded()
        {
            var result = _categoryService.GetAll();
            return new SuccessResult();
        }


    }
}
