using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class UsingStateValidator : AbstractValidator<UsingState>
    {
        public UsingStateValidator()
        {

            RuleFor(us => us.Name).NotEmpty();
        }
    }
}
