using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    [Table("HistoriqueAgent")]
    public class HistoriqueAgent
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AgentId { get; set; }

        [Required]
        public int CCTId { get; set; }

        [Required]
        [Column("DateDebutAffectation")]
        public DateTime DateDebutAffectation { get; set; }

        [Column("DateFinAffectation")]
        public DateTime? DateFinAffectation { get; set; }

        [Required]
        [Column("DateMiseAJour")]
        public DateTime DateMiseAJour { get; set; } = DateTime.UtcNow;



        public bool IsActive { get; set; } = true;

        [Required]
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("AgentId")]
        public virtual Agent Agent { get; set; }

        [ForeignKey("CCTId")]
        public virtual CCT CCT { get; set; }
    }
}






