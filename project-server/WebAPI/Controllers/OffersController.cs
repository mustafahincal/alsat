using Business.Abstract;
using Entities.Concrete;
using Entities.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : Controller
    {

        IOfferService _offerService;

        public OffersController(IOfferService offerService)
        {
            _offerService = offerService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _offerService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getbyid")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _offerService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [HttpGet("getofferdetails")]
        public async Task<IActionResult> GetOfferDetails()
        {
            var result = await _offerService.GetOfferDetails();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getofferdetailsbyuserid")]
        public async Task<IActionResult> GetOfferDetailsByUserId(int userId)
        {
            var result = await _offerService.GetOfferDetailsByUserId(userId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getofferdetailsbyownerid")]
        public async Task<IActionResult> GetOfferDetailsByOwnerId(int ownerId)
        {
            var result = await _offerService.GetOfferDetailsByOwnerId(ownerId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("getofferdetailsbyid")]
        public async Task<IActionResult> GetOfferDetailsById(int id)
        {
            var result = await _offerService.GetOfferDetailsById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [HttpPost("add")]
        public async Task<IActionResult> Add(Offer offer)
        {
            var result = await _offerService.Add(offer);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("delete")]
        public async Task<IActionResult> Delete(int offerId)
        {
            var result = await _offerService.Delete(offerId);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update(OfferForUpdateDto offerForUpdateDto)
        {
            var result = await _offerService.Update(offerForUpdateDto);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}
