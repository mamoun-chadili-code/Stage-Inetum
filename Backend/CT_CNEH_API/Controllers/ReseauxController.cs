using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReseauxController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReseauxController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reseaux
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reseau>>> GetReseaux(
            [FromQuery] string? nom,
            [FromQuery] string? agrement,
            [FromQuery] DateTime? dateAgrement,
            [FromQuery] int? statutId,
            [FromQuery] DateTime? dateStatut,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = _context.Reseaux
                .Include(r => r.Statut)
                .Include(r => r.Ville)
                .Include(r => r.CadreAutorisation)
                .AsQueryable();

            // Filtres
            if (!string.IsNullOrEmpty(nom))
            {
                var nomLower = nom.ToLower();
                query = query.Where(r => r.Nom.ToLower().Contains(nomLower));
            }

            if (!string.IsNullOrEmpty(agrement))
            {
                var agrementLower = agrement.ToLower();
                query = query.Where(r => r.Agrement.ToLower().Contains(agrementLower));
            }

            if (dateAgrement.HasValue)
                query = query.Where(r => r.DateAgrement.Date == dateAgrement.Value.Date);

            if (statutId.HasValue)
                query = query.Where(r => r.StatutId == statutId.Value);

            if (dateStatut.HasValue)
                query = query.Where(r => r.DateStatut.Date == dateStatut.Value.Date);

            // Pagination
            var totalCount = await query.CountAsync();
            var reseaux = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page-Count", Math.Ceiling((double)totalCount / pageSize).ToString());

            return Ok(reseaux);
        }

        // GET: api/Reseaux/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reseau>> GetReseau(int id)
        {
            var reseau = await _context.Reseaux
                .Include(r => r.Statut)
                .Include(r => r.Ville)
                .Include(r => r.CadreAutorisation)
                .Include(r => r.CCTs)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reseau == null)
                return NotFound();

            return reseau;
        }

        // POST: api/Reseaux
        [HttpPost]
        public async Task<ActionResult<Reseau>> CreateReseau([FromBody] Reseau reseau)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );
                
                return BadRequest(new { 
                    message = "Erreurs de validation",
                    errors = errors,
                    modelState = ModelState
                });
            }

            _context.Reseaux.Add(reseau);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReseau), new { id = reseau.Id }, reseau);
        }

        // PUT: api/Reseaux/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReseau(int id, [FromBody] Reseau reseau)
        {
            if (id != reseau.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existing = await _context.Reseaux.FindAsync(id);
            if (existing == null)
                return NotFound();

            // Mise à jour des propriétés scalaires et FKs
            existing.Nom = reseau.Nom;
            existing.Agrement = reseau.Agrement;
            existing.DateAgrement = reseau.DateAgrement;
            existing.StatutId = reseau.StatutId;
            existing.DateStatut = reseau.DateStatut;
            existing.AdresseSiege = reseau.AdresseSiege;
            existing.AdresseDomiciliation = reseau.AdresseDomiciliation;
            existing.VilleId = reseau.VilleId;
            existing.Tel = reseau.Tel;
            existing.Fax = reseau.Fax;
            existing.Mail = reseau.Mail;
            existing.Ice = reseau.Ice;
            existing.IdFiscal = reseau.IdFiscal;
            existing.RegisterCommerce = reseau.RegisterCommerce;
            existing.CadreAutorisationId = reseau.CadreAutorisationId;
            existing.NomRepresentantLegal = reseau.NomRepresentantLegal;
            existing.AdressRepresentantLegal = reseau.AdressRepresentantLegal;
            existing.TelRepresentantLegal = reseau.TelRepresentantLegal;
            existing.MailRepresentant = reseau.MailRepresentant;
            // Ajoute ici d'autres champs si besoin

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReseauExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Reseaux/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReseau(int id)
        {
            var reseau = await _context.Reseaux.FindAsync(id);
            if (reseau == null)
                return NotFound();

            _context.Reseaux.Remove(reseau);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Reseaux/5/logo
        [HttpGet("{id}/logo")]
        public async Task<IActionResult> GetLogo(int id)
        {
            var reseau = await _context.Reseaux.FindAsync(id);
            if (reseau?.Logo == null)
                return NotFound();

            return File(reseau.Logo, "image/png");
        }

        // POST: api/Reseaux/5/logo
        [HttpPost("{id}/logo")]
        public async Task<IActionResult> UploadLogo(int id, IFormFile file)
        {
            var reseau = await _context.Reseaux.FindAsync(id);
            if (reseau == null)
                return NotFound();

            if (file == null || file.Length == 0)
                return BadRequest("Aucun fichier fourni");

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            reseau.Logo = memoryStream.ToArray();

            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ReseauExists(int id)
        {
            return _context.Reseaux.Any(e => e.Id == id);
        }
    }
} 