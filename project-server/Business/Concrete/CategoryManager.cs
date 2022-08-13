using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework.UnitOfWork;
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
        IUnitOfWork _unitOfWork;
        public CategoryManager(ICategoryDal categortDal, IUnitOfWork unitOfWork)
        {
            _categortDal = categortDal;
            _unitOfWork = unitOfWork;
        }

        public IResult Add(Category category)
        {
            _categortDal.Add(category);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kategori eklendi");
        }

        public IResult Delete(Category category)
        {
            _categortDal.Delete(category);
            _unitOfWork.SaveChanges();
            return new SuccessResult("Kategori silindi");
        }

        public IResult Update(Category category)
        {
            _categortDal.Update(category);
            _unitOfWork.SaveChanges();
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
    }
}
