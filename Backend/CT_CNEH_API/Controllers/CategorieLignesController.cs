using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorieLignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategorieLignesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CategorieLignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorieLigne>>> GetCategories()
        {
            return await _context.CategorieLignes.ToListAsync();
        }

        // GET: api/CategorieLignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieLigne>> GetCategory(int id)
        {
            var category = await _context.CategorieLignes.FindAsync(id);

            if (category == null)
                return NotFound();

            return category;
        }
    }
}

