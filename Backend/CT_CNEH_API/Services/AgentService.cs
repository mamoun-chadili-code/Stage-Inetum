using Microsoft.EntityFrameworkCore;
using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using CT_CNEH_API.DTOs;

namespace CT_CNEH_API.Services
{
    public class AgentService
    {
        private readonly ApplicationDbContext _context;

        public AgentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AgentDto>> GetAllAsync()
        {
            return await _context.Agents
                .Include(a => a.CCT)
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .Select(a => new AgentDto
                {
                    Id = a.Id,
                    Nom = a.Nom,
                    Prenom = a.Prenom,
                    CIN = a.CIN,
                    Tel = a.Tel,
                    Mail = a.Mail,
                    CNSS = a.CNSS,
                    CCTId = a.CCTId,
                    CCTNom = a.CCT != null ? a.CCT.Nom : string.Empty,
                    NumeroCAP = a.NumeroCAP,
                    DateCAP = a.DateCAP,
                    DateExpirationCAP = a.DateExpirationCAP,
                    CategorieCAPId = a.CategorieCAPId,
                    CategorieCAPNom = a.CategorieCAP != null ? a.CategorieCAP.Libelle : string.Empty,
                    StatutAdministratifId = a.StatutAdministratifId,
                    StatutAdministratifNom = a.StatutAdministratif != null ? a.StatutAdministratif.Libelle : string.Empty,
                    AnneeAutorisation = a.AnneeAutorisation,
                    DateAffectationCCT = a.DateAffectationCCT,
                    NumDecisionRenouv = a.NumDecisionRenouv,
                    DateDecisionRenouv = a.DateDecisionRenouv,
                    Adresse = a.Adresse
                })
                .OrderBy(a => a.Nom)
                .ThenBy(a => a.Prenom)
                .ToListAsync();
        }

        public async Task<AgentDto?> GetByIdAsync(int id)
        {
            var agent = await _context.Agents
                .Include(a => a.CCT)
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (agent == null) return null;

            return new AgentDto
            {
                Id = agent.Id,
                Nom = agent.Nom,
                Prenom = agent.Prenom,
                CIN = agent.CIN,
                Tel = agent.Tel,
                Mail = agent.Mail,
                CNSS = agent.CNSS,
                CCTId = agent.CCTId,
                CCTNom = agent.CCT != null ? agent.CCT.Nom : string.Empty,
                NumeroCAP = agent.NumeroCAP,
                DateCAP = agent.DateCAP,
                DateExpirationCAP = agent.DateExpirationCAP,
                CategorieCAPId = agent.CategorieCAPId,
                CategorieCAPNom = agent.CategorieCAP != null ? agent.CategorieCAP.Libelle : string.Empty,
                StatutAdministratifId = agent.StatutAdministratifId,
                StatutAdministratifNom = agent.StatutAdministratif != null ? agent.StatutAdministratif.Libelle : string.Empty,
                AnneeAutorisation = agent.AnneeAutorisation,
                DateAffectationCCT = agent.DateAffectationCCT,
                NumDecisionRenouv = agent.NumDecisionRenouv,
                DateDecisionRenouv = agent.DateDecisionRenouv,
                Adresse = agent.Adresse
            };
        }

        public async Task<AgentDto> CreateAsync(CreateAgentDto dto)
        {
            var agent = new Agent
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                CIN = dto.CIN,
                Tel = dto.Tel,
                Mail = dto.Mail,
                CNSS = dto.CNSS,
                CCTId = dto.CCTId,
                NumeroCAP = dto.NumeroCAP,
                DateCAP = dto.DateCAP,
                DateExpirationCAP = dto.DateExpirationCAP,
                CategorieCAPId = dto.CategorieCAPId,
                StatutAdministratifId = dto.StatutAdministratifId,
                AnneeAutorisation = dto.AnneeAutorisation,
                DateAffectationCCT = dto.DateAffectationCCT,
                NumDecisionRenouv = dto.NumDecisionRenouv,
                DateDecisionRenouv = dto.DateDecisionRenouv,
                Adresse = dto.Adresse
            };

            _context.Agents.Add(agent);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(agent.Id) ?? throw new InvalidOperationException("Erreur lors de la création");
        }

