using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
         
            RuleFor(p => p.Name).MaximumLength(100).NotEmpty();
            RuleFor(p => p.Description).MaximumLength(500).NotEmpty();
            RuleFor(p => p.CategoryId).NotEmpty();
            RuleFor(p => p.UsingStateId).NotEmpty();
            RuleFor(p => p.Price).GreaterThan(0).NotEmpty();
        }
    }
}
