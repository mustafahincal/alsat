using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsingStatesController : Controller
    {
        IUsingStateService _usingStateService;
        public UsingStatesController(IUsingStateService usingStateService)
        {
            _usingStateService = usingStateService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _usingStateService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getbyid")]
        public IActionResult GetById(int id)
        {
            var result = _usingStateService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("add")]
        public IActionResult Add(UsingState usingState)
        {
            var result = _usingStateService.Add(usingState);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("delete")]
        public IActionResult Delete(UsingState usingState)
        {
            var result = _usingStateService.Delete(usingState);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(UsingState usingState)
        {
            var result = _usingStateService.Update(usingState);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
