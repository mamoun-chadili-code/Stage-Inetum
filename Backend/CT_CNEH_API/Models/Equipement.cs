using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Equipement
    {
        public int Id { get; set; }
        
        public int TypeId { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Marque { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Modele { get; set; } = string.Empty;
        
        public DateTime? DateEtalonnage { get; set; }
        
        public DateTime? DateExpirationEtalonnage { get; set; }
        
        [Required]
        public string SocieteEtalonnage { get; set; } = string.Empty;
        
        public string? AdresseSocieteEtalonnage { get; set; }
        
        public string? TelSocieteEtalonnage { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Protocole { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string? ReferenceHomologation { get; set; }
        
        public DateTime? DateHomologation { get; set; }
        
        public int? LigneId { get; set; }
        
        public DateTime? DateMiseService { get; set; }
        
        [Required]
        [StringLength(355)]
        public string IdEquipement { get; set; } = string.Empty;
        
        public int? CCTCreationId { get; set; }
        
        // Navigation properties
        public virtual TypeEquipement Type { get; set; } = null!;
        public virtual Ligne? Ligne { get; set; }
        public virtual CCT? CCTCreation { get; set; }
    }
} 