using Core.Utilities.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Business
{
    public class BusinessRules
    {
        public static Task<IResult> Run(params IResult[] logics) {
            foreach (var logic in logics) {
                if (!logic.Success) {
                    return Task.FromResult(logic);
                }
            }
            return null;
        }
    }
}
