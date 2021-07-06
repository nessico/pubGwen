using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        //Takes multiple include statements, which is aggregated together and passed into our IQueryable list
        //e.g. you can also get product type & product brand 
        //which is passed into GenericRepository where the queries are executed to get data from database
        //from ProductsController where the user can see the return values
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
        {
            var query = inputQuery;

            //Get a product where the product is equal to the criteria, spec.Criteria replaces p => p.ProductTypeId == id
            if (spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }

            if (spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }

            if (spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }


            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
}