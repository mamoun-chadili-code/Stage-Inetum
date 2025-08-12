using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Ligne
    {
        public int Id { get; set; }
        
        public int CCTId { get; set; }
        
        [Required]
        public int NumLigne { get; set; }
        
        public int TypeLigneId { get; set; }
        
        public int StatutId { get; set; }
        
        [Required]
        public DateTime DateStatut { get; set; }
        
        [Required]
        public string Decision { get; set; } = string.Empty;
        
        [Required]
        public DateTime DecisionDate { get; set; }
        
        // Navigation properties
        public virtual CCT CCT { get; set; } = null!;
        public virtual CategorieLigne TypeLigne { get; set; } = null!;
        public virtual StatutLigne Statut { get; set; } = null!;
        public virtual ICollection<Equipement> Equipements { get; set; } = new List<Equipement>();
        public virtual ICollection<Descision> Decisions { get; set; } = new List<Descision>();
    }
} 