using Core.Entities.Concrete;
using Core.Utilities.Security.Hashing;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework.Context
{
    public class PrimeforContext : DbContext
    {
        public PrimeforContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<OperationClaim> OperationClaims { get; set; }
        public DbSet<UserOperationClaim> UserOperationClaims { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<UsingState> UsingStates { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            HashingHelper.CreatePasswordHash("12345678", out byte[] hash, out byte[] salt);
            User[] users = {
                new User
                {
                    UserId = 1,
                    Email = "admin@mail.com",
                    FirstName = "Admin",
                    LastName = "Admin",
                    Status=true,
                    PasswordHash=hash,
                    PasswordSalt=salt
                }
            };
            OperationClaim[] operationClaims = { 
                new OperationClaim { OperationClaimId = 1, Name = "Admin" },
                new OperationClaim { OperationClaimId = 2, Name = "Kullanıcı" } 
            };
            UserOperationClaim[] userOperationClaims = { new UserOperationClaim { UserOperationClaimId = 1, UserId = 1, OperationClaimId = 1 } };
            modelBuilder.Entity<User>().HasData(users);
            modelBuilder.Entity<UserOperationClaim>().HasData(userOperationClaims);
            modelBuilder.Entity<OperationClaim>().HasData(operationClaims);
            base.OnModelCreating(modelBuilder);
        }
    }
}
