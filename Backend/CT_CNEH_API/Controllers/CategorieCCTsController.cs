using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorieCCTsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategorieCCTsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategorieCCTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorieCCT>>> GetCategorieCCTs()
        {
            return await _context.CategorieCCTs.ToListAsync();
        }

        // GET: api/CategorieCCTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieCCT>> GetCategorieCCT(int id)
        {
            var categorieCCT = await _context.CategorieCCTs.FindAsync(id);

            if (categorieCCT == null)
                return NotFound();

            return categorieCCT;
        }
    }
} 