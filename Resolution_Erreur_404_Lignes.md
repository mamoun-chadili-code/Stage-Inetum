# 🚨 RÉSOLUTION ERREUR 404 - ENDPOINT LIGNES

## 📋 DIAGNOSTIC DE L'ERREUR

### **❌ ERREUR ACTUELLE :**
```
Failed to load resource: the server responded with a status of 404 (Not Found)
Endpoint: PUT /api/Lignes/6
Message: "Ligne avec l'ID 6 non trouvée"
```

### **🔍 CAUSE IDENTIFIÉE :**
- **L'endpoint backend** `/api/Lignes/{id}` n'est pas configuré
- **Le contrôleur** `LignesController` n'existe pas
- **La route** n'est pas mappée dans l'application

---

## 🛠️ SOLUTION BACKEND - CONFIGURATION COMPLÈTE

### **1. CRÉER LE MODÈLE LIGNE**

```csharp
// Models/Ligne.cs
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Models
{
    public class Ligne
    {
        public int Id { get; set; }
        
        [Required]
        [Display(Name = "Numéro de ligne")]
        public int NumeroLigne { get; set; }
        
        [Required]
        [Display(Name = "Catégorie")]
        public int CategorieId { get; set; }
        
        [Required]
        [Display(Name = "CCT")]
        public int CctId { get; set; }
        
        [Required]
        [Display(Name = "Statut")]
        public int StatutId { get; set; }
        
        [Required]
        [Display(Name = "Date de statut")]
        public DateTime DateStatut { get; set; }
        
        [Display(Name = "Année de démarrage")]
        public string? AnneeDemarrage { get; set; }
        
        // Navigation properties
        public virtual CategorieLigne Categorie { get; set; }
        public virtual CCT CCT { get; set; }
        public virtual Statut Statut { get; set; }
    }
}
```

### **2. CRÉER LE MODÈLE CATEGORIELIGNE**

```csharp
// Models/CategorieLigne.cs
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.Models
{
    public class CategorieLigne
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; }
        
        [Required]
        [StringLength(50)]
        [Display(Name = "Code")]
        public string Code { get; set; }
        
        [StringLength(500)]
        [Display(Name = "Description")]
        public string? Description { get; set; }
        
        [Display(Name = "Date de création")]
        public DateTime DateCreation { get; set; } = DateTime.Now;
        
        [Display(Name = "Date de modification")]
        public DateTime DateModification { get; set; } = DateTime.Now;
        
        [Display(Name = "Actif")]
        public bool EstActif { get; set; } = true;
    }
}
```

### **3. CONFIGURER LE DBCONTEXT**

```csharp
// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using YourNamespace.Models;

namespace YourNamespace.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<Ligne> Lignes { get; set; }
        public DbSet<CategorieLigne> CategorieLignes { get; set; }
        public DbSet<CCT> CCTs { get; set; }
        public DbSet<Statut> Statuts { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration Ligne
            modelBuilder.Entity<Ligne>(entity =>
            {
                entity.ToTable("Lignes");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NumeroLigne).IsRequired();
                entity.Property(e => e.CategorieId).IsRequired();
                entity.Property(e => e.CctId).IsRequired();
                entity.Property(e => e.StatutId).IsRequired();
                entity.Property(e => e.DateStatut).IsRequired();
                entity.Property(e => e.AnneeDemarrage).HasMaxLength(10);
                
                // Relations
                entity.HasOne(e => e.Categorie)
                    .WithMany()
                    .HasForeignKey(e => e.CategorieId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.CCT)
                    .WithMany()
                    .HasForeignKey(e => e.CctId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Statut)
                    .WithMany()
                    .HasForeignKey(e => e.StatutId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            
            // Configuration CategorieLigne
            modelBuilder.Entity<CategorieLigne>(entity =>
            {
                entity.ToTable("CategorieLignes");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Libelle).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.DateCreation).HasDefaultValueSql("GETDATE()");
                entity.Property(e => e.DateModification).HasDefaultValueSql("GETDATE()");
                entity.Property(e => e.EstActif).HasDefaultValue(true);
            });
        }
    }
}
```

### **4. CRÉER LE CONTROLLER LIGNES**

