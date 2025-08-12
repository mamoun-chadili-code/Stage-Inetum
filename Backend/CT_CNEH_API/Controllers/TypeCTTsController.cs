using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeCTTsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeCTTsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TypeCTTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeCTT>>> GetTypeCTTs()
        {
            return await _context.TypeCTTs.ToListAsync();
        }

        // GET: api/TypeCTTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeCTT>> GetTypeCTT(int id)
        {
            var typeCTT = await _context.TypeCTTs.FindAsync(id);

            if (typeCTT == null)
                return NotFound();

            return typeCTT;
        }
    }
} 