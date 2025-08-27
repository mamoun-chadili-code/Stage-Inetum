namespace CT_CNEH_API.DTOs
{
    public class AgentDto
    {
        public int Id { get; set; }
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string Mail { get; set; } = string.Empty;
        public string CNSS { get; set; } = string.Empty;
        public int? CCTId { get; set; }
        public string CCTNom { get; set; } = string.Empty;
        public string NumeroCAP { get; set; } = string.Empty;
        public DateTime? DateCAP { get; set; }
        public DateTime? DateExpirationCAP { get; set; }
        public int? CategorieCAPId { get; set; }
        public string CategorieCAPNom { get; set; } = string.Empty;
        public int StatutAdministratifId { get; set; }
        public string StatutAdministratifNom { get; set; } = string.Empty;
        public int AnneeAutorisation { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public string NumDecisionRenouv { get; set; } = string.Empty;
        public DateTime? DateDecisionRenouv { get; set; }
        public string Adresse { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime DateCreation { get; set; }
    }

    public class CreateAgentDto
    {
        public string Nom { get; set; } = string.Empty;
        public string Prenom { get; set; } = string.Empty;
        public string CIN { get; set; } = string.Empty;
        public string Tel { get; set; } = string.Empty;
        public string Mail { get; set; } = string.Empty;
        public string CNSS { get; set; } = string.Empty;
        public int? CCTId { get; set; }
        public string NumeroCAP { get; set; } = string.Empty;
        public DateTime? DateCAP { get; set; }
        public DateTime? DateExpirationCAP { get; set; }
        public int? CategorieCAPId { get; set; }
        public int StatutAdministratifId { get; set; }
        public int AnneeAutorisation { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public string NumDecisionRenouv { get; set; } = string.Empty;
        public DateTime? DateDecisionRenouv { get; set; }
        public string Adresse { get; set; } = string.Empty;
    }

    public class UpdateAgentDto
    {
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? CIN { get; set; }
        public string? Tel { get; set; }
        public string? Mail { get; set; }
        public string? CNSS { get; set; }
        public int? CCTId { get; set; }
        public string? NumeroCAP { get; set; }
        public DateTime? DateCAP { get; set; }
        public DateTime? DateExpirationCAP { get; set; }
        public int? CategorieCAPId { get; set; }
        public int? StatutAdministratifId { get; set; }
        public int? AnneeAutorisation { get; set; }
        public DateTime? DateAffectationCCT { get; set; }
        public string? NumDecisionRenouv { get; set; }
        public DateTime? DateDecisionRenouv { get; set; }
        public string? Adresse { get; set; }
    }
}






