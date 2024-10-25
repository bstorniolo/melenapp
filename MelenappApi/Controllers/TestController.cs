using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using MelenappApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MelenappApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello, World!");
        }
    }
    
}