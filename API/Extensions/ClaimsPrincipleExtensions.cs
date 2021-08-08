
using System.Linq;
using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        // Get unique name property from token
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        // Get unique id property from token
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

        // Get unique email property from token
        public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }
    }
}