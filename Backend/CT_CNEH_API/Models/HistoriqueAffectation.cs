using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    [Table("HistoriqueAffectations")]
    public class HistoriqueAffectation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EntiteId { get; set; }

        [Required]
        [StringLength(50)]
        public string TypeEntite { get; set; } // "Agent" ou "ChefCentre"

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

        public int? AgentId { get; set; }

        public int? ChefCentreId { get; set; }

        // Navigation properties
        [ForeignKey("CCTId")]
        public virtual CCT CCT { get; set; }

        [ForeignKey("AgentId")]
        public virtual Agent Agent { get; set; }

        [ForeignKey("ChefCentreId")]
        public virtual ChefCentre ChefCentre { get; set; }
    }
}
