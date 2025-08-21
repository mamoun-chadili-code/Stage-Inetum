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
            int pageSize = 10, 
            string? marque = null, 
            string? modele = null, 
            int? ligne = null, 
            int? type = null);
        
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
            int pageSize = 10, 
            string? marque = null, 
            string? modele = null, 
            int? ligne = null, 
            int? type = null)
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

            // Compter le total
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

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
                LigneCode = e.Ligne?.Categorie?.Nom,
                
                // Informations du type d'équipement
                TypeEquipementLibelle = e.TypeEquipement?.Libelle,
                TypeEquipementDescription = e.TypeEquipement?.Code,
                
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
                LigneCode = equipement.Ligne?.Categorie?.Nom,
                
                // Informations du type d'équipement
                TypeEquipementLibelle = equipement.TypeEquipement?.Libelle,
                TypeEquipementDescription = equipement.TypeEquipement?.Code,
                
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
