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
        IDataResult<List<User>> GetAll();
        IDataResult<User> GetById(int userId);
        IDataResult<List<OperationClaim>> GetClaims(User user);
        IDataResult<List<UserDetailDto>> GetUserDetails();
        IDataResult<List<UserDetailDto>> GetUserDetailsById(int userId);
        IDataResult<User> GetByMail(string email);
        IResult Add(User user);
        IResult Delete(int id);
        IResult Update(UserForUpdateDto userForUpdateDto);

    }
}
