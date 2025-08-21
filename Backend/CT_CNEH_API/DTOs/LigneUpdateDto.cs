using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class LigneUpdateDto
    {
        [Required(ErrorMessage = "L'ID est obligatoire")]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Le numéro de ligne est obligatoire")]
        [Range(1, 999, ErrorMessage = "Le numéro de ligne doit être entre 1 et 999")]
        public int NumeroLigne { get; set; }
        
        [Required(ErrorMessage = "La catégorie est obligatoire")]
        public int CategorieId { get; set; }
        
        [Required(ErrorMessage = "Le CCT est obligatoire")]
        public int CCTId { get; set; }
        
        [Required(ErrorMessage = "Le statut est obligatoire")]
        public int StatutId { get; set; }
        
        [Required(ErrorMessage = "La date de statut est obligatoire")]
        public DateTime DateStatut { get; set; }
        
        public int? DecisionId { get; set; }
        
        public DateTime? DateDecision { get; set; }
        
        [Range(1900, 2100, ErrorMessage = "L'année de démarrage doit être entre 1900 et 2100")]
        public int? AnneeDemarrage { get; set; }
    }
}
