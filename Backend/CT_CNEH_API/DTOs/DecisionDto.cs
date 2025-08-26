namespace CT_CNEH_API.DTOs
{
    public class DecisionDto
    {
        public int Id { get; set; }
        public int TypeDecisionId { get; set; }
        public string? TypeDecisionLibelle { get; set; }
        public int EntiteTypeId { get; set; }
        public string? EntiteTypeLibelle { get; set; }
        public int EntiteId { get; set; }
        public string? EntiteNom { get; set; }
        public DateTime DateReference { get; set; }
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public string? LienDocumentUrl { get; set; }
        public decimal? Montant { get; set; }
        public string? Observation { get; set; }

        // Informations de contexte optionnelles
        public int? ReseauId { get; set; }
        public string? ReseauNom { get; set; }
        public int? CCTId { get; set; }
        public string? CCTNom { get; set; }
        public int? ChefCentreId { get; set; }
        public string? ChefCentreNom { get; set; }
        public int? LigneId { get; set; }
        public string? LigneNumero { get; set; }
        public int? AgentId { get; set; }
        public string? AgentNom { get; set; }

        // Propriétés d'audit
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}



