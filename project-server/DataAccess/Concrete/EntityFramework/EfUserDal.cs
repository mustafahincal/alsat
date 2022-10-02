using Core.Entities.Concrete;
using Core.Entities.Dtos;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.Context;
using DataAccess.Repository.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : EfEntityRepositoryBase<User>, IUserDal
    {
        PrimeforContext _primeforContext;
        public EfUserDal(PrimeforContext primeforContext) : base(primeforContext)
        {
            _primeforContext = primeforContext;
        }

        public async Task<List<OperationClaim>> GetClaims(User user)
        {

            var result = from operationClaim in _primeforContext.OperationClaims
                         join userOperationClaim in _primeforContext.UserOperationClaims
                             on operationClaim.OperationClaimId equals userOperationClaim.OperationClaimId
                         where userOperationClaim.UserId == user.UserId
                         select new OperationClaim { OperationClaimId = operationClaim.OperationClaimId, Name = operationClaim.Name };
            return await result.ToListAsync();
        }

        public async  Task<List<UserDetailDto>> GetUserDetails(Expression<Func<UserDetailDto, bool>> filter = null)
        {

            var result = from u in _primeforContext.Users
                         join uo in _primeforContext.UserOperationClaims
                         on u.UserId equals uo.UserId
                         join o in _primeforContext.OperationClaims
                         on uo.OperationClaimId equals o.OperationClaimId
                         select new UserDetailDto
                         {
                             UserId = u.UserId,
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             PasswordHash = u.PasswordHash,
                             PasswordSalt = u.PasswordSalt,
                             Email = u.Email,
                             Status = u.Status,
                             OperationClaimId = o.OperationClaimId,
                             OperationClaimName = o.Name
                         };
            return filter == null
            ? await result.ToListAsync()
            : await result.Where(filter).ToListAsync();


        }


    }
}
