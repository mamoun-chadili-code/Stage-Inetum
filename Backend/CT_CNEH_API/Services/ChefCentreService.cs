using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CT_CNEH_API.Services
{
    public class ChefCentreService
    {
        private readonly ApplicationDbContext _context;

        public ChefCentreService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChefCentre?> GetChefCentreByIdAsync(int id)
        {
            return await _context.ChefCentres
                .Include(cc => cc.CCT)
                .FirstOrDefaultAsync(cc => cc.Id == id);
        }

        public async Task<IEnumerable<ChefCentre>> GetAllChefCentresAsync()
        {
            return await _context.ChefCentres
                .Include(cc => cc.CCT)
                .ToListAsync();
        }

        public async Task<ChefCentre> CreateChefCentreAsync(ChefCentre chefCentre)
        {
            _context.ChefCentres.Add(chefCentre);
            await _context.SaveChangesAsync();
            return chefCentre;
        }

        public async Task<bool> UpdateChefCentreAsync(int id, ChefCentreUpdateDto dto)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(id);
            
            if (chefCentre == null)
                return false;

            // Mettre à jour les propriétés avec les bonnes correspondances
            chefCentre.Nom = dto.Nom;
            chefCentre.Prenom = dto.Prenom;
            chefCentre.CIN = dto.CIN; // Corrigé : CIN au lieu de Cin
            chefCentre.Tel = dto.Tel;
            chefCentre.Mail = dto.Mail; // Corrigé : Mail au lieu de Email
            chefCentre.CNSS = dto.CNSS;
            chefCentre.Sexe = dto.Sexe; // Corrigé : Sexe au lieu de Genre
            chefCentre.DateNaissance = dto.DateNaissance;
            chefCentre.NiveauFormationInitialId = dto.NiveauFormationInitialId;
            chefCentre.DateAffectationCCT = dto.DateAffectationCCT;
            chefCentre.AnneeAutorisation = dto.AnneeAutorisation;
            chefCentre.ReferenceApprobationCNEH = dto.ReferenceApprobationCNEH;
            chefCentre.DateApprobationCNEH = dto.DateApprobationCNEH;
            
            // CctId peut être null pour la désassociation
            chefCentre.CCTId = dto.CCTId;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteChefCentreAsync(int id)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(id);
            
            if (chefCentre == null)
                return false;

            _context.ChefCentres.Remove(chefCentre);
            
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<ChefCentre>> GetChefCentresByCCTAsync(int cctId)
        {
            return await _context.ChefCentres
                .Where(cc => cc.CCTId == cctId)
                .ToListAsync();
        }

        public async Task<bool> DisassociateFromCCTAsync(int chefCentreId)
        {
            var chefCentre = await _context.ChefCentres.FindAsync(chefCentreId);
            
            if (chefCentre == null)
                return false;

            chefCentre.CCTId = null;
            
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}