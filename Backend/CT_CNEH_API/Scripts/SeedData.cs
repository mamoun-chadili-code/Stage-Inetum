using CT_CNEH_API.Data;
using CT_CNEH_API.Models;
using BCrypt.Net;

namespace CT_CNEH_API.Scripts
{
    public static class SeedData
    {
        public static async Task InitializeAsync(ApplicationDbContext context)
        {
            // Vérifier si des données existent déjà
            if (context.Users.Any())
                return;

            // Créer un utilisateur administrateur
            var adminUser = new User
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                FullName = "Administrateur",
                Email = "admin@ctcneh.com",
                Role = "Admin",
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            context.Users.Add(adminUser);
            await context.SaveChangesAsync();



            // Créer des cadres d'autorisation
            var cadresAuth = new List<CadreAutorisation>
            {
                new CadreAutorisation { Libelle = "Autorisation Standard", Code = "STD" },
                new CadreAutorisation { Libelle = "Autorisation Spéciale", Code = "SPC" }
            };

            context.CadreAutorisations.AddRange(cadresAuth);
            await context.SaveChangesAsync();

            // Créer des régions
            var regions = new List<Region>
            {
                new Region { Libelle = "Casablanca-Settat", Code = "CS" },
                new Region { Libelle = "Rabat-Salé-Kénitra", Code = "RSK" },
                new Region { Libelle = "Fès-Meknès", Code = "FM" },
                new Region { Libelle = "Marrakech-Safi", Code = "MS" },
                new Region { Libelle = "Tanger-Tétouan-Al Hoceima", Code = "TTAH" }
            };

            context.Regions.AddRange(regions);
            await context.SaveChangesAsync();

            // Créer des villes
            var villes = new List<Ville>
            {
                new Ville { Nom = "Casablanca", Code = "CASA", RegionId = 1 },
                new Ville { Nom = "Rabat", Code = "RAB", RegionId = 2 },
                new Ville { Nom = "Fès", Code = "FES", RegionId = 3 },
                new Ville { Nom = "Marrakech", Code = "MAR", RegionId = 4 },
                new Ville { Nom = "Tanger", Code = "TAN", RegionId = 5 }
            };

            context.Villes.AddRange(villes);
            await context.SaveChangesAsync();

            // Créer des provinces
            var provinces = new List<Province>
            {
                new Province { Libelle = "Province de Casablanca", Code = "PROV_CASA", RegionId = 1 },
                new Province { Libelle = "Province de Rabat", Code = "PROV_RAB", RegionId = 2 },
                new Province { Libelle = "Province de Fès", Code = "PROV_FES", RegionId = 3 },
                new Province { Libelle = "Province de Marrakech", Code = "PROV_MAR", RegionId = 4 },
                new Province { Libelle = "Province de Tanger", Code = "PROV_TAN", RegionId = 5 }
            };

            context.Provinces.AddRange(provinces);
            await context.SaveChangesAsync();

            // Créer des réseaux
            var reseaux = new List<Reseau>
            {
                new Reseau { 
                    Nom = "Réseau Nord", 
                    Agrement = "AGR001", 
                    DateAgrement = DateTime.Now.AddYears(-2),
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    AdresseSiege = "123 Rue du Nord, Tanger",
                    VilleId = 5,
                    Tel = "0539-123456",
                    Fax = "0539-123457",
                    Mail = "nord@ctcneh.com",
                    CadreAutorisationId = 1,
                    NomRepresentantLegal = "Ahmed Benali",
                    AdressRepresentantLegal = "123 Rue du Nord, Tanger",
                    TelRepresentantLegal = "0539-123458"
                },
                new Reseau { 
                    Nom = "Réseau Centre", 
                    Agrement = "AGR002", 
                    DateAgrement = DateTime.Now.AddYears(-1),
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    AdresseSiege = "456 Rue du Centre, Casablanca",
                    VilleId = 1,
                    Tel = "0522-123456",
                    Fax = "0522-123457",
                    Mail = "centre@ctcneh.com",
                    CadreAutorisationId = 1,
                    NomRepresentantLegal = "Fatima Zahra",
                    AdressRepresentantLegal = "456 Rue du Centre, Casablanca",
                    TelRepresentantLegal = "0522-123458"
                },
                // 10 réseaux de test supplémentaires
                new Reseau { Nom = "Réseau Test 1", Agrement = "AGR003", DateAgrement = DateTime.Now, StatutId = 1, DateStatut = DateTime.Now, AdresseSiege = "Adresse 1", VilleId = 1, Tel = "0600000001", Fax = "0600000001", Mail = "test1@ctcneh.com", CadreAutorisationId = 1, NomRepresentantLegal = "Test 1", AdressRepresentantLegal = "Adresse 1", TelRepresentantLegal = "0600000001" },
                new Reseau { Nom = "Réseau Test 2", Agrement = "AGR004", DateAgrement = DateTime.Now, StatutId = 1, DateStatut = DateTime.Now, AdresseSiege = "Adresse 2", VilleId = 2, Tel = "0600000002", Fax = "0600000002", Mail = "test2@ctcneh.com", CadreAutorisationId = 2, NomRepresentantLegal = "Test 2", AdressRepresentantLegal = "Adresse 2", TelRepresentantLegal = "0600000002" },
                new Reseau { Nom = "Réseau Test 3", Agrement = "AGR005", DateAgrement = DateTime.Now, StatutId = 2, DateStatut = DateTime.Now, AdresseSiege = "Adresse 3", VilleId = 3, Tel = "0600000003", Fax = "0600000003", Mail = "test3@ctcneh.com", CadreAutorisationId = 1, NomRepresentantLegal = "Test 3", AdressRepresentantLegal = "Adresse 3", TelRepresentantLegal = "0600000003" },
                new Reseau { Nom = "Réseau Test 4", Agrement = "AGR006", DateAgrement = DateTime.Now, StatutId = 2, DateStatut = DateTime.Now, AdresseSiege = "Adresse 4", VilleId = 4, Tel = "0600000004", Fax = "0600000004", Mail = "test4@ctcneh.com", CadreAutorisationId = 2, NomRepresentantLegal = "Test 4", AdressRepresentantLegal = "Adresse 4", TelRepresentantLegal = "0600000004" },
                new Reseau { Nom = "Réseau Test 5", Agrement = "AGR007", DateAgrement = DateTime.Now, StatutId = 1, DateStatut = DateTime.Now, AdresseSiege = "Adresse 5", VilleId = 5, Tel = "0600000005", Fax = "0600000005", Mail = "test5@ctcneh.com", CadreAutorisationId = 1, NomRepresentantLegal = "Test 5", AdressRepresentantLegal = "Adresse 5", TelRepresentantLegal = "0600000005" },
                new Reseau { Nom = "Réseau Test 6", Agrement = "AGR008", DateAgrement = DateTime.Now, StatutId = 2, DateStatut = DateTime.Now, AdresseSiege = "Adresse 6", VilleId = 1, Tel = "0600000006", Fax = "0600000006", Mail = "test6@ctcneh.com", CadreAutorisationId = 2, NomRepresentantLegal = "Test 6", AdressRepresentantLegal = "Adresse 6", TelRepresentantLegal = "0600000006" },
                new Reseau { Nom = "Réseau Test 7", Agrement = "AGR009", DateAgrement = DateTime.Now, StatutId = 1, DateStatut = DateTime.Now, AdresseSiege = "Adresse 7", VilleId = 2, Tel = "0600000007", Fax = "0600000007", Mail = "test7@ctcneh.com", CadreAutorisationId = 1, NomRepresentantLegal = "Test 7", AdressRepresentantLegal = "Adresse 7", TelRepresentantLegal = "0600000007" },
                new Reseau { Nom = "Réseau Test 8", Agrement = "AGR010", DateAgrement = DateTime.Now, StatutId = 2, DateStatut = DateTime.Now, AdresseSiege = "Adresse 8", VilleId = 3, Tel = "0600000008", Fax = "0600000008", Mail = "test8@ctcneh.com", CadreAutorisationId = 2, NomRepresentantLegal = "Test 8", AdressRepresentantLegal = "Adresse 8", TelRepresentantLegal = "0600000008" },
                new Reseau { Nom = "Réseau Test 9", Agrement = "AGR011", DateAgrement = DateTime.Now, StatutId = 1, DateStatut = DateTime.Now, AdresseSiege = "Adresse 9", VilleId = 4, Tel = "0600000009", Fax = "0600000009", Mail = "test9@ctcneh.com", CadreAutorisationId = 1, NomRepresentantLegal = "Test 9", AdressRepresentantLegal = "Adresse 9", TelRepresentantLegal = "0600000009" },
                new Reseau { Nom = "Réseau Test 10", Agrement = "AGR012", DateAgrement = DateTime.Now, StatutId = 2, DateStatut = DateTime.Now, AdresseSiege = "Adresse 10", VilleId = 5, Tel = "0600000010", Fax = "0600000010", Mail = "test10@ctcneh.com", CadreAutorisationId = 2, NomRepresentantLegal = "Test 10", AdressRepresentantLegal = "Adresse 10", TelRepresentantLegal = "0600000010" }
            };

            context.Reseaux.AddRange(reseaux);
            await context.SaveChangesAsync();

            // Créer des logos de test pour les réseaux
            var logos = new List<Logo>
            {
                new Logo { 
                    ReseauId = 1, 
                    NomFichier = "logo_reseau_nord.png", 
                    TypeMime = "image/png", 
                    TailleFichier = 1024, 
                    CheminStockage = "uploads/logos/logo_reseau_nord.png",
                    AltText = "Logo du Réseau Nord",
                    DateUpload = DateTime.UtcNow,
                    IsActive = true
                },
                new Logo { 
                    ReseauId = 2, 
                    NomFichier = "logo_reseau_centre.png", 
                    TypeMime = "image/png", 
                    TailleFichier = 1024, 
                    CheminStockage = "uploads/logos/logo_reseau_centre.png",
                    AltText = "Logo du Réseau Centre",
                    DateUpload = DateTime.UtcNow,
                    IsActive = true
                }
            };

            context.Logos.AddRange(logos);
            await context.SaveChangesAsync();

            // Mettre à jour les LogoUrl des réseaux
            var reseauNord = await context.Reseaux.FindAsync(1);
            if (reseauNord != null)
            {
                reseauNord.LogoUrl = "/uploads/logos/logo_reseau_nord.png";
            }

            var reseauCentre = await context.Reseaux.FindAsync(2);
            if (reseauCentre != null)
            {
                reseauCentre.LogoUrl = "/uploads/logos/logo_reseau_centre.png";
            }

            await context.SaveChangesAsync();

            // Créer des catégories CCT
            var categories = new List<CategorieCCT>
            {
                new CategorieCCT { Libelle = "Catégorie A", Code = "CAT_A" },
                new CategorieCCT { Libelle = "Catégorie B", Code = "CAT_B" },
                new CategorieCCT { Libelle = "Catégorie C", Code = "CAT_C" }
            };

            context.CategorieCCTs.AddRange(categories);
            await context.SaveChangesAsync();

            // Créer des types CTT
            var typesCTT = new List<TypeCTT>
            {
                new TypeCTT { Libelle = "Type 1", Code = "T1" },
                new TypeCTT { Libelle = "Type 2", Code = "T2" },
                new TypeCTT { Libelle = "Type 3", Code = "T3" }
            };

            context.TypeCTTs.AddRange(typesCTT);
            await context.SaveChangesAsync();

            // Créer des statuts administratifs
            var statutsAdmin = new List<StatutAdministratif>
            {
                new StatutAdministratif { Libelle = "Actif" },
                new StatutAdministratif { Libelle = "Inactif" },
                new StatutAdministratif { Libelle = "En construction" }
            };

            context.StatutAdministratifs.AddRange(statutsAdmin);
            await context.SaveChangesAsync();

            // Créer des niveaux de formation
            var niveauxFormation = new List<NiveauFormation>
            {
                new NiveauFormation { Libelle = "Débutant" },
                new NiveauFormation { Libelle = "Intermédiaire" },
                new NiveauFormation { Libelle = "Expert" }
            };

            context.NiveauFormations.AddRange(niveauxFormation);
            await context.SaveChangesAsync();

            // Créer des cibles de formation
            var ciblesFormation = new List<CibleFormation>
            {
                new CibleFormation { Libelle = "Agents" },
                new CibleFormation { Libelle = "Chefs de centre" },
                new CibleFormation { Libelle = "Managers" }
            };

            context.CibleFormations.AddRange(ciblesFormation);
            await context.SaveChangesAsync();

            // Créer des types d'équipements
            var typesEquipements = new List<TypeEquipement>
            {
                new TypeEquipement { Libelle = "Informatique" },
                new TypeEquipement { Libelle = "Bureau" },
                new TypeEquipement { Libelle = "Technique" },
                new TypeEquipement { Libelle = "Sécurité" }
            };

            context.TypeEquipements.AddRange(typesEquipements);
            await context.SaveChangesAsync();

            // Créer des statuts d'équipements de test
            var statutsEquipements = new List<StatutEquipement>
            {
                new StatutEquipement { Libelle = "En service", Description = "Équipement en service normal" },
                new StatutEquipement { Libelle = "En maintenance", Description = "Équipement en maintenance" },
                new StatutEquipement { Libelle = "Hors service", Description = "Équipement hors service" },
                new StatutEquipement { Libelle = "En réparation", Description = "Équipement en réparation" }
            };
            context.StatutsEquipement.AddRange(statutsEquipements);
            await context.SaveChangesAsync();

            // Créer des types de décisions
            var typesDecisions = new List<TypeDecision>
            {
                new TypeDecision { Libelle = "Approbation" },
                new TypeDecision { Libelle = "Rejet" },
                new TypeDecision { Libelle = "Suspension" }
            };

            context.TypeDecisions.AddRange(typesDecisions);
            await context.SaveChangesAsync();

            // Créer des types d'entités
            var typesEntites = new List<TypeEntite>
            {
                new TypeEntite { Libelle = "CCT" },
                new TypeEntite { Libelle = "Agent" },
                new TypeEntite { Libelle = "Chef de centre" }
            };

            context.TypeEntites.AddRange(typesEntites);
            await context.SaveChangesAsync();

            // Créer des types de formation
            var typesFormation = new List<TypesFormation>
            {
                new TypesFormation { Libelle = "Formation initiale" },
                new TypesFormation { Libelle = "Formation continue" },
                new TypesFormation { Libelle = "Formation spécialisée" }
            };

            context.TypesFormation.AddRange(typesFormation);
            await context.SaveChangesAsync();

            // Créer des catégories de lignes
            var categoriesLigne = new List<Categorie>
            {
                new Categorie { Nom = "Ligne principale", Description = "Lignes principales du réseau" },
                new Categorie { Nom = "Ligne secondaire", Description = "Lignes secondaires du réseau" },
                new Categorie { Nom = "Ligne de desserte", Description = "Lignes de desserte locale" }
            };
            context.Categories.AddRange(categoriesLigne);
            await context.SaveChangesAsync();

            // Créer des statuts de lignes
            var statutsLigne = new List<Statut>
            {
                new Statut { Nom = "En exploitation", Description = "Ligne en exploitation normale" },
                new Statut { Nom = "En construction", Description = "Ligne en cours de construction" },
                new Statut { Nom = "Hors service", Description = "Ligne hors service" },
                new Statut { Nom = "En maintenance", Description = "Ligne en maintenance" }
            };
            context.Statuts.AddRange(statutsLigne);
            await context.SaveChangesAsync();



            // Créer des CCTs de test
            var ccts = new List<CCT>
            {
                new CCT {
                    Nom = "Centre de Contrôle Technique Casablanca",
                    Agrement = "CCT001",
                    DateAgrement = DateTime.Now.AddYears(-3),
                    CategorieId = 1,
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    ReseauId = 1,
                    DateRalliement = DateTime.Now.AddYears(-3),
                    AdresseCCT = "123 Avenue Mohammed V, Casablanca",
                    Latitude = "33.5731",
                    Longitude = "-7.5898",
                    AdresseSiege = "123 Avenue Mohammed V, Casablanca",
                    AdresseDomiciliation = "123 Avenue Mohammed V, Casablanca",
                    VilleId = 1,
                    Tel = "0522-123456",
                    Fax = "0522-123457",
                    Mail = "cct.casablanca@ctcneh.com",
                    Ice = "ICE001",
                    IdFiscal = "FISC001",
                    CadreAutorisationId = 1,
                    EngagementSpecifique = "Engagement standard",
                    IsPersonneMorale = true,
                    TypeId = 1,
                    QuotaVL = 1000,
                    QuotaPL = 500,
                    ProvinceId = 1,
                    RegionId = 1,
                    ThumbprintCertificat = "CERT001"
                },
                new CCT {
                    Nom = "Centre de Contrôle Technique Rabat",
                    Agrement = "CCT002",
                    DateAgrement = DateTime.Now.AddYears(-2),
                    CategorieId = 2,
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    ReseauId = 2,
                    DateRalliement = DateTime.Now.AddYears(-2),
                    AdresseCCT = "456 Avenue Hassan II, Rabat",
                    Latitude = "34.0209",
                    Longitude = "-6.8416",
                    AdresseSiege = "456 Avenue Hassan II, Rabat",
                    AdresseDomiciliation = "456 Avenue Hassan II, Rabat",
                    VilleId = 2,
                    Tel = "0537-123456",
                    Fax = "0537-123457",
                    Mail = "cct.rabat@ctcneh.com",
                    Ice = "ICE002",
                    IdFiscal = "FISC002",
                    CadreAutorisationId = 1,
                    EngagementSpecifique = "Engagement spécial",
                    IsPersonneMorale = true,
                    TypeId = 2,
                    QuotaVL = 800,
                    QuotaPL = 400,
                    ProvinceId = 2,
                    RegionId = 2,
                    ThumbprintCertificat = "CERT002"
                },
                new CCT {
                    Nom = "Centre de Contrôle Technique Fès",
                    Agrement = "CCT003",
                    DateAgrement = DateTime.Now.AddYears(-1),
                    CategorieId = 3,
                    StatutId = 2,
                    DateStatut = DateTime.Now,
                    ReseauId = 3,
                    DateRalliement = DateTime.Now.AddYears(-1),
                    AdresseCCT = "789 Boulevard Mohammed V, Fès",
                    Latitude = "34.0181",
                    Longitude = "-5.0078",
                    AdresseSiege = "789 Boulevard Mohammed V, Fès",
                    AdresseDomiciliation = "789 Boulevard Mohammed V, Fès",
                    VilleId = 3,
                    Tel = "0535-123456",
                    Fax = "0535-123457",
                    Mail = "cct.fes@ctcneh.com",
                    Ice = "ICE003",
                    IdFiscal = "FISC003",
                    CadreAutorisationId = 2,
                    EngagementSpecifique = "Engagement avancé",
                    IsPersonneMorale = false,
                    TypeId = 3,
                    QuotaVL = 600,
                    QuotaPL = 300,
                    ProvinceId = 3,
                    RegionId = 3,
                    ThumbprintCertificat = "CERT003"
                },
                new CCT {
                    Nom = "Centre de Contrôle Technique Marrakech",
                    Agrement = "CCT004",
                    DateAgrement = DateTime.Now.AddMonths(-6),
                    CategorieId = 1,
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    ReseauId = 4,
                    DateRalliement = DateTime.Now.AddMonths(-6),
                    AdresseCCT = "321 Avenue Mohammed VI, Marrakech",
                    Latitude = "31.6295",
                    Longitude = "-7.9811",
                    AdresseSiege = "321 Avenue Mohammed VI, Marrakech",
                    AdresseDomiciliation = "321 Avenue Mohammed VI, Marrakech",
                    VilleId = 4,
                    Tel = "0524-123456",
                    Fax = "0524-123457",
                    Mail = "cct.marrakech@ctcneh.com",
                    Ice = "ICE004",
                    IdFiscal = "FISC004",
                    CadreAutorisationId = 1,
                    EngagementSpecifique = "Engagement premium",
                    IsPersonneMorale = true,
                    TypeId = 1,
                    QuotaVL = 1200,
                    QuotaPL = 600,
                    ProvinceId = 4,
                    RegionId = 4,
                    ThumbprintCertificat = "CERT004"
                },
                new CCT {
                    Nom = "Centre de Contrôle Technique Tanger",
                    Agrement = "CCT005",
                    DateAgrement = DateTime.Now.AddMonths(-3),
                    CategorieId = 2,
                    StatutId = 1,
                    DateStatut = DateTime.Now,
                    ReseauId = 5,
                    DateRalliement = DateTime.Now.AddMonths(-3),
                    AdresseCCT = "654 Boulevard Mohammed V, Tanger",
                    Latitude = "35.7595",
                    Longitude = "-5.8340",
                    AdresseSiege = "654 Boulevard Mohammed V, Tanger",
                    AdresseDomiciliation = "654 Boulevard Mohammed V, Tanger",
                    VilleId = 5,
                    Tel = "0539-123456",
                    Fax = "0539-123457",
                    Mail = "cct.tanger@ctcneh.com",
                    Ice = "ICE005",
                    IdFiscal = "FISC005",
                    CadreAutorisationId = 2,
                    EngagementSpecifique = "Engagement nord",
                    IsPersonneMorale = true,
                    TypeId = 2,
                    QuotaVL = 900,
                    QuotaPL = 450,
                    ProvinceId = 5,
                    RegionId = 5,
                    ThumbprintCertificat = "CERT005"
                },
                // 10 CCTs de test supplémentaires pour la pagination
                new CCT { Nom = "CCT Test 1", Agrement = "CCT006", DateAgrement = DateTime.Now, CategorieId = 1, StatutId = 1, DateStatut = DateTime.Now, ReseauId = 1, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 1", Latitude = "33.5731", Longitude = "-7.5898", VilleId = 1, Tel = "0522-000001", Mail = "cct.test1@ctcneh.com", CadreAutorisationId = 1, IsPersonneMorale = true, TypeId = 1, QuotaVL = 500, QuotaPL = 250, ProvinceId = 1, RegionId = 1 },
                new CCT { Nom = "CCT Test 2", Agrement = "CCT007", DateAgrement = DateTime.Now, CategorieId = 2, StatutId = 2, DateStatut = DateTime.Now, ReseauId = 2, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 2", Latitude = "34.0209", Longitude = "-6.8416", VilleId = 2, Tel = "0537-000002", Mail = "cct.test2@ctcneh.com", CadreAutorisationId = 2, IsPersonneMorale = false, TypeId = 2, QuotaVL = 600, QuotaPL = 300, ProvinceId = 2, RegionId = 2 },
                new CCT { Nom = "CCT Test 3", Agrement = "CCT008", DateAgrement = DateTime.Now, CategorieId = 3, StatutId = 1, DateStatut = DateTime.Now, ReseauId = 3, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 3", Latitude = "34.0181", Longitude = "-5.0078", VilleId = 3, Tel = "0535-000003", Mail = "cct.test3@ctcneh.com", CadreAutorisationId = 1, IsPersonneMorale = true, TypeId = 3, QuotaVL = 700, QuotaPL = 350, ProvinceId = 3, RegionId = 3 },
                new CCT { Nom = "CCT Test 4", Agrement = "CCT009", DateAgrement = DateTime.Now, CategorieId = 1, StatutId = 2, DateStatut = DateTime.Now, ReseauId = 4, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 4", Latitude = "31.6295", Longitude = "-7.9811", VilleId = 4, Tel = "0524-000004", Mail = "cct.test4@ctcneh.com", CadreAutorisationId = 2, IsPersonneMorale = false, TypeId = 1, QuotaVL = 800, QuotaPL = 400, ProvinceId = 4, RegionId = 4 },
                new CCT { Nom = "CCT Test 5", Agrement = "CCT010", DateAgrement = DateTime.Now, CategorieId = 2, StatutId = 1, DateStatut = DateTime.Now, ReseauId = 5, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 5", Latitude = "35.7595", Longitude = "-5.8340", VilleId = 5, Tel = "0539-000005", Mail = "cct.test5@ctcneh.com", CadreAutorisationId = 1, IsPersonneMorale = true, TypeId = 2, QuotaVL = 900, QuotaPL = 450, ProvinceId = 5, RegionId = 5 },
                new CCT { Nom = "CCT Test 6", Agrement = "CCT011", DateAgrement = DateTime.Now, CategorieId = 3, StatutId = 2, DateStatut = DateTime.Now, ReseauId = 6, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 6", Latitude = "33.5731", Longitude = "-7.5898", VilleId = 1, Tel = "0522-000006", Mail = "cct.test6@ctcneh.com", CadreAutorisationId = 2, IsPersonneMorale = false, TypeId = 3, QuotaVL = 1000, QuotaPL = 500, ProvinceId = 1, RegionId = 1 },
                new CCT { Nom = "CCT Test 7", Agrement = "CCT012", DateAgrement = DateTime.Now, CategorieId = 1, StatutId = 1, DateStatut = DateTime.Now, ReseauId = 7, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 7", Latitude = "34.0209", Longitude = "-6.8416", VilleId = 2, Tel = "0537-000007", Mail = "cct.test7@ctcneh.com", CadreAutorisationId = 1, IsPersonneMorale = true, TypeId = 1, QuotaVL = 1100, QuotaPL = 550, ProvinceId = 2, RegionId = 2 },
                new CCT { Nom = "CCT Test 8", Agrement = "CCT013", DateAgrement = DateTime.Now, CategorieId = 2, StatutId = 2, DateStatut = DateTime.Now, ReseauId = 8, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 8", Latitude = "34.0181", Longitude = "-5.0078", VilleId = 3, Tel = "0535-000008", Mail = "cct.test8@ctcneh.com", CadreAutorisationId = 2, IsPersonneMorale = false, TypeId = 2, QuotaVL = 1200, QuotaPL = 600, ProvinceId = 3, RegionId = 3 },
                new CCT { Nom = "CCT Test 9", Agrement = "CCT014", DateAgrement = DateTime.Now, CategorieId = 3, StatutId = 1, DateStatut = DateTime.Now, ReseauId = 9, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 9", Latitude = "31.6295", Longitude = "-7.9811", VilleId = 4, Tel = "0524-000009", Mail = "cct.test9@ctcneh.com", CadreAutorisationId = 1, IsPersonneMorale = true, TypeId = 3, QuotaVL = 1300, QuotaPL = 650, ProvinceId = 4, RegionId = 4 },
                new CCT { Nom = "CCT Test 10", Agrement = "CCT015", DateAgrement = DateTime.Now, CategorieId = 1, StatutId = 2, DateStatut = DateTime.Now, ReseauId = 10, DateRalliement = DateTime.Now, AdresseCCT = "Adresse CCT 10", Latitude = "35.7595", Longitude = "-5.8340", VilleId = 5, Tel = "0539-000010", Mail = "cct.test10@ctcneh.com", CadreAutorisationId = 2, IsPersonneMorale = false, TypeId = 1, QuotaVL = 1400, QuotaPL = 700, ProvinceId = 5, RegionId = 5 }
            };

            context.CCTs.AddRange(ccts);
            await context.SaveChangesAsync();

            // Créer des catégories CCT de test
            var categoriesCCT = new List<CategorieCCT>
            {
                new CategorieCCT { Libelle = "Conducteur de travaux", Code = "CT001" },
                new CategorieCCT { Libelle = "Chef de chantier", Code = "CC002" },
                new CategorieCCT { Libelle = "Technicien", Code = "TEC003" },
                new CategorieCCT { Libelle = "Ouvrier qualifié", Code = "OQ004" }
            };
            context.CategorieCCTs.AddRange(categoriesCCT);
            await context.SaveChangesAsync();

            // Créer des agents de test
            var agents = new List<Agent>
            {
                new Agent {
                    Nom = "Benali",
                    Prenom = "Ahmed",
                    CIN = "AB123456",
                    Tel = "0612345678",
                    Mail = "ahmed.benali@ctcneh.com",
                    CNSS = "CNSS001",
                    CCTId = 1,
                    NumeroCAP = "CAP001",
                    DateCAP = DateTime.Now.AddYears(-2),
                    DateExpirationCAP = DateTime.Now.AddYears(3),
                    CategorieCAPId = 1,
                    DateAffectationCCT = DateTime.Now.AddYears(-1),
                    AnneeAutorisation = 2022,
                    StatutAdministratifId = 1,
                    Adresse = "123 Rue Mohammed V, Casablanca"
                },
                new Agent {
                    Nom = "Tazi",
                    Prenom = "Fatima",
                    CIN = "TF789012",
                    Tel = "0698765432",
                    Mail = "fatima.tazi@ctcneh.com",
                    CNSS = "CNSS002",
                    CCTId = 2,
                    NumeroCAP = "CAP002",
                    DateCAP = DateTime.Now.AddYears(-3),
                    DateExpirationCAP = DateTime.Now.AddYears(2),
                    CategorieCAPId = 2,
                    DateAffectationCCT = DateTime.Now.AddYears(-2),
                    AnneeAutorisation = 2021,
                    StatutAdministratifId = 1,
                    Adresse = "456 Avenue Hassan II, Rabat"
                },
                new Agent {
                    Nom = "Alaoui",
                    Prenom = "Karim",
                    CIN = "AK345678",
                    Tel = "0654321098",
                    Mail = "karim.alaoui@ctcneh.com",
                    CNSS = "CNSS003",
                    CCTId = 1,
                    NumeroCAP = "CAP003",
                    DateCAP = DateTime.Now.AddYears(-1),
                    DateExpirationCAP = DateTime.Now.AddYears(4),
                    CategorieCAPId = 3,
                    DateAffectationCCT = DateTime.Now.AddMonths(-6),
                    AnneeAutorisation = 2023,
                    StatutAdministratifId = 1,
                    Adresse = "789 Boulevard Mohammed VI, Fès"
                },
                new Agent {
                    Nom = "Bennani",
                    Prenom = "Sara",
                    CIN = "SB901234",
                    Tel = "0645678901",
                    Mail = "sara.bennani@ctcneh.com",
                    CNSS = "CNSS004",
                    CCTId = 4,
                    NumeroCAP = "CAP004",
                    DateCAP = DateTime.Now.AddMonths(-3),
                    DateExpirationCAP = DateTime.Now.AddYears(4),
                    CategorieCAPId = 3,
                    StatutAdministratifId = 2,
                    AnneeAutorisation = 2024,
                    DateAffectationCCT = DateTime.Now.AddMonths(-3),
                    Adresse = "321 Rue de la Palmeraie, Marrakech"
                },
                new Agent {
                    Nom = "Tazi",
                    Prenom = "Omar",
                    CIN = "OT567890",
                    Tel = "0656789012",
                    Mail = "omar.tazi@ctcneh.com",
                    CNSS = "CNSS005",
                    CCTId = 5,
                    NumeroCAP = "CAP005",
                    DateCAP = DateTime.Now.AddMonths(-1),
                    DateExpirationCAP = DateTime.Now.AddYears(4),
                    CategorieCAPId = 2,
                    StatutAdministratifId = 1,
                    AnneeAutorisation = 2024,
                    DateAffectationCCT = DateTime.Now.AddMonths(-1),
                    Adresse = "654 Avenue Ibn Batouta, Tanger"
                },
                // 10 agents de test supplémentaires pour la pagination
                new Agent { Nom = "Agent Test 1", Prenom = "Test", CIN = "AT001", Tel = "0600000001", CCTId = 6, NumeroCAP = "CAP006", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 2", Prenom = "Test", CIN = "AT002", Tel = "0600000002", CCTId = 7, NumeroCAP = "CAP007", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 3", Prenom = "Test", CIN = "AT003", Tel = "0600000003", CCTId = 8, NumeroCAP = "CAP008", DateCAP = DateTime.Now, StatutAdministratifId = 2, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 4", Prenom = "Test", CIN = "AT004", Tel = "0600000004", CCTId = 9, NumeroCAP = "CAP009", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 5", Prenom = "Test", CIN = "AT005", Tel = "0600000005", CCTId = 10, NumeroCAP = "CAP010", DateCAP = DateTime.Now, StatutAdministratifId = 2, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 6", Prenom = "Test", CIN = "AT006", Tel = "0600000006", CCTId = 11, NumeroCAP = "CAP011", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 7", Prenom = "Test", CIN = "AT007", Tel = "0600000007", CCTId = 12, NumeroCAP = "CAP012", DateCAP = DateTime.Now, StatutAdministratifId = 2, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 8", Prenom = "Test", CIN = "AT008", Tel = "0600000008", CCTId = 13, NumeroCAP = "CAP013", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 9", Prenom = "Test", CIN = "AT009", Tel = "0600000009", CCTId = 14, NumeroCAP = "CAP014", DateCAP = DateTime.Now, StatutAdministratifId = 2, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now },
                new Agent { Nom = "Agent Test 10", Prenom = "Test", CIN = "AT010", Tel = "0600000010", CCTId = 15, NumeroCAP = "CAP015", DateCAP = DateTime.Now, StatutAdministratifId = 1, AnneeAutorisation = 2024, DateAffectationCCT = DateTime.Now }
            };

            context.Agents.AddRange(agents);
            await context.SaveChangesAsync();

            // Créer des chefs de centre de test
            var chefsCentre = new List<ChefCentre>
            {
                new ChefCentre {
                    Nom = "Benali",
                    Prenom = "Karim",
                    CIN = "BK123456",
                    CCTId = 1,
                    ReferenceApprobationCNEH = "REF001",
                    DateApprobationCNEH = DateTime.Now.AddYears(-1),
                    Tel = "0612345678",
                    Mail = "karim.benali@ctcneh.com",
                    CNSS = "CNSS001",
                    Sexe = true,
                    DateNaissance = new DateTime(1985, 5, 15),
                    NiveauFormationInitialId = 1,
                    DateAffectationCCT = DateTime.Now.AddYears(-1),
                    AnneeAutorisation = 2022
                },
                new ChefCentre {
                    Nom = "Tazi",
                    Prenom = "Amina",
                    CIN = "TA789012",
                    CCTId = 2,
                    ReferenceApprobationCNEH = "REF002",
                    DateApprobationCNEH = DateTime.Now.AddYears(-2),
                    Tel = "0698765432",
                    Mail = "amina.tazi@ctcneh.com",
                    CNSS = "CNSS002",
                    Sexe = false,
                    DateNaissance = new DateTime(1988, 8, 22),
                    NiveauFormationInitialId = 2,
                    DateAffectationCCT = DateTime.Now.AddYears(-2),
                    AnneeAutorisation = 2021
                }
            };
            context.ChefCentres.AddRange(chefsCentre);
            await context.SaveChangesAsync();

            // Créer des lignes de test
            var lignes = new List<Ligne>
            {
                new Ligne { NumeroLigne = 1, CategorieId = 1, CCTId = 1, StatutId = 1, DateStatut = DateTime.Now, AnneeDemarrage = "2023", CategorieCCTId = 1, StatutLigneId = 1 },
                new Ligne { NumeroLigne = 2, CategorieId = 2, CCTId = 2, StatutId = 1, DateStatut = DateTime.Now, AnneeDemarrage = "2023", CategorieCCTId = 1, StatutLigneId = 1 },
                new Ligne { NumeroLigne = 3, CategorieId = 1, CCTId = 3, StatutId = 2, DateStatut = DateTime.Now, AnneeDemarrage = "2024", CategorieCCTId = 1, StatutLigneId = 1 },
                new Ligne { NumeroLigne = 4, CategorieId = 3, CCTId = 4, StatutId = 1, DateStatut = DateTime.Now, AnneeDemarrage = "2023", CategorieCCTId = 1, StatutLigneId = 1 },
                new Ligne { NumeroLigne = 5, CategorieId = 2, CCTId = 5, StatutId = 1, DateStatut = DateTime.Now, AnneeDemarrage = "2024", CategorieCCTId = 1, StatutLigneId = 1 }
            };
            context.Lignes.AddRange(lignes);
            await context.SaveChangesAsync();

            // Créer des équipements de test
            var equipements = new List<Equipement>
            {
                new Equipement
                {
                    Marque = "Bosch",
                    Modele = "FSA 740",
                    LigneId = 1,
                    TypeEquipementId = 1,
                    Protocole = "ISO 17025",
                    RefHomologation = "HOM-2024-001",
                    DateHomologation = new DateTime(2024, 1, 15),
                    DateMiseService = new DateTime(2024, 2, 1),
                    DateEtalonnage = new DateTime(2024, 2, 1),
                    DateExpirationEtalonnage = new DateTime(2025, 2, 1),
                    CreatedAt = DateTime.Now
                },
                new Equipement
                {
                    Marque = "Siemens",
                    Modele = "VAG 6.0",
                    LigneId = 2,
                    TypeEquipementId = 2,
                    Protocole = "ISO 17025",
                    RefHomologation = "HOM-2024-002",
                    DateHomologation = new DateTime(2024, 3, 10),
                    DateMiseService = new DateTime(2024, 4, 1),
                    DateEtalonnage = new DateTime(2024, 4, 1),
                    DateExpirationEtalonnage = new DateTime(2025, 4, 1),
                    CreatedAt = DateTime.Now
                },
                new Equipement
                {
                    Marque = "Hella",
                    Modele = "KTL 6",
                    LigneId = 3,
                    TypeEquipementId = 1,
                    Protocole = "ISO 17025",
                    RefHomologation = "HOM-2024-003",
                    DateHomologation = new DateTime(2024, 5, 20),
                    DateMiseService = new DateTime(2024, 6, 1),
                    DateEtalonnage = new DateTime(2024, 6, 1),
                    DateExpirationEtalonnage = new DateTime(2025, 6, 1),
                    CreatedAt = DateTime.Now
                },
                new Equipement
                {
                    Marque = "Mahle",
                    Modele = "Beissbarth",
                    LigneId = 4,
                    TypeEquipementId = 2,
                    Protocole = "ISO 17025",
                    RefHomologation = "HOM-2024-004",
                    DateHomologation = new DateTime(2024, 7, 15),
                    DateMiseService = new DateTime(2024, 8, 1),
                    DateEtalonnage = new DateTime(2024, 8, 1),
                    DateExpirationEtalonnage = new DateTime(2025, 8, 1),
                    CreatedAt = DateTime.Now
                },
                new Equipement
                {
                    Marque = "Snap-on",
                    Modele = "Modis Ultra",
                    LigneId = 5,
                    TypeEquipementId = 1,
                    Protocole = "ISO 17025",
                    RefHomologation = "HOM-2024-005",
                    DateHomologation = new DateTime(2024, 9, 10),
                    DateMiseService = new DateTime(2024, 10, 1),
                    DateEtalonnage = new DateTime(2024, 10, 1),
                    DateExpirationEtalonnage = new DateTime(2025, 10, 1),
                    CreatedAt = DateTime.Now
                }
            };
            context.Equipements.AddRange(equipements);
            await context.SaveChangesAsync();

            // Créer des historiques d'affectation pour les agents
            var historiquesAgents = new List<HistoriqueAffectation>
            {
                new HistoriqueAffectation { EntiteId = 1, TypeEntite = "Agent", CCTId = 1, DateAffectation = DateTime.Now.AddYears(-1), MotifAffectation = "Affectation initiale", IsActive = true },
                new HistoriqueAffectation { EntiteId = 2, TypeEntite = "Agent", CCTId = 2, DateAffectation = DateTime.Now.AddYears(-2), MotifAffectation = "Affectation initiale", IsActive = true },
                new HistoriqueAffectation { EntiteId = 3, TypeEntite = "Agent", CCTId = 1, DateAffectation = DateTime.Now.AddMonths(-6), MotifAffectation = "Transfert depuis CCT 3", IsActive = true }
            };
            context.HistoriqueAffectations.AddRange(historiquesAgents);
            await context.SaveChangesAsync();

            // Créer des historiques d'affectation pour les chefs de centre
            var historiquesChefs = new List<HistoriqueAffectation>
            {
                new HistoriqueAffectation { EntiteId = 1, TypeEntite = "ChefCentre", CCTId = 1, DateAffectation = DateTime.Now.AddYears(-1), MotifAffectation = "Nomination comme chef de centre", IsActive = true },
                new HistoriqueAffectation { EntiteId = 2, TypeEntite = "ChefCentre", CCTId = 2, DateAffectation = DateTime.Now.AddYears(-2), MotifAffectation = "Affectation initiale", IsActive = true }
            };
            context.HistoriqueAffectations.AddRange(historiquesChefs);
            await context.SaveChangesAsync();

            // Créer des décisions de test (après avoir créé tous les autres entités)
            var decisions = new List<Decision>
            {
                new Decision
                {
                    TypeDecisionId = 1, // Changement de nom
                    EntiteTypeId = 1,   // Agent
                    EntiteId = 1,
                    DateReference = new DateTime(2024, 2, 8),
                    DateDebut = new DateTime(2024, 5, 21),
                    DateFin = new DateTime(2024, 5, 21),
                    Montant = 1500.00m,
                    Observation = "Changement de nom suite à mariage",
                    ReseauId = 1,
                    CCTId = 1,
                    CreatedAt = DateTime.Now
                },
                new Decision
                {
                    TypeDecisionId = 2, // Promotion
                    EntiteTypeId = 2,   // ChefCentre
                    EntiteId = 1,
                    DateReference = new DateTime(2024, 3, 15),
                    DateDebut = new DateTime(2024, 6, 1),
                    Montant = 2500.00m,
                    Observation = "Promotion au grade de chef de centre principal",
                    ReseauId = 1,
                    CCTId = 1,
                    CreatedAt = DateTime.Now
                },
                new Decision
                {
                    TypeDecisionId = 3, // Suspension
                    EntiteTypeId = 1,   // Agent
                    EntiteId = 2,
                    DateReference = new DateTime(2024, 4, 10),
                    DateDebut = new DateTime(2024, 4, 10),
                    DateFin = new DateTime(2024, 7, 10),
                    Observation = "Suspension temporaire pour manquement professionnel",
                    ReseauId = 1,
                    CCTId = 2,
                    CreatedAt = DateTime.Now
                },
                new Decision
                {
                    TypeDecisionId = 4, // Création
                    EntiteTypeId = 5,   // Ligne
                    EntiteId = 1,
                    DateReference = new DateTime(2024, 1, 20),
                    DateDebut = new DateTime(2024, 1, 20),
                    Observation = "Création d'une nouvelle ligne de contrôle",
                    ReseauId = 1,
                    CCTId = 1,
                    CreatedAt = DateTime.Now
                },
                new Decision
                {
                    TypeDecisionId = 5, // Formation
                    EntiteTypeId = 1,   // Agent
                    EntiteId = 3,
                    DateReference = new DateTime(2024, 5, 5),
                    DateDebut = new DateTime(2024, 8, 1),
                    DateFin = new DateTime(2024, 8, 15),
                    Montant = 800.00m,
                    Observation = "Formation continue sur les nouvelles normes",
                    ReseauId = 1,
                    CCTId = 1,
                    CreatedAt = DateTime.Now
                }
            };
            context.Decisions.AddRange(decisions);
            await context.SaveChangesAsync();

            // Créer des formations de test
            var formations = new List<Formation>
            {
                new Formation
                {
                    TypeFormationId = 1,
                    CCTId = 1,
                    AgentId = 1,
                    Intitule = "Formation sécurité routière",
                    Matiere = "Sécurité routière et réglementation",
                    DateDebut = new DateTime(2024, 6, 15),
                    DateFin = new DateTime(2024, 6, 20),
                    ValideParFormateur = true,
                    PremierAnimateur = "Dr. Ahmed Benali",
                    DeuxiemeAnimateur = "Ing. Fatima Zahra",
                    ValideCHEH = true,
                    DateValidation = new DateTime(2024, 6, 25),
                    CreatedAt = DateTime.Now
                },
                new Formation
                {
                    TypeFormationId = 2,
                    CCTId = 2,
                    ChefCentreId = 1,
                    Intitule = "Formation management",
                    Matiere = "Gestion d'équipe et leadership",
                    DateDebut = new DateTime(2024, 7, 10),
                    DateFin = new DateTime(2024, 7, 15),
                    ValideParFormateur = true,
                    PremierAnimateur = "Prof. Karim Mansouri",
                    ValideCHEH = false,
                    CreatedAt = DateTime.Now
                },
                new Formation
                {
                    TypeFormationId = 3,
                    CCTId = 1,
                    AgentId = 2,
                    Intitule = "Formation nouvelles normes",
                    Matiere = "Normes ISO et procédures",
                    DateDebut = new DateTime(2024, 8, 5),
                    DateFin = new DateTime(2024, 8, 10),
                    ValideParFormateur = false,
                    PremierAnimateur = "Ing. Hassan Tazi",
                    ValideCHEH = false,
                    CreatedAt = DateTime.Now
                },
                new Formation
                {
                    TypeFormationId = 1,
                    CCTId = 3,
                    Intitule = "Formation continue équipements",
                    Matiere = "Maintenance et étalonnage",
                    DateDebut = new DateTime(2024, 9, 1),
                    DateFin = new DateTime(2024, 9, 5),
                    ValideParFormateur = true,
                    PremierAnimateur = "Tech. Mohamed El Amrani",
                    ValideCHEH = true,
                    DateValidation = new DateTime(2024, 9, 10),
                    CreatedAt = DateTime.Now
                },
                new Formation
                {
                    TypeFormationId = 2,
                    CCTId = 2,
                    AgentId = 3,
                    Intitule = "Formation qualité",
                    Matiere = "Système de management qualité",
                    DateDebut = new DateTime(2024, 10, 15),
                    DateFin = new DateTime(2024, 10, 20),
                    ValideParFormateur = true,
                    PremierAnimateur = "Audit. Amina Benjelloun",
                    DeuxiemeAnimateur = "Qual. Rachid El Fassi",
                    ValideCHEH = false,
                    CreatedAt = DateTime.Now
                }
            };
            context.Formations.AddRange(formations);
            await context.SaveChangesAsync();

            Console.WriteLine("Données de test créées avec succès !");
        }
    }
} 