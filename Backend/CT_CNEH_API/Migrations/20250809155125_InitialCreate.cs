using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CT_CNEH_API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CadreAutorisations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CadreAutorisations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategorieCCTs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategorieCCTs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CibleFormations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CibleFormations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NiveauFormations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Cible = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NiveauFormations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatutAdministratifs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModification = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatutAdministratifs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatutLignes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatutLignes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatutRCs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatutRCs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeCTTs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeCTTs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeDecisions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsSanction = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeDecisions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeEntites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEntites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeEquipements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Etalonnable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeEquipements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypesFormation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesFormation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LexiqueFormation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NombreHeures = table.Column<int>(type: "int", nullable: false),
                    CibleFormationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LexiqueFormation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LexiqueFormation_CibleFormations_CibleFormationId",
                        column: x => x.CibleFormationId,
                        principalTable: "CibleFormations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Provinces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RegionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Provinces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Provinces_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Villes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    RegionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Villes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Villes_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reseaux",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Agrement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAgrement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StatutId = table.Column<int>(type: "int", nullable: false),
                    DateStatut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdresseSiege = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdresseDomiciliation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VilleId = table.Column<int>(type: "int", nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fax = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    Ice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdFiscal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RegisterCommerce = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CadreAutorisationId = table.Column<int>(type: "int", nullable: false),
                    NomRepresentantLegal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdressRepresentantLegal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TelRepresentantLegal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MailRepresentant = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThumbprintCertificat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatutRCId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reseaux", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reseaux_CadreAutorisations_CadreAutorisationId",
                        column: x => x.CadreAutorisationId,
                        principalTable: "CadreAutorisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reseaux_StatutRCs_StatutId",
                        column: x => x.StatutId,
                        principalTable: "StatutRCs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reseaux_StatutRCs_StatutRCId",
                        column: x => x.StatutRCId,
                        principalTable: "StatutRCs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Reseaux_Villes_VilleId",
                        column: x => x.VilleId,
                        principalTable: "Villes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CCTs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Agrement = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DateAgrement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CategorieId = table.Column<int>(type: "int", nullable: false),
                    StatutId = table.Column<int>(type: "int", nullable: false),
                    DateStatut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReseauId = table.Column<int>(type: "int", nullable: false),
                    DateRalliement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdresseCCT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdresseSiege = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdresseDomiciliation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VilleId = table.Column<int>(type: "int", nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fax = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ice = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdFiscal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CadreAutorisationId = table.Column<int>(type: "int", nullable: false),
                    EngagementSpecifique = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPersonneMorale = table.Column<bool>(type: "bit", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    QuotaVL = table.Column<int>(type: "int", nullable: true),
                    QuotaPL = table.Column<int>(type: "int", nullable: true),
                    ProvinceId = table.Column<int>(type: "int", nullable: true),
                    RegionId = table.Column<int>(type: "int", nullable: true),
                    ThumbprintCertificat = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CCTs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CCTs_CadreAutorisations_CadreAutorisationId",
                        column: x => x.CadreAutorisationId,
                        principalTable: "CadreAutorisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CCTs_CategorieCCTs_CategorieId",
                        column: x => x.CategorieId,
                        principalTable: "CategorieCCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CCTs_Provinces_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "Provinces",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CCTs_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CCTs_Reseaux_ReseauId",
                        column: x => x.ReseauId,
                        principalTable: "Reseaux",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CCTs_StatutRCs_StatutId",
                        column: x => x.StatutId,
                        principalTable: "StatutRCs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CCTs_TypeCTTs_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeCTTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CCTs_Villes_VilleId",
                        column: x => x.VilleId,
                        principalTable: "Villes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CNSS = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CCTId = table.Column<int>(type: "int", nullable: true),
                    NumeroCAP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateCAP = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateExpirationCAP = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CategorieCAPId = table.Column<int>(type: "int", nullable: true),
                    StatutAdministratifId = table.Column<int>(type: "int", nullable: false),
                    AnneeAutorisation = table.Column<int>(type: "int", nullable: false),
                    DateAffectationCCT = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NumDecisionRenouv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateDecisionRenouv = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agents_CategorieCCTs_CategorieCAPId",
                        column: x => x.CategorieCAPId,
                        principalTable: "CategorieCCTs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Agents_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Agents_StatutAdministratifs_StatutAdministratifId",
                        column: x => x.StatutAdministratifId,
                        principalTable: "StatutAdministratifs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChefCentres",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CCTId = table.Column<int>(type: "int", nullable: true),
                    ReferenceApprobationCNEH = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateApprobationCNEH = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Tel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CNSS = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sexe = table.Column<bool>(type: "bit", nullable: false),
                    DateNaissance = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NiveauFormationInitialId = table.Column<int>(type: "int", nullable: true),
                    DateAffectationCCT = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AnneeAutorisation = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChefCentres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChefCentres_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChefCentres_NiveauFormations_NiveauFormationInitialId",
                        column: x => x.NiveauFormationInitialId,
                        principalTable: "NiveauFormations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HistoriqueCCTs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CCTId = table.Column<int>(type: "int", nullable: false),
                    ReseauId = table.Column<int>(type: "int", nullable: false),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoriqueCCTs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoriqueCCTs_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HistoriqueCCTs_Reseaux_ReseauId",
                        column: x => x.ReseauId,
                        principalTable: "Reseaux",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Lignes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CCTId = table.Column<int>(type: "int", nullable: false),
                    NumLigne = table.Column<int>(type: "int", nullable: false),
                    TypeLigneId = table.Column<int>(type: "int", nullable: false),
                    StatutId = table.Column<int>(type: "int", nullable: false),
                    DateStatut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Decision = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DecisionDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lignes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lignes_CategorieCCTs_TypeLigneId",
                        column: x => x.TypeLigneId,
                        principalTable: "CategorieCCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lignes_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Lignes_StatutLignes_StatutId",
                        column: x => x.StatutId,
                        principalTable: "StatutLignes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Formations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Intitule = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CCTId = table.Column<int>(type: "int", nullable: true),
                    AgentId = table.Column<int>(type: "int", nullable: true),
                    ChefCentreId = table.Column<int>(type: "int", nullable: true),
                    TypeFormationId = table.Column<int>(type: "int", nullable: false),
                    Matiere = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ValideParFormateur = table.Column<bool>(type: "bit", nullable: false),
                    PremierAnimateur = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeuxiemeAnimateur = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValideCHEH = table.Column<bool>(type: "bit", nullable: false),
                    ValideLe = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LexiqueFormationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Formations_Agents_AgentId",
                        column: x => x.AgentId,
                        principalTable: "Agents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Formations_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Formations_ChefCentres_ChefCentreId",
                        column: x => x.ChefCentreId,
                        principalTable: "ChefCentres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Formations_LexiqueFormation_LexiqueFormationId",
                        column: x => x.LexiqueFormationId,
                        principalTable: "LexiqueFormation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Formations_TypesFormation_TypeFormationId",
                        column: x => x.TypeFormationId,
                        principalTable: "TypesFormation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Decisions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    TypeEntiteId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LienDocument = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CCTId = table.Column<int>(type: "int", nullable: true),
                    AgentId = table.Column<int>(type: "int", nullable: true),
                    ChefCentreId = table.Column<int>(type: "int", nullable: true),
                    ReseauId = table.Column<int>(type: "int", nullable: true),
                    LigneId = table.Column<int>(type: "int", nullable: true),
                    Observation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Decisions_Agents_AgentId",
                        column: x => x.AgentId,
                        principalTable: "Agents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_CCTs_CCTId",
                        column: x => x.CCTId,
                        principalTable: "CCTs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_ChefCentres_ChefCentreId",
                        column: x => x.ChefCentreId,
                        principalTable: "ChefCentres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_Lignes_LigneId",
                        column: x => x.LigneId,
                        principalTable: "Lignes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_Reseaux_ReseauId",
                        column: x => x.ReseauId,
                        principalTable: "Reseaux",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_TypeDecisions_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeDecisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Decisions_TypeEntites_TypeEntiteId",
                        column: x => x.TypeEntiteId,
                        principalTable: "TypeEntites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Equipements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    Marque = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Modele = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateEtalonnage = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateExpirationEtalonnage = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SocieteEtalonnage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdresseSocieteEtalonnage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TelSocieteEtalonnage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Protocole = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ReferenceHomologation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DateHomologation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LigneId = table.Column<int>(type: "int", nullable: true),
                    DateMiseService = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IdEquipement = table.Column<string>(type: "nvarchar(355)", maxLength: 355, nullable: false),
                    CCTCreationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Equipements_CCTs_CCTCreationId",
                        column: x => x.CCTCreationId,
                        principalTable: "CCTs",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Equipements_Lignes_LigneId",
                        column: x => x.LigneId,
                        principalTable: "Lignes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Equipements_TypeEquipements_TypeId",
                        column: x => x.TypeId,
                        principalTable: "TypeEquipements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agents_CategorieCAPId",
                table: "Agents",
                column: "CategorieCAPId");

            migrationBuilder.CreateIndex(
                name: "IX_Agents_CCTId",
                table: "Agents",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_Agents_StatutAdministratifId",
                table: "Agents",
                column: "StatutAdministratifId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_CadreAutorisationId",
                table: "CCTs",
                column: "CadreAutorisationId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_CategorieId",
                table: "CCTs",
                column: "CategorieId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_ProvinceId",
                table: "CCTs",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_RegionId",
                table: "CCTs",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_ReseauId",
                table: "CCTs",
                column: "ReseauId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_StatutId",
                table: "CCTs",
                column: "StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_TypeId",
                table: "CCTs",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CCTs_VilleId",
                table: "CCTs",
                column: "VilleId");

            migrationBuilder.CreateIndex(
                name: "IX_ChefCentres_CCTId",
                table: "ChefCentres",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_ChefCentres_NiveauFormationInitialId",
                table: "ChefCentres",
                column: "NiveauFormationInitialId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_AgentId",
                table: "Decisions",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_CCTId",
                table: "Decisions",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_ChefCentreId",
                table: "Decisions",
                column: "ChefCentreId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_LigneId",
                table: "Decisions",
                column: "LigneId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_ReseauId",
                table: "Decisions",
                column: "ReseauId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_TypeEntiteId",
                table: "Decisions",
                column: "TypeEntiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Decisions_TypeId",
                table: "Decisions",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_CCTCreationId",
                table: "Equipements",
                column: "CCTCreationId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_LigneId",
                table: "Equipements",
                column: "LigneId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipements_TypeId",
                table: "Equipements",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_AgentId",
                table: "Formations",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_CCTId",
                table: "Formations",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_ChefCentreId",
                table: "Formations",
                column: "ChefCentreId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_LexiqueFormationId",
                table: "Formations",
                column: "LexiqueFormationId");

            migrationBuilder.CreateIndex(
                name: "IX_Formations_TypeFormationId",
                table: "Formations",
                column: "TypeFormationId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoriqueCCTs_CCTId",
                table: "HistoriqueCCTs",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoriqueCCTs_ReseauId",
                table: "HistoriqueCCTs",
                column: "ReseauId");

            migrationBuilder.CreateIndex(
                name: "IX_LexiqueFormation_CibleFormationId",
                table: "LexiqueFormation",
                column: "CibleFormationId");

            migrationBuilder.CreateIndex(
                name: "IX_Lignes_CCTId",
                table: "Lignes",
                column: "CCTId");

            migrationBuilder.CreateIndex(
                name: "IX_Lignes_StatutId",
                table: "Lignes",
                column: "StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_Lignes_TypeLigneId",
                table: "Lignes",
                column: "TypeLigneId");

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_RegionId",
                table: "Provinces",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Reseaux_CadreAutorisationId",
                table: "Reseaux",
                column: "CadreAutorisationId");

            migrationBuilder.CreateIndex(
                name: "IX_Reseaux_StatutId",
                table: "Reseaux",
                column: "StatutId");

            migrationBuilder.CreateIndex(
                name: "IX_Reseaux_StatutRCId",
                table: "Reseaux",
                column: "StatutRCId");

            migrationBuilder.CreateIndex(
                name: "IX_Reseaux_VilleId",
                table: "Reseaux",
                column: "VilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Villes_RegionId",
                table: "Villes",
                column: "RegionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Decisions");

            migrationBuilder.DropTable(
                name: "Equipements");

            migrationBuilder.DropTable(
                name: "Formations");

            migrationBuilder.DropTable(
                name: "HistoriqueCCTs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "TypeDecisions");

            migrationBuilder.DropTable(
                name: "TypeEntites");

            migrationBuilder.DropTable(
                name: "Lignes");

            migrationBuilder.DropTable(
                name: "TypeEquipements");

            migrationBuilder.DropTable(
                name: "Agents");

            migrationBuilder.DropTable(
                name: "ChefCentres");

            migrationBuilder.DropTable(
                name: "LexiqueFormation");

            migrationBuilder.DropTable(
                name: "TypesFormation");

            migrationBuilder.DropTable(
                name: "StatutLignes");

            migrationBuilder.DropTable(
                name: "StatutAdministratifs");

            migrationBuilder.DropTable(
                name: "CCTs");

            migrationBuilder.DropTable(
                name: "NiveauFormations");

            migrationBuilder.DropTable(
                name: "CibleFormations");

            migrationBuilder.DropTable(
                name: "CategorieCCTs");

            migrationBuilder.DropTable(
                name: "Provinces");

            migrationBuilder.DropTable(
                name: "Reseaux");

            migrationBuilder.DropTable(
                name: "TypeCTTs");

            migrationBuilder.DropTable(
                name: "CadreAutorisations");

            migrationBuilder.DropTable(
                name: "StatutRCs");

            migrationBuilder.DropTable(
                name: "Villes");

            migrationBuilder.DropTable(
                name: "Regions");
        }
    }
}
