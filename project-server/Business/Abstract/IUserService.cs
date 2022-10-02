using Core.Entities.Concrete;
using Core.Entities.Dtos;
using Core.Utilities.Results;
using Entities.Concrete;
using Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService
    {
        Task<IDataResult<List<User>>> GetAll();
        Task<IDataResult<User>> GetById(int userId);
        Task<IDataResult<List<OperationClaim>>> GetClaims(User user);
        Task<IDataResult<List<UserDetailDto>>> GetUserDetails();
        Task<IDataResult<List<UserDetailDto>>> GetUserDetailsById(int userId);
        Task<IDataResult<User>> GetByMail(string email);
        Task<IResult> Add(User user);
        Task<IResult> Delete(int id);
        Task<IResult> Update(UserForUpdateDto userForUpdateDto);

    }
}
