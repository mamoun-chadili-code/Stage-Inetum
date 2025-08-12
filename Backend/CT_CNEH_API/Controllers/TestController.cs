using Microsoft.AspNetCore.Mvc;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "API fonctionne !", timestamp = DateTime.Now });
        }

        [HttpGet("agents")]
        public IActionResult GetAgents()
        {
            try
            {
                return Ok(new { message = "Endpoint agents accessible", count = 6 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("statuts")]
        public IActionResult GetStatuts()
        {
            try
            {
                return Ok(new { message = "Endpoint statuts accessible", count = 3 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
} 