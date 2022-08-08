using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UsingStateManager : IUsingStateService
    {
        IUsingStateDal _usingStateDal;
        public UsingStateManager(IUsingStateDal usingStateDal)
        {
            _usingStateDal = usingStateDal;
        }

        public IDataResult<List<UsingState>> GetAll()
        {
            return new SuccessDataResult<List<UsingState>>(_usingStateDal.GetAll(), "Renkler getirildi");
        }

        public IDataResult<UsingState> GetById(int usingStateId)
        {
            return new SuccessDataResult<UsingState>(_usingStateDal.Get(us => us.UsingStateId == usingStateId), "Renkler getirildi");
        }

        public IResult Add(UsingState usingState)
        {
            _usingStateDal.Add(usingState);
            return new SuccessResult("Renk eklendi");
        }

        public IResult Delete(UsingState usingState)
        {
            _usingStateDal.Delete(usingState);
            return new SuccessResult("Renk silindi");
        }

        public IResult Update(UsingState usingState)
        {
            _usingStateDal.Update(usingState);
            return new SuccessResult("Renk güncellendi");
        }
    }
}
