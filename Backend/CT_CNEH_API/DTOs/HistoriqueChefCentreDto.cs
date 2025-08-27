namespace CT_CNEH_API.DTOs
{
    public class HistoriqueChefCentreDto
    {
        public int Id { get; set; }
        public int ChefCentreId { get; set; }
        public string ChefCentreNom { get; set; } = string.Empty;
        public int CCTId { get; set; }
        public string CCTNom { get; set; } = string.Empty;
        public DateTime DateDebutAffectation { get; set; }
        public DateTime? DateFinAffectation { get; set; }
        public DateTime DateMiseAJour { get; set; }
        public DateTime DateCreation { get; set; }
    }
}

