using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    [Table("Lignes")]
    public class Ligne
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }
        
        [Required]
        [Column("NumeroLigne")]
        public int NumeroLigne { get; set; }
        
        [Required]
        [Column("CategorieId")]
        public int CategorieId { get; set; }
        
        [Required]
        [Column("CCTId")]
        public int CCTId { get; set; }
        
        [Required]
        [Column("StatutId")]
        public int StatutId { get; set; }
        
        [Required]
        [Column("DateStatut")]
        public DateTime DateStatut { get; set; }
        
        [Column("DecisionId")]
        public int? DecisionId { get; set; }
        
        [Column("DateDecision")]
        public DateTime? DateDecision { get; set; }
        
        [Column("AnneeDemarrage")]
        public string? AnneeDemarrage { get; set; }
        
        [Column("DateCreation")]
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        
        [Column("DateModification")]
        public DateTime? DateModification { get; set; }
        
        // Propriétés de compatibilité avec valeurs par défaut fixes
        [Column("CategorieCCTId")]
        public int CategorieCCTId { get; set; } = 1; // Valeur fixe par défaut
        
        [Column("StatutLigneId")]
        public int StatutLigneId { get; set; } = 1; // Valeur fixe par défaut
        
        // AUCUNE propriété de navigation - modèle complètement vide
    }
} 