using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    public class Equipement
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Marque { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string Modele { get; set; } = string.Empty;
        
        [Required]
        public int LigneId { get; set; }
        
        [Required]
        public int TypeEquipementId { get; set; }
        
        [StringLength(200)]
        public string? Protocole { get; set; }
        
        [StringLength(200)]
        public string? RefHomologation { get; set; }
        
        public DateTime? DateHomologation { get; set; }
        
        public DateTime? DateMiseService { get; set; }
        
        public DateTime? DateEtalonnage { get; set; }
        
        public DateTime? DateExpirationEtalonnage { get; set; }
        
        // Propriétés d'audit
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        [ForeignKey("LigneId")]
        public virtual Ligne Ligne { get; set; } = null!;
        
        [ForeignKey("TypeEquipementId")]
        public virtual TypeEquipement TypeEquipement { get; set; } = null!;
    }
} 