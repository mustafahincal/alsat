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
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private IUserService _userService;
        private ITokenHelper _tokenHelper;

     
        public AuthManager(IUserService userService, ITokenHelper tokenHelper)
        {
            _userService = userService;
            _tokenHelper = tokenHelper;
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

            string messageHeader = "Aramıza Hoşgeldinn..!!";
            string messageBody = "ALSAT'a Merhaba De!";
            SendMessage(userForRegisterDto.Email,messageBody,messageHeader);
            _userService.Add(user);
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

        public IResult BlockUser(string email)
        {
            var userToCheck = _userService.GetByMail(email).Data;
            userToCheck.Status = false;
            _userService.Update(userToCheck);
            string messageHeader = "Hesabın Bloke Edildi";
            string messageBody = "3 kez hatalı şifre girdiğinizden dolayı hesabınız bloke edildi.";
            SendMessage(email, messageBody, messageHeader);
            return new SuccessResult("Kullanıcı bloke edildi");
        }

        public IResult UnBlockUser(int id)
        {
            var userToCheck = _userService.GetById(id).Data;    
            userToCheck.Status = true;
            _userService.Update(userToCheck);
            return new SuccessResult("Kullanıcı blokesi kaldırıldı");
        }

        public void SendMessage(string email, string messageBody, string messageHeader)
        {
            
            MailMessage message = new MailMessage();
            message.To.Add(new MailAddress(email));
            message.From = new MailAddress("denemehncal@gmail.com");
            message.Subject = messageHeader;
            message.Body = messageBody;
            message.IsBodyHtml = true;
            message.Priority = MailPriority.High;

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            NetworkCredential AccountInfo = new NetworkCredential("denemehncal@gmail.com", "hngzfbviibonhevt");
            client.UseDefaultCredentials = false;
            client.Credentials = AccountInfo;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
                    ex.ToString());
            }
        }

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
