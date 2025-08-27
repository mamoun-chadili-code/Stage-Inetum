namespace CT_CNEH_API.DTOs
{
    public class ChefCentreDto
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string Mail { get; set; } = string.Empty;
        public string CNSS { get; set; } = string.Empty;
        public bool Sexe { get; set; }
        public DateTime? DateNaissance { get; set; }
        public int NiveauFormationInitialId { get; set; }
        public string NiveauFormationInitialNom { get; set; } = string.Empty;
        public int CCTId { get; set; }
        public string CCTNom { get; set; } = string.Empty;
        public DateTime? DateAffectationCCT { get; set; }
        public int AnneeAutorisation { get; set; }
        public string ReferenceApprobationCNEH { get; set; } = string.Empty;
        public DateTime? DateApprobationCNEH { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreation { get; set; }
    }

    public class CreateChefCentreDto
    {
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string Mail { get; set; } = string.Empty;
        public string CNSS { get; set; } = string.Empty;
        public bool Sexe { get; set; }
        public DateTime? DateNaissance { get; set; }
        public int NiveauFormationInitialId { get; set; }
        public int CCTId { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public int AnneeAutorisation { get; set; }
        public string ReferenceApprobationCNEH { get; set; } = string.Empty;
        public DateTime? DateApprobationCNEH { get; set; }
    }

    public class UpdateChefCentreDto
    {
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? CIN { get; set; }
        public string? Tel { get; set; }
        public string? Mail { get; set; }
        public string? CNSS { get; set; }
        public bool? Sexe { get; set; }
        public DateTime? DateNaissance { get; set; }
        public int? NiveauFormationInitialId { get; set; }
        public int? CCTId { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public int? AnneeAutorisation { get; set; }
        public string? ReferenceApprobationCNEH { get; set; }
        public DateTime? DateApprobationCNEH { get; set; }
    }
}






