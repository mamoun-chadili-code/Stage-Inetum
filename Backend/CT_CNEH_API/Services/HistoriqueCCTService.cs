using CT_CNEH_API.Data;
using CT_CNEH_API.DTOs;
using CT_CNEH_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CT_CNEH_API.Services
{
    public interface IHistoriqueCCTService
    {
        Task<IEnumerable<HistoriqueCCTDto>> GetAllAsync();
        Task<HistoriqueCCTDto> GetByIdAsync(int id);
        Task<IEnumerable<HistoriqueCCTDto>> GetByCCTIdAsync(int cctId);
        Task<HistoriqueCCTDto> CreateAsync(HistoriqueCCTDto historiqueDto);
        Task<HistoriqueCCTDto> UpdateAsync(int id, HistoriqueCCTDto historiqueDto);
        Task<bool> DeleteAsync(int id);
    }

    public class HistoriqueCCTService : IHistoriqueCCTService
    {
        private readonly ApplicationDbContext _context;

        public HistoriqueCCTService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoriqueCCTDto>> GetAllAsync()
        {
            var historiques = await _context.HistoriqueCCTs
                .Include(h => h.CCT)
                .Include(h => h.Reseau)
                .OrderByDescending(h => h.DateDebut)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueCCTDto
            {
                Id = h.Id,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                ReseauId = h.ReseauId,
                ReseauNom = h.Reseau?.Nom,
                DateDebut = h.DateDebut,
                DateFin = h.DateFin
            });
        }

        public async Task<HistoriqueCCTDto> GetByIdAsync(int id)
        {
            var historique = await _context.HistoriqueCCTs
                .Include(h => h.CCT)
                .Include(h => h.Reseau)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (historique == null) return null;

            return new HistoriqueCCTDto
            {
                Id = historique.Id,
                CCTId = historique.CCTId,
                CCTNom = historique.CCT?.Nom,
                ReseauId = historique.ReseauId,
                ReseauNom = historique.Reseau?.Nom,
                DateDebut = historique.DateDebut,
                DateFin = historique.DateFin
            };
        }

        public async Task<IEnumerable<HistoriqueCCTDto>> GetByCCTIdAsync(int cctId)
        {
            var historiques = await _context.HistoriqueCCTs
                .Include(h => h.CCT)
                .Include(h => h.Reseau)
                .Where(h => h.CCTId == cctId)
                .OrderByDescending(h => h.DateDebut)
                .ToListAsync();

            return historiques.Select(h => new HistoriqueCCTDto
            {
                Id = h.Id,
                CCTId = h.CCTId,
                CCTNom = h.CCT?.Nom,
                ReseauId = h.ReseauId,
                ReseauNom = h.Reseau?.Nom,
                DateDebut = h.DateDebut,
                DateFin = h.DateFin
            });
        }

        public async Task<HistoriqueCCTDto> CreateAsync(HistoriqueCCTDto historiqueDto)
        {
            var historique = new HistoriqueCCT
            {
                CCTId = historiqueDto.CCTId,
                ReseauId = historiqueDto.ReseauId,
                DateDebut = historiqueDto.DateDebut,
                DateFin = historiqueDto.DateFin
            };

            _context.HistoriqueCCTs.Add(historique);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(historique.Id);
        }

        public async Task<HistoriqueCCTDto> UpdateAsync(int id, HistoriqueCCTDto historiqueDto)
        {
            var historique = await _context.HistoriqueCCTs.FindAsync(id);
            if (historique == null) return null;

            historique.CCTId = historiqueDto.CCTId;
            historique.ReseauId = historiqueDto.ReseauId;
            historique.DateDebut = historiqueDto.DateDebut;
            historique.DateFin = historiqueDto.DateFin;

            await _context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var historique = await _context.HistoriqueCCTs.FindAsync(id);
            if (historique == null) return false;

            _context.HistoriqueCCTs.Remove(historique);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
