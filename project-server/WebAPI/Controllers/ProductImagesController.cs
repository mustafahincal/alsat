using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImagesController : Controller
    {
        IProductImageService _productImageService;

        public ProductImagesController(IProductImageService productImageService)
        {
            _productImageService = productImageService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromForm] IFormFile file, [FromForm] int productId)
        {
           
            var result = await _productImageService.Add(file, productId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromForm] IFormFile file, [FromForm] int productImageId)
        { 

            var result = await _productImageService.Update(file, productImageId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("delete")]
        public async Task<IActionResult> Delete(int productImageId)
        {
            var result = await _productImageService.Delete(productImageId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

       

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _productImageService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetByProductId(int id)
        {
            var result = await _productImageService.GetByProductId(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return Ok(result);
        }

        [HttpGet("getbyimageid")]
        public async Task<IActionResult> GetByImageId(int imageId)
        {
            var result = await _productImageService.GetByImageId(imageId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}

