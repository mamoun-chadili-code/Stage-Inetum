using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Descision
    {
        public int Id { get; set; }
        
        public int TypeId { get; set; }
        
        public int TypeEntiteId { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [StringLength(255)]
        public string? LienDocument { get; set; }
        
        public int? CCTId { get; set; }
        
        public int? AgentId { get; set; }
        
        public int? ChefCentreId { get; set; }
        
        public int? ReseauId { get; set; }
        
        public int? LigneId { get; set; }
        
        public string? Observation { get; set; }
        
        // Navigation properties
        public virtual TypeDecision Type { get; set; } = null!;
        public virtual TypeEntite TypeEntite { get; set; } = null!;
        public virtual CCT? CCT { get; set; }
        public virtual Agent? Agent { get; set; }
        public virtual ChefCentre? ChefCentre { get; set; }
        public virtual Reseau? Reseau { get; set; }
        public virtual Ligne? Ligne { get; set; }
    }
} 