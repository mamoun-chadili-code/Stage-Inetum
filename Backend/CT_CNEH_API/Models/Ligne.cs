using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    public class Ligne
    {
        public int Id { get; set; }
        
        [Required]
        public int NumeroLigne { get; set; }
        
        [Required]
        public int CategorieId { get; set; }
        
        [Required]
        public int CCTId { get; set; }
        
        [Required]
        public int StatutId { get; set; }
        
        [Required]
        public DateTime DateStatut { get; set; }
        
        public int? DecisionId { get; set; }
        
        public DateTime? DateDecision { get; set; }
        
        public int? AnneeDemarrage { get; set; }
        
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;
        
        public DateTime? DateModification { get; set; }
        
        // Navigation properties
        [ForeignKey("CategorieId")]
        public virtual Categorie Categorie { get; set; } = null!;
        
        [ForeignKey("CCTId")]
        public virtual CCT CCT { get; set; } = null!;
        
        [ForeignKey("StatutId")]
        public virtual Statut Statut { get; set; } = null!;
        
        [ForeignKey("DecisionId")]
        public virtual Decision? Decision { get; set; }
    }
} 