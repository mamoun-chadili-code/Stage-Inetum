using System;

namespace CT_CNEH_API.DTOs
{
    public class HistoriqueAffectationDto
    {
        public int Id { get; set; }
        public int EntiteId { get; set; }
        public string TypeEntite { get; set; }
        public int CCTId { get; set; }
        public string CCTNom { get; set; }
        public DateTime DateAffectation { get; set; }
        public DateTime? DateFinAffectation { get; set; }
        public string? MotifAffectation { get; set; }
        public string? MotifFinAffectation { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreation { get; set; }
        public int? AgentId { get; set; }
        public string AgentNom { get; set; }
        public int? ChefCentreId { get; set; }
        public string ChefCentreNom { get; set; }

    }
}
