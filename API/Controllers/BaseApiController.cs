using API.Helpers;
using Microsoft.AspNetCore.Mvc;

//applies to all controllers
namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

    }
}