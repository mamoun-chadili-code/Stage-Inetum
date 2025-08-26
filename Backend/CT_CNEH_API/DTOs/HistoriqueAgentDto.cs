using System;

namespace CT_CNEH_API.DTOs
{
    public class HistoriqueAgentDto
    {
        public int Id { get; set; }
        public int AgentId { get; set; }
        public string AgentNom { get; set; }
        public int CCTId { get; set; }
        public string CCTNom { get; set; }
        public DateTime DateDebutAffectation { get; set; }
        public DateTime? DateFinAffectation { get; set; }
        public DateTime DateMiseAJour { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateCreation { get; set; }
    }
}
