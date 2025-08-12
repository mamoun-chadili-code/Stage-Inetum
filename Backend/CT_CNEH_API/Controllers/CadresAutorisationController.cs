using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CadresAutorisationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CadresAutorisationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CadresAutorisation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CadreAutorisation>>> GetCadresAutorisation()
        {
            return await _context.CadreAutorisations.ToListAsync();
        }

        // GET: api/CadresAutorisation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CadreAutorisation>> GetCadreAutorisation(int id)
        {
            var cadre = await _context.CadreAutorisations.FindAsync(id);

            if (cadre == null)
                return NotFound();

            return cadre;
        }
    }
} 