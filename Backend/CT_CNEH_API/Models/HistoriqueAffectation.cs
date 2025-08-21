using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class HistoriqueAffectation
    {
        public int Id { get; set; }
        
        [Required]
        public int EntiteId { get; set; }
        
        [Required]
        public string TypeEntite { get; set; } = string.Empty; // "Agent" ou "ChefCentre"
        
        [Required]
        public int CCTId { get; set; }
        
        [Required]
        public DateTime DateAffectation { get; set; }
        
        public DateTime? DateFinAffectation { get; set; }
        
        [StringLength(500)]
        public string? MotifAffectation { get; set; }
        
        [StringLength(500)]
        public string? MotifFinAffectation { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual CCT CCT { get; set; } = null!;
    }
}
