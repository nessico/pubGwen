using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Validation for non-empty UserName, this is called data annotations

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}