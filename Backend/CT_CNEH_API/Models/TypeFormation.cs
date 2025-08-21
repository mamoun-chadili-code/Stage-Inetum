using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CT_CNEH_API.Models
{
    [Table("TypesFormation")]
    public class TypesFormation
    {
        public int Id { get; set; }
        
        [Required]
        public string Libelle { get; set; } = string.Empty;
        
        // Navigation properties
        public virtual ICollection<Formation> Formations { get; set; } = new List<Formation>();
    }
} 