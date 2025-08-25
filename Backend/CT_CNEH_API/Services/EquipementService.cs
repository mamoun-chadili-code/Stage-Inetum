using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public interface IEquipementService
    {
        Task<(List<EquipementDto> Equipements, int TotalCount, int TotalPages)> GetEquipementsAsync(
            int page = 1, 
            int pageSize = 5, 
            string? marque = null, 
            string? modele = null, 
            int? ligne = null, 
            int? type = null,
            int? cct = null);
        
        Task<EquipementDto?> GetEquipementByIdAsync(int id);
    }

    public class EquipementService : IEquipementService
    {
        private readonly ApplicationDbContext _context;

        public EquipementService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(List<EquipementDto> Equipements, int TotalCount, int TotalPages)> GetEquipementsAsync(
            int page = 1, 
            int pageSize = 5, 
            string? marque = null, 
            string? modele = null, 
            int? ligne = null, 
            int? type = null,
            int? cct = null)
        {
            var query = _context.Equipements
                .Include(e => e.TypeEquipement)
                .Include(e => e.Ligne)
                .AsQueryable();

            // Appliquer les filtres
            if (!string.IsNullOrEmpty(marque))
                query = query.Where(e => e.Marque.Contains(marque));

            if (!string.IsNullOrEmpty(modele))
                query = query.Where(e => e.Modele.Contains(modele));

            if (ligne.HasValue)
                query = query.Where(e => e.LigneId == ligne.Value);

            if (type.HasValue)
                query = query.Where(e => e.TypeEquipementId == type.Value);

            // Filtre par CCT : utiliser une approche plus robuste
            if (cct.HasValue)
            {
                // Approche alternative : récupérer d'abord les lignes du CCT
                var lignesDuCCT = await _context.Lignes
                    .Where(l => l.CCTId == cct.Value)
                    .Select(l => l.Id)
                    .ToListAsync();
                
                if (lignesDuCCT.Any())
                {
                    query = query.Where(e => lignesDuCCT.Contains(e.LigneId))
                                .Distinct(); // Éviter les doublons si un équipement est sur plusieurs lignes
                    Console.WriteLine($"🔍 Filtrage par CCT {cct.Value} appliqué - {lignesDuCCT.Count} lignes trouvées");
                }
                else
                {
                    Console.WriteLine($"⚠️ Aucune ligne trouvée pour le CCT {cct.Value}");
                    // Retourner une liste vide si aucun CCT trouvé
                    return (new List<EquipementDto>(), 0, 0);
                }
            }

            // Compter le total
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            
            // Log pour déboguer
            Console.WriteLine($"🔍 Total équipements après filtrage: {totalCount}");
            Console.WriteLine($"🔍 Filtres appliqués - CCT: {cct}, Ligne: {ligne}, Type: {type}");

            // Appliquer la pagination
            var equipements = await query
                .OrderBy(e => e.Marque)
                .ThenBy(e => e.Modele)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Convertir en DTOs
            var equipementDtos = equipements.Select(e => new EquipementDto
            {
                Id = e.Id,
                Marque = e.Marque,
                Modele = e.Modele,
                LigneId = e.LigneId,
                TypeEquipementId = e.TypeEquipementId,
                Protocole = e.Protocole,
                RefHomologation = e.RefHomologation,
                DateHomologation = e.DateHomologation,
                DateMiseService = e.DateMiseService,
                DateEtalonnage = e.DateEtalonnage,
                DateExpirationEtalonnage = e.DateExpirationEtalonnage,
                
                // Informations de la ligne
                LigneNom = e.Ligne?.NumeroLigne.ToString(),
                LigneCode = _context.CategorieLignes
                    .Where(c => c.Id == e.Ligne.CategorieId)
                    .Select(c => c.Libelle)
                    .FirstOrDefault() ?? "N/A",
                
                // Informations du type d'équipement
                TypeEquipementLibelle = e.TypeEquipement?.Libelle,
                TypeEquipementDescription = e.TypeEquipement?.Description,
                
                // Informations du statut (pour l'instant null, à implémenter si nécessaire)
                StatutLibelle = null,
                StatutDescription = null,
                
                // Propriétés d'audit
                CreatedAt = e.CreatedAt,
                UpdatedAt = e.UpdatedAt
            }).ToList();

            return (equipementDtos, totalCount, totalPages);
        }

        public async Task<EquipementDto?> GetEquipementByIdAsync(int id)
        {
            var equipement = await _context.Equipements
                .Include(e => e.TypeEquipement)
                .Include(e => e.Ligne)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (equipement == null)
                return null;

            return new EquipementDto
            {
                Id = equipement.Id,
                Marque = equipement.Marque,
                Modele = equipement.Modele,
                LigneId = equipement.LigneId,
                TypeEquipementId = equipement.TypeEquipementId,
                Protocole = equipement.Protocole,
                RefHomologation = equipement.RefHomologation,
                DateHomologation = equipement.DateHomologation,
                DateMiseService = equipement.DateMiseService,
                DateEtalonnage = equipement.DateEtalonnage,
                DateExpirationEtalonnage = equipement.DateExpirationEtalonnage,
                
                // Informations de la ligne
                LigneNom = equipement.Ligne?.NumeroLigne.ToString(),
                LigneCode = _context.CategorieLignes
                    .Where(c => c.Id == equipement.Ligne.CategorieId)
                    .Select(c => c.Libelle)
                    .FirstOrDefault() ?? "N/A",
                
                // Informations du type d'équipement
                TypeEquipementLibelle = equipement.TypeEquipement?.Libelle,
                TypeEquipementDescription = equipement.TypeEquipement?.Description,
                
                // Informations du statut (pour l'instant null, à implémenter si nécessaire)
                StatutLibelle = null,
                StatutDescription = null,
                
                // Propriétés d'audit
                CreatedAt = equipement.CreatedAt,
                UpdatedAt = equipement.UpdatedAt
            };
        }
    }
}
