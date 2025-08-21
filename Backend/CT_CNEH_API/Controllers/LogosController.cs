using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using System.IO;

namespace CT_CNEH_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public LogosController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Logos/reseau/{reseauId}
        [HttpGet("reseau/{reseauId}")]
        public async Task<ActionResult<IEnumerable<Logo>>> GetLogosByReseau(int reseauId)
        {
            var logos = await _context.Logos
                .Where(l => l.ReseauId == reseauId && l.IsActive)
                .OrderByDescending(l => l.DateUpload)
                .ToListAsync();

            return Ok(logos);
        }

        // POST: api/Logos/upload
        [HttpPost("upload")]
        public async Task<ActionResult<Logo>> UploadLogo(IFormFile file, [FromForm] int reseauId)
        {
            // Log de débogage
            Console.WriteLine($"[DEBUG] UploadLogo appelé avec reseauId: {reseauId}, file: {file?.FileName}");
            
            if (file == null || file.Length == 0)
                return BadRequest("Aucun fichier fourni");

            // Vérifier le type de fichier
            var allowedTypes = new[] { "image/jpeg", "image/png", "image/gif" };
            if (!allowedTypes.Contains(file.ContentType.ToLower()))
                return BadRequest("Type de fichier non autorisé. Utilisez JPEG, PNG ou GIF");

            // Vérifier la taille (max 5MB)
            if (file.Length > 5 * 1024 * 1024)
                return BadRequest("Fichier trop volumineux. Taille maximale : 5MB");

            // Vérifier que le réseau existe
            Console.WriteLine($"[DEBUG] Recherche du réseau avec ID: {reseauId}");
            var reseau = await _context.Reseaux.FindAsync(reseauId);
            if (reseau == null)
            {
                Console.WriteLine($"[DEBUG] Réseau non trouvé pour ID: {reseauId}");
                return NotFound("Réseau non trouvé");
            }
            Console.WriteLine($"[DEBUG] Réseau trouvé: {reseau.Nom}");

            try
            {
                // Créer le dossier de stockage s'il n'existe pas
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "logos");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                // Générer un nom de fichier unique
                var fileName = $"{Guid.NewGuid()}_{Path.GetExtension(file.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                // Sauvegarder le fichier
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Créer l'enregistrement en base
                var logo = new Logo
                {
                    ReseauId = reseauId,
                    NomFichier = fileName,
                    TypeMime = file.ContentType,
                    TailleFichier = file.Length,
                    CheminStockage = filePath,
                    AltText = $"Logo du réseau {reseau.Nom}",
                    DateUpload = DateTime.UtcNow,
                    IsActive = true
                };

                _context.Logos.Add(logo);
                await _context.SaveChangesAsync();

                // Mettre à jour l'URL du logo dans le réseau
                reseau.LogoUrl = $"/uploads/logos/{fileName}";
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetLogosByReseau), new { reseauId }, logo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de l'upload : {ex.Message}");
            }
        }

        // DELETE: api/Logos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogo(int id)
        {
            var logo = await _context.Logos.FindAsync(id);
            if (logo == null)
                return NotFound();

            try
            {
                // Supprimer le fichier physique
                if (System.IO.File.Exists(logo.CheminStockage))
                {
                    System.IO.File.Delete(logo.CheminStockage);
                }

                // Supprimer l'enregistrement en base
                _context.Logos.Remove(logo);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la suppression : {ex.Message}");
            }
        }

        // GET: api/Logos/{id}/download
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadLogo(int id)
        {
            var logo = await _context.Logos.FindAsync(id);
            if (logo == null)
                return NotFound();

            if (!System.IO.File.Exists(logo.CheminStockage))
                return NotFound("Fichier non trouvé");

            var fileBytes = await System.IO.File.ReadAllBytesAsync(logo.CheminStockage);
            return File(fileBytes, logo.TypeMime, logo.NomFichier);
        }
    }
}
