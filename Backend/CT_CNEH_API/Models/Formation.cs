using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    public class Formation
    {
        public int Id { get; set; }
        
        [Required]
        public int TypeFormationId { get; set; }
        
        public int? CCTId { get; set; }
        
        public int? AgentId { get; set; }
        
        public int? ChefCentreId { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Intitule { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Matiere { get; set; }
        
        public DateTime? DateDebut { get; set; }
        
        public DateTime? DateFin { get; set; }
        
        [Required]
        public bool ValideParFormateur { get; set; }
        
        [StringLength(100)]
        public string? PremierAnimateur { get; set; }
        
        [StringLength(100)]
        public string? DeuxiemeAnimateur { get; set; }
        
        [Required]
        public bool ValideCHEH { get; set; }
        
        public DateTime? DateValidation { get; set; }
        
        // Propriétés d'audit
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        [ForeignKey("TypeFormationId")]
        public virtual TypeFormation TypeFormation { get; set; } = null!;
        
        [ForeignKey("AgentId")]
        public virtual Agent? Agent { get; set; }
        
        [ForeignKey("ChefCentreId")]
        public virtual ChefCentre? ChefCentre { get; set; }
        
        [ForeignKey("CCTId")]
        public virtual CCT? CCT { get; set; }
    }
} 