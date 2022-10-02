using Business.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        IProductService _productService;
        IProductImageService _productImageService;

        private readonly ILogger<ProductsController> _logger;
        public ProductsController(IProductService productService, IProductImageService productImageService, ILogger<ProductsController> logger)
        {
            _productService = productService;
            _productImageService = productImageService;
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromForm] IFormFile file, [FromForm] string body)
        {
            var productForAddDto = JsonConvert.DeserializeObject<ProductForAddDto>(body);
            productForAddDto.file = file;
            var result = await _productService.Add(productForAddDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("delete")]
        public async Task<IActionResult> Delete(int productId)
        {
            var result = await _productService.Delete(productId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(ProductForUpdateDto productForUpdateDto)
        {
            var result = await _productService.Update(productForUpdateDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {

            var result = await _productService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getbyid")] 
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _productService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetails")]
        public async Task<IActionResult> GetProductDetails()
        {
            var result = await _productService.GetProductDetails();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbyid")]
        public async Task<IActionResult> GetProductDetailsById(int id)
        {
            var result = await _productService.GetProductDetailsById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbybrandid")]
        public async Task<IActionResult> GetProductDetailsByBrandId(int brandId)
        {
            var result = await _productService.GetProductDetailsByBrandId(brandId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbycategoryid")]
        public async Task<IActionResult> GetProductDetailsByCategoryId(int categoryId)
        {
            var result = await _productService.GetProductDetailsByCategoryId(categoryId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbycolorid")]
        public async Task<IActionResult> GetProductDetailsByColorId(int colorId)
        {
            var result = await _productService.GetProductDetailsByColorId(colorId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbyusingstateid")]
        public async Task<IActionResult> GetProductDetailsByUsingStateId(int usingStateId)
        {
            var result = await _productService.GetProductDetailsByUsingStateId(usingStateId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getproductdetailsbyownerid")]
        public async Task<IActionResult> GetProductDetailsByOwnerId(int ownerId)
        {
            var result = await _productService.GetProductDetailsByOwnerId(ownerId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


    }
}
