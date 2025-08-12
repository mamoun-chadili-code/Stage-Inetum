using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatutsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatutsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Statuts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatutRC>>> GetStatuts()
        {
            return await _context.StatutRCs.ToListAsync();
        }

        // GET: api/Statuts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatutRC>> GetStatut(int id)
        {
            var statut = await _context.StatutRCs.FindAsync(id);

            if (statut == null)
                return NotFound();

            return statut;
        }
    }
} 