```csharp
// Controllers/LignesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YourNamespace.Data;
using YourNamespace.Models;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public LignesController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        // GET: api/Lignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ligne>>> GetLignes()
        {
            try
            {
                var lignes = await _context.Lignes
                    .Include(l => l.Categorie)
                    .Include(l => l.CCT)
                    .Include(l => l.Statut)
                    .OrderBy(l => l.NumeroLigne)
                    .ToListAsync();
                    
                return Ok(lignes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // GET: api/Lignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ligne>> GetLigne(int id)
        {
            try
            {
                var ligne = await _context.Lignes
                    .Include(l => l.Categorie)
                    .Include(l => l.CCT)
                    .Include(l => l.Statut)
                    .FirstOrDefaultAsync(l => l.Id == id);
                
                if (ligne == null)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
                }
                
                return ligne;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // POST: api/Lignes
        [HttpPost]
        public async Task<ActionResult<Ligne>> CreateLigne(Ligne ligne)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                // Vérifier si le numéro de ligne existe déjà pour ce CCT
                var ligneExists = await _context.Lignes
                    .AnyAsync(l => l.NumeroLigne == ligne.NumeroLigne && l.CctId == ligne.CctId);
                    
                if (ligneExists)
                {
                    return BadRequest($"Une ligne avec le numéro {ligne.NumeroLigne} existe déjà pour ce CCT");
                }
                
                _context.Lignes.Add(ligne);
                await _context.SaveChangesAsync();
                
                return CreatedAtAction(nameof(GetLigne), new { id = ligne.Id }, ligne);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // PUT: api/Lignes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLigne(int id, Ligne ligne)
        {
            try
            {
                if (id != ligne.Id)
                {
                    return BadRequest("L'ID dans l'URL ne correspond pas à l'ID dans le corps de la requête");
                }
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var existingLigne = await _context.Lignes.FindAsync(id);
                if (existingLigne == null)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
                }
                
                // Vérifier si le numéro de ligne existe déjà pour ce CCT (exclure la ligne actuelle)
                var ligneExists = await _context.Lignes
                    .AnyAsync(l => l.NumeroLigne == ligne.NumeroLigne && 
                                   l.CctId == ligne.CctId && 
                                   l.Id != id);
                                   
                if (ligneExists)
                {
                    return BadRequest($"Une ligne avec le numéro {ligne.NumeroLigne} existe déjà pour ce CCT");
                }
                
                // Mettre à jour les propriétés
                existingLigne.NumeroLigne = ligne.NumeroLigne;
                existingLigne.CategorieId = ligne.CategorieId;
                existingLigne.CctId = ligne.CctId;
                existingLigne.StatutId = ligne.StatutId;
                existingLigne.DateStatut = ligne.DateStatut;
                existingLigne.AnneeDemarrage = ligne.AnneeDemarrage;
                
                await _context.SaveChangesAsync();
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // DELETE: api/Lignes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigne(int id)
        {
            try
            {
                var ligne = await _context.Lignes.FindAsync(id);
                if (ligne == null)
                {
                    return NotFound($"Ligne avec l'ID {id} non trouvée");
                }
                
                _context.Lignes.Remove(ligne);
                await _context.SaveChangesAsync();
                
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // POST: api/Lignes/search
        [HttpPost("search")]
        public async Task<ActionResult<SearchResult<Ligne>>> SearchLignes(SearchParams searchParams)
        {
            try
            {
                var query = _context.Lignes
                    .Include(l => l.Categorie)
                    .Include(l => l.CCT)
                    .Include(l => l.Statut)
                    .AsQueryable();
                
                // Appliquer les filtres
                if (!string.IsNullOrEmpty(searchParams.searchTerm))
                {
                    var searchTerm = searchParams.searchTerm.ToLower();
                    query = query.Where(l => 
                        l.NumeroLigne.ToString().Contains(searchTerm) ||
                        l.Categorie.Libelle.ToLower().Contains(searchTerm) ||
                        l.CCT.Nom.ToLower().Contains(searchTerm) ||
                        l.Statut.Libelle.ToLower().Contains(searchTerm)
                    );
                }
                
                if (searchParams.categorieId.HasValue)
                {
                    query = query.Where(l => l.CategorieId == searchParams.categorieId.Value);
                }
                
                if (searchParams.cctId.HasValue)
                {
                    query = query.Where(l => l.CctId == searchParams.cctId.Value);
                }
                
                if (searchParams.statutId.HasValue)
                {
                    query = query.Where(l => l.StatutId == searchParams.statutId.Value);
                }
                
                // Compter le total
                var totalCount = await query.CountAsync();
                
                // Pagination
                var page = searchParams.page ?? 1;
                var pageSize = searchParams.pageSize ?? 10;
                var skip = (page - 1) * pageSize;
                
                var lignes = await query
                    .OrderBy(l => l.NumeroLigne)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();
                
                var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
                
                var result = new SearchResult<Ligne>
                {
                    Data = lignes,
                    TotalCount = totalCount,
                    Page = page,
                    PageSize = pageSize,
                    TotalPages = totalPages
                };
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
```

