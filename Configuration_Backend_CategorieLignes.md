# 🚀 CONFIGURATION BACKEND POUR CATEGORIELIGNES

## 📋 PRÉREQUIS

### 1. **Base de données SQL Server**
- Base : `CT_CNEH_DB`
- Table : `CategorieLignes` (créée via le script SQL)

### 2. **Script SQL exécuté**
```sql
-- Exécutez le fichier CategorieLignes_Setup.sql dans SQL Server
-- Il créera automatiquement la table et les données
```

## 🔧 CONFIGURATION BACKEND (.NET)

### 1. **Modèle CategorieLigne**

```csharp
// Models/CategorieLigne.cs
public class CategorieLigne
{
    public int Id { get; set; }
    public string Libelle { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public DateTime DateCreation { get; set; }
    public DateTime DateModification { get; set; }
    public bool EstActif { get; set; }
}
```

### 2. **DbContext**

```csharp
// Data/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public DbSet<CategorieLigne> CategorieLignes { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CategorieLigne>(entity =>
        {
            entity.ToTable("CategorieLignes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Libelle).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Description).HasMaxLength(500);
        });
    }
}
```

### 3. **Controller**

```csharp
// Controllers/CategorieLignesController.cs
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
        var categorie = await _context.CategorieLignes.FindAsync(id);
        
        if (categorie == null)
        {
            return NotFound($"Catégorie avec l'ID {id} non trouvée");
        }
        
        return categorie;
    }
}
```

### 4. **Program.cs - Configuration**

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Ajouter les services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configuration CORS
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();
```

### 5. **appsettings.json**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CT_CNEH_DB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## 🧪 TEST DE L'ENDPOINT

### 1. **Démarrer l'application backend**
```bash
dotnet run
```

### 2. **Tester l'endpoint**
```bash
# Test GET /api/CategorieLignes
curl -X GET "https://localhost:7001/api/CategorieLignes"
```

### 3. **Réponse attendue**
```json
[
  {
    "id": 1,
    "libelle": "Véhicules légers (VL)",
    "code": "VL",
    "description": "voitures particulières, utilitaires ≤ 3,5T",
    "dateCreation": "2024-01-01T00:00:00",
    "dateModification": "2024-01-01T00:00:00",
    "estActif": true
  },
  {
    "id": 2,
    "libelle": "Poids lourds (PL)",
    "code": "PL",
    "description": "camions, bus, véhicules > 3,5T",
    "dateCreation": "2024-01-01T00:00:00",
    "dateModification": "2024-01-01T00:00:00",
    "estActif": true
  }
]
```

## 🎯 FRONTEND - POINTS COLORÉS

### 1. **Couleurs configurées**
- 🟢 **Véhicules légers (VL)** : `#84D189`
- 🔴 **Poids lourds (PL)** : `#ED6345`
- 🔵 **Motocycles** : `#90C6DE`
- 🟠 **Véhicules toute catégorie** : `#ED934E`

### 2. **Fonctionnement**
- **Formulaire d'ajout** : Points colorés + descriptions
- **Section de recherche** : Dropdown avec couleurs
- **Données exclusives** : Uniquement depuis `/api/CategorieLignes`

## 🚨 DÉPANNAGE

### 1. **Erreur 404**
```
❌ Erreur lors de la récupération des catégories depuis l'API CategorieLignes
```
**Solution** : Vérifiez que l'endpoint `/api/CategorieLignes` est configuré et accessible

### 2. **Erreur de connexion DB**
```
❌ Erreur de connexion à la base de données
```
**Solution** : Vérifiez la chaîne de connexion dans `appsettings.json`

### 3. **Table inexistante**
```
❌ Table CategorieLignes non trouvée
```
**Solution** : Exécutez le script SQL `CategorieLignes_Setup.sql`

## ✅ VÉRIFICATION FINALE

### 1. **Backend**
- [ ] Endpoint `/api/CategorieLignes` accessible
- [ ] Base de données connectée
- [ ] Table `CategorieLignes` créée et remplie

### 2. **Frontend**
- [ ] Module Lignes charge sans erreur
- [ ] Dropdown Catégorie affiche les données
- [ ] Points colorés visibles
- [ ] Descriptions affichées

### 3. **Test complet**
- [ ] Ajouter une nouvelle ligne
- [ ] Sélectionner une catégorie
- [ ] Voir les points colorés
- [ ] Rechercher par catégorie

## 🎉 RÉSULTAT ATTENDU

**Le module Lignes utilisera exclusivement les données de la table `CategorieLignes` avec :**
- ✅ **Points colorés personnalisés**
- ✅ **Descriptions complètes**
- ✅ **Données en temps réel depuis la DB**
- ✅ **Aucune donnée mockée**

---

**🚀 Prêt à tester ! Configurez le backend et testez le module Lignes.**


