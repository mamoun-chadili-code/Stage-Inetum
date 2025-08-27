using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class HistoriqueChefCentre
    {
        public int Id { get; set; }
        
        public int ChefCentreId { get; set; }
        public ChefCentre ChefCentre { get; set; } = null!;
        
        public int CCTId { get; set; }
        public CCT CCT { get; set; } = null!;
        
        public DateTime DateDebutAffectation { get; set; }
        public DateTime? DateFinAffectation { get; set; }
        public DateTime DateMiseAJour { get; set; }
        
        public DateTime DateCreation { get; set; } = DateTime.Now;
        public bool IsActive { get; set; } = true;
    }
}

