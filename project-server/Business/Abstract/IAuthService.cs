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
        IDataResult<User> Register(UserForRegisterDto userForRegisterDto, string password);
        IDataResult<User> Login(UserForLoginDto userForLoginDto);
        IResult UserExists(string email);
        IDataResult<AccessToken> CreateAccessTokenForRegister(User user);
        IDataResult<AccessToken> CreateAccessTokenForLogin(User user);

        IResult ChangePassword(ChangePasswordDto changePasswordDto);
        IResult BlockUser(string email);
        IResult UnBlockUser(int id);
    }
}
