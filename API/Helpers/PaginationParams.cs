namespace API.Helpers
{
    public class PaginationParams
    {

        //Default page number(1) and page size(10), with the max page size of 50,
        //If client chooses a different a different value from 10, and if its over 50, then its set to 50
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}