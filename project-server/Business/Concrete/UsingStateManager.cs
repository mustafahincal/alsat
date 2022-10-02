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
    public class UsingStateManager : IUsingStateService
    {
        IUsingStateDal _usingStateDal;
        public UsingStateManager(IUsingStateDal usingStateDal)
        {
            _usingStateDal = usingStateDal;
        }

        public async Task<IDataResult<List<UsingState>>> GetAll()
        {
            return new SuccessDataResult<List<UsingState>>(await _usingStateDal.GetAll(), "Kullanım Durumları getirildi");
        }

        public async Task<IDataResult<UsingState>> GetById(int usingStateId)
        {
            return new SuccessDataResult<UsingState>(await _usingStateDal.Get(us => us.UsingStateId == usingStateId), "Kullanım Durumları getirildi");
        }

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(UsingStateValidator))]
        public async Task<IResult> Add(UsingState usingState)
        {

            IResult result = BusinessRules.Run(
                await CheckIfUsingStateNameExists(usingState.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<UsingState>>(result.Message);
            }

            _usingStateDal.Add(usingState);
            await _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu eklendi");
        }

        [SecuredOperation("Admin")]
        public async Task<IResult> Delete(int usingStateId)
        {
            var usingStateToDelete = await _usingStateDal.Get(u => u.UsingStateId == usingStateId);
            _usingStateDal.Delete(usingStateToDelete);
            await _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu silindi");
        }

        [SecuredOperation("Admin")]
        public async Task<IResult> Update(UsingStateForUpdateDto usingStateForUpdateDto)
        {

            IResult result = BusinessRules.Run(
                await CheckIfUsingStateNameExists(usingStateForUpdateDto.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<UsingState>>(result.Message);
            }

            var usingStateToUpdate =await _usingStateDal.Get(u => u.UsingStateId == usingStateForUpdateDto.UsingStateId);
            usingStateToUpdate.Name = usingStateForUpdateDto.Name;
            _usingStateDal.Update(usingStateToUpdate);
            await _usingStateDal.Commit();
            return new SuccessResult("Kullanım Durumu güncellendi");
        }

        private async Task<IResult> CheckIfUsingStateNameExists(string usingState)
        {
            var result = (await  _usingStateDal.GetAll(u => u.Name == usingState)).Any();
            if (result)
            {
                return new ErrorResult(Messages.UsingStateNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
