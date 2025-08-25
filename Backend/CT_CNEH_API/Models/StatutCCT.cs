using System.ComponentModel.DataAnnotations;

namespace CT_CNEH_API.Models
{
    public class StatutCCT
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Libelle { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Code { get; set; } = string.Empty;
    }
}





