using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class CategoryManager : ICategoryService
    {
        ICategoryDal _categortDal;
        public CategoryManager(ICategoryDal categortDal)
        {
            _categortDal = categortDal;
        }

        public IResult Add(Category category)
        {
            _categortDal.Add(category);
            return new SuccessResult("Marka eklendi");
        }

        public IResult Delete(Category category)
        {
            _categortDal.Delete(category);
            return new SuccessResult("Marka silindi");
        }

        public IResult Update(Category category)
        {
            _categortDal.Update(category);
            return new SuccessResult("Marka güncellendi");
        }

        public IDataResult<List<Category>> GetAll()
        {
            return new SuccessDataResult<List<Category>>(_categortDal.GetAll());
        }

        public IDataResult<Category> GetById(int categoryId)
        {
            return new SuccessDataResult<Category>(_categortDal.Get(c => c.CategoryId == categoryId));

        }
    }
}
