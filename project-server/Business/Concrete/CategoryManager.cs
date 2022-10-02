using Business.Abstract;
using Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
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

        [SecuredOperation("Admin")]
        [ValidationAspect(typeof(CategoryValidator))]
        public async Task<IResult> Add(Category category)
        {
            IResult result =  BusinessRules.Run(
                await CheckIfCategoryNameExists(category.Name)
                ); 


            if (result != null)
            {
                return new ErrorDataResult<List<Category>>(result.Message);
            }

            _categortDal.Add(category);
            await _categortDal.Commit();
            return new SuccessResult("Kategori eklendi");
        }
        [SecuredOperation("Admin")]
        public async Task<IResult> Delete(int categoryId)
        {
            var categoryToDelete = await _categortDal.Get(c => c.CategoryId == categoryId); 
            _categortDal.Delete(categoryToDelete);
            await _categortDal.Commit();
            return new SuccessResult("Kategori silindi");
        }
        [SecuredOperation("Admin")]
        public async Task<IResult> Update(CategoryForUpdateDto categoryForUpdateDto)
        {
            IResult result =  BusinessRules.Run(
                await CheckIfCategoryNameExists(categoryForUpdateDto.Name)
                );


            if (result != null)
            {
                return new ErrorDataResult<List<Category>>(result.Message);
            }

            var categoryToUpdate = await  _categortDal.Get(c => c.CategoryId == categoryForUpdateDto.CategoryId);
            categoryToUpdate.Name = categoryForUpdateDto.Name;
            _categortDal.Update(categoryToUpdate);
            await _categortDal.Commit();
            return new SuccessResult("Kategori güncellendi");
        }

        public async Task<IDataResult<List<Category>>> GetAll()
        {
            return new SuccessDataResult<List<Category>>(await _categortDal.GetAll());
        }

        public async Task< IDataResult<Category>> GetById(int categoryId)
        {
            return new SuccessDataResult<Category>(await _categortDal.Get(c => c.CategoryId == categoryId));

        }

        private async Task<IResult> CheckIfCategoryNameExists(string categoryName)
        {
            var result = (await _categortDal.GetAll(c => c.Name == categoryName)).Any();
            if (result)
            {
                return new ErrorResult(Messages.CategoryNameAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
