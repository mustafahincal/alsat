using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ColorManager : IColorService
    {
        IColorDal _colorDal;
        public ColorManager(IColorDal colorDal)
        {
            _colorDal = colorDal;
        }

        public async Task<IDataResult<List<Color>>> GetAll()
        {
            return new SuccessDataResult<List<Color>>(await _colorDal.GetAll(), "Renkler getirildi");
        }

        public async Task<IDataResult<Color>> GetById(int colorId)
        {
            return new SuccessDataResult<Color>(await _colorDal.Get(c => c.ColorId == colorId), "Renkler getirildi");
        }

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(ColorValidator))]
        public async Task<IResult> Add(Color color)
        {

            IResult result = BusinessRules.Run(
                await CheckIfColorNameExists(color.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Color>>(result.Message);
            }

            _colorDal.Add(color);
            await _colorDal.Commit();
            return new SuccessResult("Renk eklendi");
        }

        [SecuredOperation("Admin")]
        public async Task<IResult> Delete(int colorId)
        {
            var colorToDelete = await _colorDal.Get(c => c.ColorId == colorId);
            _colorDal.Delete(colorToDelete);
            await _colorDal.Commit();
            return new SuccessResult("Renk silindi");
        }

        [SecuredOperation("Admin")]
        public async Task< IResult> Update(ColorForUpdateDto colorForUpdateDto)
        {

            IResult result =  BusinessRules.Run(
                await CheckIfColorNameExists(colorForUpdateDto.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Color>>(result.Message);
            }

            var colorToUpdate = await _colorDal.Get(c => c.ColorId == colorForUpdateDto.ColorId);
            colorToUpdate.Name = colorForUpdateDto.Name;
            _colorDal.Update(colorToUpdate);
            await _colorDal.Commit();
            return new SuccessResult("Renk güncellendi");
        }

        private async Task<IResult> CheckIfColorNameExists(string colorName)
        {
            var result = (await _colorDal.GetAll(c => c.Name == colorName)).Any();
            if (result)
            {
                return new ErrorResult(Messages.ColorNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
