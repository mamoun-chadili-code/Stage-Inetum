using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class LigneSearchDto
    {
        public int? RegionId { get; set; }
        public int? VilleId { get; set; }
        public int? ReseauId { get; set; }
        public int? CCTId { get; set; }
        public string? AnneeDemarrage { get; set; }
        public int? CategorieId { get; set; }
        public int? StatutId { get; set; }
        
        [Range(1, int.MaxValue, ErrorMessage = "Le numéro de page doit être supérieur à 0")]
        public int Page { get; set; } = 1;
        
        [Range(1, 100, ErrorMessage = "La taille de page doit être entre 1 et 100")]
        public int PageSize { get; set; } = 10;
        
        [StringLength(100, ErrorMessage = "Le terme de recherche ne peut pas dépasser 100 caractères")]
        public string? SearchTerm { get; set; }
    }
}
