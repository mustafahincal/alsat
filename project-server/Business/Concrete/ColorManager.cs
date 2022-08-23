using Business.Abstract;
using Business.Constants;
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

        public IDataResult<List<Color>> GetAll()
        {
            return new SuccessDataResult<List<Color>>(_colorDal.GetAll(), "Renkler getirildi");
        }

        public IDataResult<Color> GetById(int colorId)
        {
            return new SuccessDataResult<Color>(_colorDal.Get(c => c.ColorId == colorId), "Renkler getirildi");
        }

        public IResult Add(Color color)
        {

            IResult result = BusinessRules.Run(
                CheckIfColorNameExists(color.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Color>>(result.Message);
            }

            _colorDal.Add(color);
            _colorDal.Commit();
            return new SuccessResult("Renk eklendi");
        }

        public IResult Delete(int colorId)
        {
            var colorToDelete = _colorDal.Get(c => c.ColorId == colorId);
            _colorDal.Delete(colorToDelete);
            _colorDal.Commit();
            return new SuccessResult("Renk silindi");
        }

        public IResult Update(ColorForUpdateDto colorForUpdateDto)
        {

            IResult result = BusinessRules.Run(
                CheckIfColorNameExists(colorForUpdateDto.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Color>>(result.Message);
            }

            var colorToUpdate = _colorDal.Get(c => c.ColorId == colorForUpdateDto.ColorId);
            colorToUpdate.Name = colorForUpdateDto.Name;
            _colorDal.Update(colorToUpdate);
            _colorDal.Commit();
            return new SuccessResult("Renk güncellendi");
        }

        private IResult CheckIfColorNameExists(string colorName)
        {
            var result = _colorDal.GetAll(c => c.Name == colorName).Any();
            if (result)
            {
                return new ErrorResult(Messages.ColorNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
