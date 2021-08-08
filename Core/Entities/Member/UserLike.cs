using Core.Entities.Identity;

namespace Core.Entities.Member
{
    // Joint entity for user and userlike
    public class UserLike
    {
       public AppUser SourceUser { get; set; }
       public int SourceUserId { get; set; }   
       public AppUser LikedUser { get; set; }
       public int LikedUserId { get; set; }
    }
}