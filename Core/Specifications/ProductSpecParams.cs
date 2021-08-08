using Microsoft.EntityFrameworkCore.Storage;

namespace Core.Specifications
{
    // Parameters for ProductsController for sorting, filtering, paging
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;

        // Default returns first page
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        private string _search;
        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

    }
}