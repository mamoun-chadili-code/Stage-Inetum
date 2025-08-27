using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.DTOs
{
    public class DecisionCreateDto
    {
        [Required]
        [StringLength(100, ErrorMessage = "Le nom ne peut pas dépasser 100 caractères")]
        public string Nom { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "La description ne peut pas dépasser 500 caractères")]
        public string? Description { get; set; }

        [Required]
        public int TypeDecisionId { get; set; }
    }
}










