using System.ComponentModel.DataAnnotations.Schema;
using Core.Entities.Identity;

namespace Core.Entities.Member
{
    [Table("Photos")]
    public class Photo
    {
        
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        //Entity Framework conventions
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}