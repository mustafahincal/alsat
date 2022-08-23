using Business.Abstract;
using Business.Constants;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
using Entities.Concrete;
using Entities.Dtos;
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
            IResult result = BusinessRules.Run(
                CheckIfCategoryNameExists(category.Name)
                ); 


            if (result != null)
            {
                return new ErrorDataResult<List<Category>>(result.Message);
            }

            _categortDal.Add(category);
            _categortDal.Commit();
            return new SuccessResult("Kategori eklendi");
        }

        public IResult Delete(int categoryId)
        {
            var categoryToDelete = _categortDal.Get(c => c.CategoryId == categoryId); 
            _categortDal.Delete(categoryToDelete);
            _categortDal.Commit();
            return new SuccessResult("Kategori silindi");
        }

        public IResult Update(CategoryForUpdateDto categoryForUpdateDto)
        {
            IResult result = BusinessRules.Run(
                CheckIfCategoryNameExists(categoryForUpdateDto.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Category>>(result.Message);
            }

            var categoryToUpdate = _categortDal.Get(c => c.CategoryId == categoryForUpdateDto.CategoryId);
            categoryToUpdate.Name = categoryForUpdateDto.Name;
            _categortDal.Update(categoryToUpdate);
            _categortDal.Commit();
            return new SuccessResult("Kategori güncellendi");
        }

        public IDataResult<List<Category>> GetAll()
        {
            return new SuccessDataResult<List<Category>>(_categortDal.GetAll());
        }

        public IDataResult<Category> GetById(int categoryId)
        {
            return new SuccessDataResult<Category>(_categortDal.Get(c => c.CategoryId == categoryId));

        }

        private IResult CheckIfCategoryNameExists(string categoryName)
        {
            var result = _categortDal.GetAll(c => c.Name == categoryName).Any();
            if (result)
            {
                return new ErrorResult(Messages.CategoryNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
