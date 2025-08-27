using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public class CCTService
    {
        private readonly ApplicationDbContext _context;

        public CCTService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CCTDto>> GetAllAsync()
        {
            return await _context.CCTs
                .Include(c => c.Reseau)
                .Include(c => c.Region)
                .Include(c => c.Ville)
                .Include(c => c.Categorie)
                .Include(c => c.Statut)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .Select(c => new CCTDto
                {
                    Id = c.Id,
                    Nom = c.Nom,
                    Agrement = c.Agrement,
                    DateAgrement = c.DateAgrement,
                    ReseauId = c.ReseauId,
                    ReseauNom = c.Reseau.Nom,
                    RegionId = c.RegionId ?? 0,
                    RegionNom = c.Region != null ? c.Region.Libelle : string.Empty,
                    VilleId = c.VilleId,
                    VilleNom = c.Ville != null ? c.Ville.Nom : string.Empty,
                    CategorieId = c.CategorieId,
                    CategorieNom = c.Categorie != null ? c.Categorie.Libelle : string.Empty,
                    StatutId = c.StatutId,
                    StatutNom = c.Statut != null ? c.Statut.Libelle : string.Empty,
                    TypeId = c.TypeId,
                    TypeNom = c.Type != null ? c.Type.Libelle : string.Empty,
                    CadreAutorisationId = c.CadreAutorisationId,
                    CadreAutorisationNom = c.CadreAutorisation != null ? c.CadreAutorisation.Libelle : string.Empty,
                    DateRalliement = c.DateRalliement,
                    DateStatut = c.DateStatut,
                    IsActive = true, // Valeur par défaut
                    DateCreation = DateTime.Now // Valeur par défaut
                })
                .OrderBy(c => c.Nom)
                .ToListAsync();
        }

        public async Task<CCTDto?> GetByIdAsync(int id)
        {
            var cct = await _context.CCTs
                .Include(c => c.Reseau)
                .Include(c => c.Region)
                .Include(c => c.Ville)
                .Include(c => c.Categorie)
                .Include(c => c.Statut)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cct == null) return null;

            return new CCTDto
            {
                Id = cct.Id,
                Nom = cct.Nom,
                Agrement = cct.Agrement,
                DateAgrement = cct.DateAgrement,
                ReseauId = cct.ReseauId,
                ReseauNom = cct.Reseau.Nom,
                RegionId = cct.RegionId ?? 0,
                RegionNom = cct.Region != null ? cct.Region.Libelle : string.Empty,
                VilleId = cct.VilleId,
                VilleNom = cct.Ville != null ? cct.Ville.Nom : string.Empty,
                CategorieId = cct.CategorieId,
                CategorieNom = cct.Categorie != null ? cct.Categorie.Libelle : string.Empty,
                StatutId = cct.StatutId,
                StatutNom = cct.Statut != null ? cct.Statut.Libelle : string.Empty,
                TypeId = cct.TypeId,
                TypeNom = cct.Type != null ? cct.Type.Libelle : string.Empty,
                CadreAutorisationId = cct.CadreAutorisationId,
                CadreAutorisationNom = cct.CadreAutorisation != null ? cct.CadreAutorisation.Libelle : string.Empty,
                DateRalliement = cct.DateRalliement,
                DateStatut = cct.DateStatut,
                IsActive = true, // Valeur par défaut
                DateCreation = DateTime.Now // Valeur par défaut
            };
        }

        public async Task<CCTDto> CreateAsync(CreateCCTDto dto)
        {
            var cct = new CCT
            {
                Nom = dto.Nom,
                Agrement = dto.Agrement,
                DateAgrement = dto.DateAgrement,
                ReseauId = dto.ReseauId,
                VilleId = dto.VilleId,
                CategorieId = dto.CategorieId,
                StatutId = dto.StatutId,
                TypeId = dto.TypeId,
                CadreAutorisationId = dto.CadreAutorisationId,
                DateRalliement = dto.DateRalliement ?? DateTime.Now,
                DateStatut = dto.DateStatut ?? DateTime.Now
            };

            _context.CCTs.Add(cct);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(cct.Id) ?? throw new InvalidOperationException("Erreur lors de la création");
        }

        public async Task<CCTDto?> UpdateAsync(int id, UpdateCCTDto dto)
        {
            var cct = await _context.CCTs
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cct == null) return null;

            // Mettre à jour les propriétés
            if (dto.Nom != null) cct.Nom = dto.Nom;
            if (dto.Agrement != null) cct.Agrement = dto.Agrement;
            if (dto.DateAgrement.HasValue) cct.DateAgrement = dto.DateAgrement.Value;
            if (dto.ReseauId.HasValue) cct.ReseauId = dto.ReseauId.Value;
            if (dto.VilleId.HasValue) cct.VilleId = dto.VilleId.Value;
            if (dto.CategorieId.HasValue) cct.CategorieId = dto.CategorieId.Value;
            if (dto.StatutId.HasValue) cct.StatutId = dto.StatutId.Value;
            if (dto.TypeId.HasValue) cct.TypeId = dto.TypeId.Value;
            if (dto.CadreAutorisationId.HasValue) cct.CadreAutorisationId = dto.CadreAutorisationId.Value;
            if (dto.DateRalliement.HasValue) cct.DateRalliement = dto.DateRalliement.Value;
            if (dto.DateStatut.HasValue) cct.DateStatut = dto.DateStatut.Value;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cct = await _context.CCTs
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cct == null) return false;

            _context.CCTs.Remove(cct);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CCTDto>> GetByReseauAsync(int reseauId)
        {
            return await _context.CCTs
                .Include(c => c.Reseau)
                .Include(c => c.Ville)
                .Include(c => c.Categorie)
                .Include(c => c.Statut)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .Where(c => c.ReseauId == reseauId)
                .Select(c => new CCTDto
                {
                    Id = c.Id,
                    Nom = c.Nom,
                    Agrement = c.Agrement,
                    DateAgrement = c.DateAgrement,
                    ReseauId = c.ReseauId,
                    ReseauNom = c.Reseau.Nom,
                    RegionId = 0,
                    RegionNom = string.Empty,
                    VilleId = c.VilleId,
                    VilleNom = c.Ville != null ? c.Ville.Nom : string.Empty,
                    CategorieId = c.CategorieId,
                    CategorieNom = c.Categorie != null ? c.Categorie.Libelle : string.Empty,
                    StatutId = c.StatutId,
                    StatutNom = c.Statut != null ? c.Statut.Libelle : string.Empty,
                    TypeId = c.TypeId,
                    TypeNom = c.Type != null ? c.Type.Libelle : string.Empty,
                    CadreAutorisationId = c.CadreAutorisationId,
                    CadreAutorisationNom = c.CadreAutorisation != null ? c.CadreAutorisation.Libelle : string.Empty,
                    DateRalliement = c.DateRalliement,
                    DateStatut = c.DateStatut,
                    IsActive = true, // Valeur par défaut
                    DateCreation = DateTime.Now // Valeur par défaut
                })
                .OrderBy(c => c.Nom)
                .ToListAsync();
        }

        public async Task<IEnumerable<CCTDto>> GetByRegionAsync(int regionId)
        {
            return await _context.CCTs
                .Include(c => c.Reseau)
                .Include(c => c.Region)
                .Include(c => c.Ville)
                .Include(c => c.Categorie)
                .Include(c => c.Statut)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .Where(c => c.RegionId == regionId)
                .Select(c => new CCTDto
                {
                    Id = c.Id,
                    Nom = c.Nom,
                    Agrement = c.Agrement,
                    DateAgrement = c.DateAgrement,
                    ReseauId = c.ReseauId,
                    ReseauNom = c.Reseau.Nom,
                    RegionId = c.RegionId ?? 0,
                    RegionNom = c.Region != null ? c.Region.Libelle : string.Empty,
                    VilleId = c.VilleId,
                    VilleNom = c.Ville != null ? c.Ville.Nom : string.Empty,
                    CategorieId = c.CategorieId,
                    CategorieNom = c.Categorie != null ? c.Categorie.Libelle : string.Empty,
                    StatutId = c.StatutId,
                    StatutNom = c.Statut != null ? c.Statut.Libelle : string.Empty,
                    TypeId = c.TypeId,
                    TypeNom = c.Type != null ? c.Type.Libelle : string.Empty,
                    CadreAutorisationId = c.CadreAutorisationId,
                    CadreAutorisationNom = c.CadreAutorisation != null ? c.CadreAutorisation.Libelle : string.Empty,
                    DateRalliement = c.DateRalliement,
                    DateStatut = c.DateStatut,
                    IsActive = true, // Valeur par défaut
                    DateCreation = DateTime.Now // Valeur par défaut
                })
                .OrderBy(c => c.Nom)
                .ToListAsync();
        }

        public async Task<IEnumerable<CCTDto>> GetByVilleAsync(int villeId)
        {
            return await _context.CCTs
                .Include(c => c.Reseau)
                .Include(c => c.Region)
                .Include(c => c.Ville)
                .Include(c => c.Categorie)
                .Include(c => c.Statut)
                .Include(c => c.Type)
                .Include(c => c.CadreAutorisation)
                .Where(c => c.VilleId == villeId)
                .Select(c => new CCTDto
                {
                    Id = c.Id,
                    Nom = c.Nom,
                    Agrement = c.Agrement,
                    DateAgrement = c.DateAgrement,
                    ReseauId = c.ReseauId,
                    ReseauNom = c.Reseau.Nom,
                    RegionId = c.RegionId ?? 0,
                    RegionNom = c.Region != null ? c.Region.Libelle : string.Empty,
                    VilleId = c.VilleId,
                    VilleNom = c.Ville != null ? c.Ville.Nom : string.Empty,
                    CategorieId = c.CategorieId,
                    CategorieNom = c.Categorie != null ? c.Categorie.Libelle : string.Empty,
                    StatutId = c.StatutId,
                    StatutNom = c.Statut != null ? c.Statut.Libelle : string.Empty,
                    TypeId = c.TypeId,
                    TypeNom = c.Type != null ? c.Type.Libelle : string.Empty,
                    CadreAutorisationId = c.CadreAutorisationId,
                    CadreAutorisationNom = c.CadreAutorisation != null ? c.CadreAutorisation.Libelle : string.Empty,
                    DateRalliement = c.DateRalliement,
                    DateStatut = c.DateStatut,
                    IsActive = true, // Valeur par défaut
                    DateCreation = DateTime.Now // Valeur par défaut
                })
                .OrderBy(c => c.Nom)
                .ToListAsync();
        }
    }
}
