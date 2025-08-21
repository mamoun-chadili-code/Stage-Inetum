using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;

namespace CT_CNEH_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CCTsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CCTsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Ajout du DTO en haut du fichier (ou dans un fichier séparé si tu préfères)
        public class CCTDto
        {
            public int Id { get; set; }
            public string? Nom { get; set; }
            public string? Agrement { get; set; }
            public DateTime DateAgrement { get; set; }
            public string? Categorie { get; set; }
            public int? CategorieId { get; set; }  // Ajout de l'ID
            public string? Statut { get; set; }
            public int? StatutId { get; set; }     // Ajout de l'ID
            public DateTime DateStatut { get; set; }
            public string? Reseau { get; set; }
            public int? ReseauId { get; set; }     // Ajout de l'ID
            public DateTime DateRalliement { get; set; }
            public string AdresseCCT { get; set; } = string.Empty;
            public string Latitude { get; set; } = string.Empty;
            public string Longitude { get; set; } = string.Empty;
            public string? AdresseSiege { get; set; }
            public string? AdresseDomiciliation { get; set; }
            public string? Ville { get; set; }
            public int? VilleId { get; set; }      // Ajout de l'ID
            public string Tel { get; set; } = string.Empty;
            public string? Fax { get; set; }
            public string? Mail { get; set; }
            public string? Ice { get; set; }
            public string? IdFiscal { get; set; }
            public string? CadreAutorisation { get; set; }
            public int? CadreAutorisationId { get; set; }  // Ajout de l'ID
            public string? EngagementSpecifique { get; set; }
            public bool IsPersonneMorale { get; set; }
            public string? Type { get; set; }
            public int? TypeId { get; set; }       // Ajout de l'ID
            public int? QuotaVL { get; set; }
            public int? QuotaPL { get; set; }
            public string? Province { get; set; }
            public int? ProvinceId { get; set; }   // Ajout de l'ID
            public string? Region { get; set; }
            public int? RegionId { get; set; }     // Ajout de l'ID
        }

        public class CCTUpdateDto
        {
            public int Id { get; set; }
            public string? Nom { get; set; }
            public string? Agrement { get; set; }
            public DateTime DateAgrement { get; set; }
            public int CategorieId { get; set; }
            public int StatutId { get; set; }
            public DateTime DateStatut { get; set; }
            public int ReseauId { get; set; }
            public DateTime DateRalliement { get; set; }
            public string AdresseCCT { get; set; } = string.Empty;
            public string Latitude { get; set; } = string.Empty;
            public string Longitude { get; set; } = string.Empty;
            public string? AdresseSiege { get; set; }
            public string? AdresseDomiciliation { get; set; }
            public int VilleId { get; set; }
            public string Tel { get; set; } = string.Empty;
            public string? Fax { get; set; }
            public string? Mail { get; set; }
            public string? Ice { get; set; }
            public string? IdFiscal { get; set; }
            public int CadreAutorisationId { get; set; }
            public string? EngagementSpecifique { get; set; }
            public bool IsPersonneMorale { get; set; }
            public int TypeId { get; set; }
            public int? QuotaVL { get; set; }
            public int? QuotaPL { get; set; }
            public int? ProvinceId { get; set; }
            public int? RegionId { get; set; }
            public string? ThumbprintCertificat { get; set; }
        }

        // GET: api/CCTs/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<CCT>>> GetAllCCTs()
        {
            var ccts = await _context.CCTs
                .Select(c => new { c.Id, c.Nom })
                .ToListAsync();
            
            return Ok(ccts);
        }

        // GET: api/CCTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CCTDto>>> GetCCTs(
            [FromQuery] int? regionId,
            [FromQuery] int? villeId,
            [FromQuery] int? reseauId,
            [FromQuery] int? anneeDemarrage,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var query = _context.CCTs
                .Include(c => c.Region)
                .Include(c => c.Province)
                .Include(c => c.Ville)
                .Include(c => c.Reseau)
                .Include(c => c.Statut)
                .Include(c => c.Categorie)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .AsQueryable();

            // Filtres
            if (regionId.HasValue)
                query = query.Where(c => c.RegionId == regionId.Value);

            if (villeId.HasValue)
                query = query.Where(c => c.VilleId == villeId.Value);

            if (reseauId.HasValue)
                query = query.Where(c => c.ReseauId == reseauId.Value);

            if (anneeDemarrage.HasValue)
                query = query.Where(c => c.DateAgrement.Year == anneeDemarrage.Value);

            // Pagination
            var totalCount = await query.CountAsync();
            var ccts = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page-Count", Math.Ceiling((double)totalCount / pageSize).ToString());

            // Mapping vers DTO
            var cctDtos = ccts.Select(c => new CCTDto
            {
                Id = c.Id,
                Nom = c.Nom,
                Agrement = c.Agrement,
                DateAgrement = c.DateAgrement,
                Categorie = c.Categorie?.Libelle,
                CategorieId = c.CategorieId,
                Statut = c.Statut?.Libelle,
                StatutId = c.StatutId,
                DateStatut = c.DateStatut,
                Reseau = c.Reseau?.Nom,
                ReseauId = c.ReseauId,
                DateRalliement = c.DateRalliement,
                AdresseCCT = c.AdresseCCT,
                Latitude = c.Latitude,
                Longitude = c.Longitude,
                AdresseSiege = c.AdresseSiege,
                AdresseDomiciliation = c.AdresseDomiciliation,
                Ville = c.Ville?.Nom,
                VilleId = c.VilleId,
                Tel = c.Tel,
                Fax = c.Fax,
                Mail = c.Mail,
                Ice = c.Ice,
                IdFiscal = c.IdFiscal,
                CadreAutorisation = c.CadreAutorisation?.Libelle,
                CadreAutorisationId = c.CadreAutorisationId,
                EngagementSpecifique = c.EngagementSpecifique,
                IsPersonneMorale = c.IsPersonneMorale,
                Type = c.Type?.Libelle,
                TypeId = c.TypeId,
                QuotaVL = c.QuotaVL,
                QuotaPL = c.QuotaPL,
                Province = c.Province?.Libelle,
                ProvinceId = c.ProvinceId,
                Region = c.Region?.Libelle,
                RegionId = c.RegionId
            }).ToList();

            return Ok(cctDtos);
        }

        // GET: api/CCTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CCT>> GetCCT(int id)
        {
            var cct = await _context.CCTs
                .Include(c => c.Region)
                .Include(c => c.Province)
                .Include(c => c.Ville)
                .Include(c => c.Reseau)
                .Include(c => c.Statut)
                .Include(c => c.Categorie)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .Include(c => c.Agents)
                .Include(c => c.ChefsCentres)
                .Include(c => c.Lignes)
                .Include(c => c.Formations)
                .Include(c => c.Equipements)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cct == null)
                return NotFound();

            return cct;
        }

        // POST: api/CCTs
        [HttpPost]
        public async Task<ActionResult<CCT>> CreateCCT([FromBody] CCTUpdateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cct = new CCT
            {
                Nom = createDto.Nom,
                Agrement = createDto.Agrement,
                DateAgrement = createDto.DateAgrement,
                CategorieId = createDto.CategorieId,
                StatutId = createDto.StatutId,
                DateStatut = createDto.DateStatut,
                ReseauId = createDto.ReseauId,
                DateRalliement = createDto.DateRalliement,
                AdresseCCT = createDto.AdresseCCT,
                Latitude = createDto.Latitude,
                Longitude = createDto.Longitude,
                AdresseSiege = createDto.AdresseSiege,
                AdresseDomiciliation = createDto.AdresseDomiciliation,
                VilleId = createDto.VilleId,
                Tel = createDto.Tel,
                Fax = createDto.Fax,
                Mail = createDto.Mail,
                Ice = createDto.Ice,
                IdFiscal = createDto.IdFiscal,
                CadreAutorisationId = createDto.CadreAutorisationId,
                EngagementSpecifique = createDto.EngagementSpecifique,
                IsPersonneMorale = createDto.IsPersonneMorale,
                TypeId = createDto.TypeId,
                QuotaVL = createDto.QuotaVL,
                QuotaPL = createDto.QuotaPL,
                ProvinceId = createDto.ProvinceId,
                RegionId = createDto.RegionId,
                ThumbprintCertificat = createDto.ThumbprintCertificat
            };

            _context.CCTs.Add(cct);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCCT), new { id = cct.Id }, cct);
        }

        // PUT: api/CCTs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCCT(int id, [FromBody] CCTUpdateDto updateDto)
        {
            if (id != updateDto.Id)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingCCT = await _context.CCTs.FindAsync(id);
            if (existingCCT == null)
                return NotFound();

            // Mettre à jour les propriétés
            existingCCT.Nom = updateDto.Nom;
            existingCCT.Agrement = updateDto.Agrement;
            existingCCT.DateAgrement = updateDto.DateAgrement;
            existingCCT.CategorieId = updateDto.CategorieId;
            existingCCT.StatutId = updateDto.StatutId;
            existingCCT.DateStatut = updateDto.DateStatut;
            existingCCT.ReseauId = updateDto.ReseauId;
            existingCCT.DateRalliement = updateDto.DateRalliement;
            existingCCT.AdresseCCT = updateDto.AdresseCCT;
            existingCCT.Latitude = updateDto.Latitude;
            existingCCT.Longitude = updateDto.Longitude;
            existingCCT.AdresseSiege = updateDto.AdresseSiege;
            existingCCT.AdresseDomiciliation = updateDto.AdresseDomiciliation;
            existingCCT.VilleId = updateDto.VilleId;
            existingCCT.Tel = updateDto.Tel;
            existingCCT.Fax = updateDto.Fax;
            existingCCT.Mail = updateDto.Mail;
            existingCCT.Ice = updateDto.Ice;
            existingCCT.IdFiscal = updateDto.IdFiscal;
            existingCCT.CadreAutorisationId = updateDto.CadreAutorisationId;
            existingCCT.EngagementSpecifique = updateDto.EngagementSpecifique;
            existingCCT.IsPersonneMorale = updateDto.IsPersonneMorale;
            existingCCT.TypeId = updateDto.TypeId;
            existingCCT.QuotaVL = updateDto.QuotaVL;
            existingCCT.QuotaPL = updateDto.QuotaPL;
            existingCCT.ProvinceId = updateDto.ProvinceId;
            existingCCT.RegionId = updateDto.RegionId;
            existingCCT.ThumbprintCertificat = updateDto.ThumbprintCertificat;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CCTExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/CCTs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCCT(int id)
        {
            var cct = await _context.CCTs.FindAsync(id);
            if (cct == null)
                return NotFound();

            _context.CCTs.Remove(cct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/CCTs/5/agents
        [HttpGet("{id}/agents")]
        public async Task<ActionResult<IEnumerable<Agent>>> GetCCTAgents(int id)
        {
            var agents = await _context.Agents
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .Where(a => a.CCTId == id)
                .ToListAsync();

            return Ok(agents);
        }

        // GET: api/CCTs/5/chefs-centres
        [HttpGet("{id}/chefs-centres")]
        public async Task<ActionResult<IEnumerable<ChefCentre>>> GetCCTChefsCentres(int id)
        {
            var chefsCentres = await _context.ChefCentres
                .Include(cc => cc.NiveauFormationInitial)
                .Where(cc => cc.CCTId == id)
                .ToListAsync();

            return Ok(chefsCentres);
        }

        // GET: api/CCTs/5/lignes
        [HttpGet("{id}/lignes")]
        public async Task<ActionResult<IEnumerable<Ligne>>> GetCCTLignes(int id)
        {
            var lignes = await _context.Lignes
                .Include(l => l.Categorie)
                .Include(l => l.Statut)
                .Include(l => l.Decision)
                .Where(l => l.CCTId == id)
                .ToListAsync();

            return Ok(lignes);
        }

        // GET: api/CCTs/5/equipements
        [HttpGet("{id}/equipements")]
        public async Task<ActionResult<IEnumerable<Equipement>>> GetCCTEquipements(int id)
        {
            var equipements = await _context.Equipements
                .Include(e => e.TypeEquipement)
                .Include(e => e.Ligne)
                .Where(e => e.Ligne.CCTId == id)
                .ToListAsync();

            return Ok(equipements);
        }

        private bool CCTExists(int id)
        {
            return _context.CCTs.Any(e => e.Id == id);
        }
    }
} 