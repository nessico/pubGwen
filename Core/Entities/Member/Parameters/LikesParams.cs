namespace Core.Entities.Member.Parameters
{
    public class LikesParams : PaginationParams
    {
        public int UserId { get; set; }
        public string predicate { get; set; }
    }
}