using Core.Entities.Concrete;
using Core.Utilities.Results;
using Core.Utilities.Security.JWT;
using Entities.Dtos;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IAuthService
    {
        Task<IDataResult<User>> Register(UserForRegisterDto userForRegisterDto, string password);
        Task<IDataResult<User>>  Login(UserForLoginDto userForLoginDto);
        Task<IResult> UserExists(string email);
        Task<IDataResult<AccessToken>> CreateAccessTokenForRegister(User user);
        Task<IDataResult<AccessToken>> CreateAccessTokenForLogin(User user);

        Task<IResult> ChangePassword(ChangePasswordDto changePasswordDto);
        Task<IResult> BlockUser(string email);
        Task<IResult> UnBlockUser(int id);
    }
}
