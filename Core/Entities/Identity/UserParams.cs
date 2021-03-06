namespace Core.Entities.Member.Parameters
{
    public class UserParams : PaginationParams
    {


        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;

        // Sorting functionality
        public string OrderBy { get; set; } = "lastActive";
    }
}