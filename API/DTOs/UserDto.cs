namespace API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string DisplayName { get; set; }

        // Saves us from using an api call
        public string Gender { get; set; }
    }
}