### **5. CRÉER LE CONTROLLER CATEGORIELIGNES**

```csharp
// Controllers/CategorieLignesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YourNamespace.Data;
using YourNamespace.Models;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategorieLignesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public CategorieLignesController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        // GET: api/CategorieLignes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategorieLigne>>> GetCategorieLignes()
        {
            try
            {
                var categories = await _context.CategorieLignes
                    .Where(c => c.EstActif)
                    .OrderBy(c => c.Libelle)
                    .ToListAsync();
                    
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
        
        // GET: api/CategorieLignes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategorieLigne>> GetCategorieLigne(int id)
        {
            try
            {
                var categorie = await _context.CategorieLignes.FindAsync(id);
                
                if (categorie == null)
                {
                    return NotFound($"Catégorie avec l'ID {id} non trouvée");
                }
                
                return categorie;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur interne du serveur: {ex.Message}");
            }
        }
    }
}
```

### **6. MODÈLES DE DONNÉES SUPPLÉMENTAIRES**

```csharp
// Models/SearchParams.cs
namespace YourNamespace.Models
{
    public class SearchParams
    {
        public int? page { get; set; }
        public int? pageSize { get; set; }
        public string? searchTerm { get; set; }
        public int? categorieId { get; set; }
        public int? cctId { get; set; }
        public int? statutId { get; set; }
        public int? regionId { get; set; }
        public int? villeId { get; set; }
        public int? reseauId { get; set; }
        public string? anneeDemarrage { get; set; }
    }
}

// Models/SearchResult.cs
namespace YourNamespace.Models
{
    public class SearchResult<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }
}
```

---

## 🗄️ SCRIPT SQL POUR LA TABLE CATEGORIELIGNES

```sql
-- CategorieLignes_Setup.sql
USE CT_CNEH_DB;
GO

-- Créer la table si elle n'existe pas
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CategorieLignes')
BEGIN
    CREATE TABLE CategorieLignes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 DEFAULT GETDATE(),
        EstActif BIT DEFAULT 1
    );
    
    PRINT '✅ Table CategorieLignes créée avec succès !';
END

-- Insérer les catégories
IF NOT EXISTS (SELECT 1 FROM CategorieLignes)
BEGIN
    INSERT INTO CategorieLignes (Libelle, Code, Description)
    VALUES
        ('Véhicules légers (VL)', 'VL', 'voitures particulières, utilitaires ≤ 3,5T'),
        ('Poids lourds (PL)', 'PL', 'camions, bus, véhicules > 3,5T'),
        ('Motocycles', 'MOTO', 'motos et cyclomoteurs'),
        ('Véhicules toute catégorie', 'VTC', 'ligne polyvalente');
    
    PRINT '✅ Catégories insérées avec succès !';
END
```

---

## 🧪 TESTS DE VÉRIFICATION

### **1. TEST BACKEND :**
```bash
# Démarrer l'application
dotnet run

# Tester les endpoints
curl -X GET "https://localhost:7001/api/CategorieLignes"
curl -X GET "https://localhost:7001/api/Lignes"
curl -X GET "https://localhost:7001/api/Lignes/6"
```

### **2. TEST FRONTEND :**
- **Module Lignes** se charge sans erreur
- **Dropdown Catégorie** affiche les données
- **Points colorés** visibles partout
- **Pas d'erreur 404** lors des mises à jour

---

## ✅ RÉSULTAT ATTENDU

**Après configuration :**
- ✅ **Endpoint** `/api/Lignes/{id}` fonctionnel
- ✅ **Endpoint** `/api/CategorieLignes` fonctionnel
- ✅ **CRUD complet** des lignes
- ✅ **Recherche et pagination** des lignes
- ✅ **Points colorés** avec descriptions
- ✅ **Aucune erreur 404**

---

## 🚀 PROCHAINES ÉTAPES

1. **Créer les modèles** C# dans le backend
2. **Configurer le DbContext** avec Entity Framework
3. **Créer les contrôleurs** Lignes et CategorieLignes
4. **Exécuter le script SQL** pour créer la table
5. **Tester les endpoints** backend
6. **Tester le module Lignes** frontend

**Cette configuration résoudra l'erreur 404 et permettra au module Lignes de fonctionner parfaitement !** 🎉


