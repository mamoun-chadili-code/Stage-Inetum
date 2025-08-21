using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class Reseau
    {
        public int Id { get; set; }
        
        [Required]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        public string Agrement { get; set; } = string.Empty;
        
        [Required]
        public DateTime DateAgrement { get; set; }
        
        // FK et navigation pour Statut
        public int StatutId { get; set; }
        public virtual StatutCCT? Statut { get; set; }

        [Required]
        public DateTime DateStatut { get; set; }

        [Required]
        public string AdresseSiege { get; set; } = string.Empty;

        public string? AdresseDomiciliation { get; set; }

        // FK et navigation pour Ville
        public int VilleId { get; set; }
        public virtual Ville? Ville { get; set; }

        [Required]
        public string Tel { get; set; } = string.Empty;

        [Required]
        public string Fax { get; set; } = string.Empty;

        [Required]
        public string Mail { get; set; } = string.Empty;

        public string? LogoUrl { get; set; }

        public string? Ice { get; set; }
        public string? IdFiscal { get; set; }
        public string? RegisterCommerce { get; set; }

        // FK et navigation pour CadreAutorisation
        public int CadreAutorisationId { get; set; }
        public virtual CadreAutorisation? CadreAutorisation { get; set; }

        [Required]
        public string NomRepresentantLegal { get; set; } = string.Empty;

        [Required]
        public string AdressRepresentantLegal { get; set; } = string.Empty;

        [Required]
        public string TelRepresentantLegal { get; set; } = string.Empty;

        public string? MailRepresentant { get; set; }

        public string? ThumbprintCertificat { get; set; }

        // Navigation properties
        public virtual ICollection<CCT> CCTs { get; set; } = new List<CCT>();
        public virtual ICollection<Logo> Logos { get; set; } = new List<Logo>();

    }
} 