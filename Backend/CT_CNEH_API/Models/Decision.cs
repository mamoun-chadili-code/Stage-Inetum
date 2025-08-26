using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    public class Decision
    {
        public int Id { get; set; }

        [Required]
        public int TypeDecisionId { get; set; }

        [Required]
        public int EntiteTypeId { get; set; }

        [Required]
        public int EntiteId { get; set; }

        [Required]
        public DateTime DateReference { get; set; }

        public DateTime? DateDebut { get; set; }

        public DateTime? DateFin { get; set; }

        [StringLength(500)]
        public string? LienDocumentUrl { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Montant { get; set; }

        [StringLength(1000)]
        public string? Observation { get; set; }

        // Relations optionnelles pour contexte supplémentaire
        public int? ReseauId { get; set; }
        [ForeignKey("ReseauId")]
        public virtual Reseau? Reseau { get; set; }

        public int? CCTId { get; set; }
        [ForeignKey("CCTId")]
        public virtual CCT? CCT { get; set; }

        public int? ChefCentreId { get; set; }
        [ForeignKey("ChefCentreId")]
        public virtual Agent? ChefCentre { get; set; }

        public int? LigneId { get; set; }
        [ForeignKey("LigneId")]
        public virtual Ligne? Ligne { get; set; }

        public int? AgentId { get; set; }
        [ForeignKey("AgentId")]
        public virtual Agent? Agent { get; set; }

        // Propriétés d'audit
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }

        // Propriétés de navigation calculées pour l'affichage
        [NotMapped]
        public string? EntiteNom { get; set; }

        [NotMapped]
        public string? ReseauNom => Reseau?.Nom;

        [NotMapped]
        public string? CCTNom => CCT?.Nom;
    }
}
