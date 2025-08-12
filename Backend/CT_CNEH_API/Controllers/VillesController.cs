using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VillesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VillesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Villes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ville>>> GetVilles()
        {
            return await _context.Villes.Include(v => v.Region).ToListAsync();
        }

        // GET: api/Villes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ville>> GetVille(int id)
        {
            var ville = await _context.Villes
                .Include(v => v.Region)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (ville == null)
                return NotFound();

            return ville;
        }
    }
} 