        public async Task<AgentDto?> UpdateAsync(int id, UpdateAgentDto dto)
        {
            var agent = await _context.Agents
                .FirstOrDefaultAsync(a => a.Id == id);

            if (agent == null) return null;

            // Mettre à jour les propriétés
            if (dto.Nom != null) agent.Nom = dto.Nom;
            if (dto.Prenom != null) agent.Prenom = dto.Prenom;
            if (dto.CIN != null) agent.CIN = dto.CIN;
            if (dto.Tel != null) agent.Tel = dto.Tel;
            if (dto.Mail != null) agent.Mail = dto.Mail;
            if (dto.CNSS != null) agent.CNSS = dto.CNSS;
            if (dto.CCTId.HasValue) agent.CCTId = dto.CCTId.Value;
            if (dto.NumeroCAP != null) agent.NumeroCAP = dto.NumeroCAP;
            if (dto.DateCAP.HasValue) agent.DateCAP = dto.DateCAP.Value;
            if (dto.DateExpirationCAP.HasValue) agent.DateExpirationCAP = dto.DateExpirationCAP.Value;
            if (dto.CategorieCAPId.HasValue) agent.CategorieCAPId = dto.CategorieCAPId.Value;
            if (dto.StatutAdministratifId.HasValue) agent.StatutAdministratifId = dto.StatutAdministratifId.Value;
            if (dto.AnneeAutorisation.HasValue) agent.AnneeAutorisation = dto.AnneeAutorisation.Value;
            if (dto.DateAffectationCCT.HasValue) agent.DateAffectationCCT = dto.DateAffectationCCT.Value;
            if (dto.NumDecisionRenouv != null) agent.NumDecisionRenouv = dto.NumDecisionRenouv;
            if (dto.DateDecisionRenouv.HasValue) agent.DateDecisionRenouv = dto.DateDecisionRenouv.Value;
            if (dto.Adresse != null) agent.Adresse = dto.Adresse;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var agent = await _context.Agents
                .FirstOrDefaultAsync(a => a.Id == id);

            if (agent == null) return false;

            _context.Agents.Remove(agent);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<AgentDto>> GetByCCTAsync(int cctId)
        {
            return await _context.Agents
                .Include(a => a.CCT)
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .Where(a => a.CCTId == cctId)
                .Select(a => new AgentDto
                {
                    Id = a.Id,
                    Nom = a.Nom,
                    Prenom = a.Prenom,
                    CIN = a.CIN,
                    Tel = a.Tel,
                    Mail = a.Mail,
                    CNSS = a.CNSS,
                    CCTId = a.CCTId,
                    CCTNom = a.CCT != null ? a.CCT.Nom : string.Empty,
                    NumeroCAP = a.NumeroCAP,
                    DateCAP = a.DateCAP,
                    DateExpirationCAP = a.DateExpirationCAP,
                    CategorieCAPId = a.CategorieCAPId,
                    CategorieCAPNom = a.CategorieCAP != null ? a.CategorieCAP.Libelle : string.Empty,
                    StatutAdministratifId = a.StatutAdministratifId,
                    StatutAdministratifNom = a.StatutAdministratif != null ? a.StatutAdministratif.Libelle : string.Empty,
                    AnneeAutorisation = a.AnneeAutorisation,
                    DateAffectationCCT = a.DateAffectationCCT,
                    NumDecisionRenouv = a.NumDecisionRenouv,
                    DateDecisionRenouv = a.DateDecisionRenouv,
                    Adresse = a.Adresse
                })
                .OrderBy(a => a.Nom)
                .ThenBy(a => a.Prenom)
                .ToListAsync();
        }

        public async Task<IEnumerable<AgentDto>> GetByStatutAsync(int statutId)
        {
            return await _context.Agents
                .Include(a => a.CCT)
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .Where(a => a.StatutAdministratifId == statutId)
                .Select(a => new AgentDto
                {
                    Id = a.Id,
                    Nom = a.Nom,
                    Prenom = a.Prenom,
                    CIN = a.CIN,
                    Tel = a.Tel,
                    Mail = a.Mail,
                    CNSS = a.CNSS,
                    CCTId = a.CCTId,
                    CCTNom = a.CCT != null ? a.CCT.Nom : string.Empty,
                    NumeroCAP = a.NumeroCAP,
                    DateCAP = a.DateCAP,
                    DateExpirationCAP = a.DateExpirationCAP,
                    CategorieCAPId = a.CategorieCAPId,
                    CategorieCAPNom = a.CategorieCAP != null ? a.CategorieCAP.Libelle : string.Empty,
                    StatutAdministratifId = a.StatutAdministratifId,
                    StatutAdministratifNom = a.StatutAdministratif != null ? a.StatutAdministratif.Libelle : string.Empty,
                    AnneeAutorisation = a.AnneeAutorisation,
                    DateAffectationCCT = a.DateAffectationCCT,
                    NumDecisionRenouv = a.NumDecisionRenouv,
                    DateDecisionRenouv = a.DateDecisionRenouv,
                    Adresse = a.Adresse
                })
                .OrderBy(a => a.Nom)
                .ThenBy(a => a.Prenom)
                .ToListAsync();
        }

        public async Task<IEnumerable<AgentDto>> GetByCategorieCAPAsync(int categorieId)
        {
            return await _context.Agents
                .Include(a => a.CCT)
                .Include(a => a.CategorieCAP)
                .Include(a => a.StatutAdministratif)
                .Where(a => a.CategorieCAPId == categorieId)
                .Select(a => new AgentDto
                {
                    Id = a.Id,
                    Nom = a.Nom,
                    Prenom = a.Prenom,
                    CIN = a.CIN,
                    Tel = a.Tel,
                    Mail = a.Mail,
                    CNSS = a.CNSS,
                    CCTId = a.CCTId,
                    CCTNom = a.CCT != null ? a.CCT.Nom : string.Empty,
                    NumeroCAP = a.NumeroCAP,
                    DateCAP = a.DateCAP,
                    DateExpirationCAP = a.DateExpirationCAP,
                    CategorieCAPId = a.CategorieCAPId,
                    CategorieCAPNom = a.CategorieCAP != null ? a.CategorieCAP.Libelle : string.Empty,
                    StatutAdministratifId = a.StatutAdministratifId,
                    StatutAdministratifNom = a.StatutAdministratif != null ? a.StatutAdministratif.Libelle : string.Empty,
                    AnneeAutorisation = a.AnneeAutorisation,
                    DateAffectationCCT = a.DateAffectationCCT,
                    NumDecisionRenouv = a.NumDecisionRenouv,
                    DateDecisionRenouv = a.DateDecisionRenouv,
                    Adresse = a.Adresse
                })
                .OrderBy(a => a.Nom)
                .ThenBy(a => a.Prenom)
                .ToListAsync();
        }
    }
}






