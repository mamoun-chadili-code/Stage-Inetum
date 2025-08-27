using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class CCT
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        [StringLength(50)]
        public string Agrement { get; set; } = string.Empty;
        
        [Required]
        public DateTime DateAgrement { get; set; }
        
        public int CategorieId { get; set; }
        
        public int StatutId { get; set; }
        
        [Required]
        public DateTime DateStatut { get; set; }
        
        public int ReseauId { get; set; }
        
        [Required]
        public DateTime DateRalliement { get; set; }
        
        [Required]
        public string AdresseCCT { get; set; } = string.Empty;
        
        [Required]
        public string Latitude { get; set; } = string.Empty;
        
        [Required]
        public string Longitude { get; set; } = string.Empty;
        
        public string? AdresseSiege { get; set; }
        
        public string? AdresseDomiciliation { get; set; }
        
        public int VilleId { get; set; }
        
        [Required]
        public string Tel { get; set; } = string.Empty;
        
        public string? Fax { get; set; }
        
        public string? Mail { get; set; }
        
        public string? Ice { get; set; }
        
        public string? IdFiscal { get; set; }
        
        public int CadreAutorisationId { get; set; }
        
        public string? EngagementSpecifique { get; set; }
        
        [Required]
        public bool IsPersonneMorale { get; set; }
        
        public int TypeId { get; set; }
        
        public int? QuotaVL { get; set; }
        
        public int? QuotaPL { get; set; }
        
        public int? ProvinceId { get; set; }
        
        public int? RegionId { get; set; }
        
        public string? ThumbprintCertificat { get; set; }
        

        
        // Navigation properties
        public virtual CategorieCCT Categorie { get; set; } = null!;
        public virtual StatutCCT Statut { get; set; } = null!;
        public virtual Reseau Reseau { get; set; } = null!;
        public virtual Ville Ville { get; set; } = null!;
        public virtual CadreAutorisation CadreAutorisation { get; set; } = null!;
        public virtual TypeCTT Type { get; set; } = null!;
        public virtual Province? Province { get; set; }
        public virtual Region? Region { get; set; }
        
        public virtual ICollection<Agent> Agents { get; set; } = new List<Agent>();
        public virtual ICollection<ChefCentre> ChefsCentres { get; set; } = new List<ChefCentre>();
        public virtual ICollection<Ligne> Lignes { get; set; } = new List<Ligne>();
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
        public virtual ICollection<Equipement> Equipements { get; set; } = new List<Equipement>();

    }
} 