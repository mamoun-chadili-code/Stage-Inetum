using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Formation
    {
        public int Id { get; set; }
        
        [Required]
        public string Intitule { get; set; } = string.Empty;
        
        public int? CCTId { get; set; }
        
        public int? AgentId { get; set; }
        
        public int? ChefCentreId { get; set; }
        
        public int TypeFormationId { get; set; }
        
        public string? Matiere { get; set; }
        
        public DateTime? DateDebut { get; set; }
        
        public DateTime? DateFin { get; set; }
        
        public bool ValideParFormateur { get; set; }
        
        public string? PremierAnimateur { get; set; }
        
        public string? DeuxiemeAnimateur { get; set; }
        
        public bool ValideCHEH { get; set; }
        
        public DateTime? ValideLe { get; set; }
        
        // Navigation properties
        public virtual Agent? Agent { get; set; }
        public virtual ChefCentre? ChefCentre { get; set; }
        public virtual TypeFormation TypeFormation { get; set; } = null!;
        public virtual CCT? CCT { get; set; }
    }
} 