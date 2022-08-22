using Business.Abstract;
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
    public class UsingStateManager : IUsingStateService
    {
        IUsingStateDal _usingStateDal;
        public UsingStateManager(IUsingStateDal usingStateDal)
        {
            _usingStateDal = usingStateDal;
        }

        public IDataResult<List<UsingState>> GetAll()
        {
            return new SuccessDataResult<List<UsingState>>(_usingStateDal.GetAll(), "Kullanım Durumları getirildi");
        }

        public IDataResult<UsingState> GetById(int usingStateId)
        {
            return new SuccessDataResult<UsingState>(_usingStateDal.Get(us => us.UsingStateId == usingStateId), "Kullanım Durumları getirildi");
        }

        public IResult Add(UsingState usingState)
        {
            _usingStateDal.Add(usingState);
            _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu eklendi");
        }

        public IResult Delete(int usingStateId)
        {
            var usingStateToDelete = _usingStateDal.Get(u => u.UsingStateId == usingStateId);
            _usingStateDal.Delete(usingStateToDelete);
            _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu silindi");
        }

        public IResult Update(UsingStateForUpdateDto usingStateForUpdateDto)
        {
            var usingStateToUpdate = _usingStateDal.Get(u => u.UsingStateId == usingStateForUpdateDto.UsingStateId);
            usingStateToUpdate.Name = usingStateForUpdateDto.Name;
            _usingStateDal.Update(usingStateToUpdate);
            _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu güncellendi");
        }
    }
}
