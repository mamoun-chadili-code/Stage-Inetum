using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class CreateChefCentreDto
    {
        [Required]
        [StringLength(100)]
        public string Nom { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Prenom { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string CIN { get; set; } = string.Empty;

        public int? CCTId { get; set; }

        public DateTime? DateAffectationCCT { get; set; }

        [StringLength(100)]
        public string? ReferenceApprobationCNEH { get; set; }

        public int? AnneeAutorisation { get; set; }

        public DateTime? DateApprobationCNEH { get; set; }

        [StringLength(20)]
        public string? Tel { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Mail { get; set; }

        [StringLength(20)]
        public string? CNSS { get; set; }

        public bool? Sexe { get; set; }

        public DateTime? DateNaissance { get; set; }

        public int? NiveauFormationInitialId { get; set; }
    }
}

