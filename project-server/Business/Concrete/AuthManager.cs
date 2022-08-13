using Business.Abstract;
using Business.Constants;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using Core.Utilities.Security.Hashing;
using Core.Utilities.Security.JWT;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private IUserService _userService;
        private ITokenHelper _tokenHelper;
        IUnitOfWork _unitOfWork;

     
        public AuthManager(IUserService userService, ITokenHelper tokenHelper, IUnitOfWork unitOfWork)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
            _unitOfWork = unitOfWork;
        }

        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto, string password)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true
            };
            _userService.Add(user);
            _unitOfWork.SaveChanges();
            return new SuccessDataResult<User>(user, Messages.UserRegistered);
        }

        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            var userToCheck = _userService.GetByMail(userForLoginDto.Email).Data;
            if (userToCheck == null)
            {
                return new ErrorDataResult<User>(Messages.UserNotFound);
            }

            if (!HashingHelper.VerifyPasswordHash(userForLoginDto.Password, userToCheck.PasswordHash, userToCheck.PasswordSalt))
            {
                return new ErrorDataResult<User>(Messages.PasswordError);
            }

            return new SuccessDataResult<User>(userToCheck, Messages.SuccessfulLogin);
        }

        //public IResult BlockUser()
        //{
        //    var userToCheck = _userService.GetByMail(userForLoginDto.Email).Data;
        //    userToCheck.Status = false;
        //    _unitOfWork.SaveChanges();
        //    return new SuccessResult("kullanıcı bloke edildi");
        //}


        //public void SendMessage(string server, string email)
        //{
        //    string to = email;
        //    string from = "ben@contoso.com";
        //    MailMessage message = new MailMessage(from, to);
        //    message.Subject = "Using the new SMTP client.";
        //    message.Body = @"Using this new feature, you can send an email message from an application very easily.";
        //    SmtpClient client = new SmtpClient(server);
        //    // Credentials are necessary if the server requires the client
        //    // to authenticate before it will send email on the client's behalf.
        //    client.UseDefaultCredentials = true;

        //    try
        //    {
        //        client.Send(message);
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
        //            ex.ToString());
        //    }
        //}

        public IResult ChangePassword(ChangePasswordDto changePasswordDto)
        {
            byte[] passwordHash, passwordSalt;
            var userToCheck = _userService.GetByMail(changePasswordDto.UserEmail).Data;
            if (userToCheck == null)
            {
                return new ErrorDataResult<User>("Email geçersiz");
            }
            if (!HashingHelper.VerifyPasswordHash(changePasswordDto.OldPass, userToCheck.PasswordHash, userToCheck.PasswordSalt))
            {
                return new ErrorDataResult<User>("Eski şifre geçersiz");
            }
            HashingHelper.CreatePasswordHash(changePasswordDto.NewPass, out passwordHash, out passwordSalt);
            userToCheck.PasswordHash = passwordHash;
            userToCheck.PasswordSalt = passwordSalt;
            _userService.Update(userToCheck);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Şifre başarıyla değiştirildi");

        }

        public IResult UserExists(string email)
        {
            if (_userService.GetByMail(email).Data != null)
            {
                return new ErrorResult(Messages.UserAlreadyExists);
            }
            return new SuccessResult();
        }

        public IDataResult<AccessToken> CreateAccessTokenForRegister(User user)
        {
            var claims = _userService.GetClaims(user).Data;
            var accessToken = _tokenHelper.CreateToken(user, claims);
            return new SuccessDataResult<AccessToken>(accessToken, Messages.UserRegistered);
        }

        public IDataResult<AccessToken> CreateAccessTokenForLogin(User user)
        {
            var claims = _userService.GetClaims(user).Data;
            var accessToken = _tokenHelper.CreateToken(user, claims);
            return new SuccessDataResult<AccessToken>(accessToken, Messages.SuccessfulLogin);
        }

    }
}
