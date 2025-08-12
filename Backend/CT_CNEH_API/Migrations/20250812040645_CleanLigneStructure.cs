using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CT_CNEH_API.Migrations
{
    public partial class CleanLigneStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lignes_CategorieCCTs_TypeLigneId",
                table: "Lignes");

            migrationBuilder.DropForeignKey(
                name: "FK_Lignes_StatutLignes_StatutId",
                table: "Lignes");

            migrationBuilder.AddColumn<int>(
                name: "CategorieCCTId",
                table: "Lignes",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Agrement",
                table: "CCTs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CategorieLignes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Libelle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Code = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategorieLignes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lignes_CategorieCCTId",
                table: "Lignes",
                column: "CategorieCCTId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lignes_CategorieCCTs_CategorieCCTId",
                table: "Lignes",
                column: "CategorieCCTId",
                principalTable: "CategorieCCTs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lignes_CategorieLignes_TypeLigneId",
                table: "Lignes",
                column: "TypeLigneId",
                principalTable: "CategorieLignes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lignes_StatutLignes_StatutId",
                table: "Lignes",
                column: "StatutId",
                principalTable: "StatutLignes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lignes_CategorieCCTs_CategorieCCTId",
                table: "Lignes");

            migrationBuilder.DropForeignKey(
                name: "FK_Lignes_CategorieLignes_TypeLigneId",
                table: "Lignes");

            migrationBuilder.DropForeignKey(
                name: "FK_Lignes_StatutLignes_StatutId",
                table: "Lignes");

            migrationBuilder.DropTable(
                name: "CategorieLignes");

            migrationBuilder.DropIndex(
                name: "IX_Lignes_CategorieCCTId",
                table: "Lignes");

            migrationBuilder.DropColumn(
                name: "CategorieCCTId",
                table: "Lignes");

            migrationBuilder.AlterColumn<string>(
                name: "Agrement",
                table: "CCTs",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddForeignKey(
                name: "FK_Lignes_CategorieCCTs_TypeLigneId",
                table: "Lignes",
                column: "TypeLigneId",
                principalTable: "CategorieCCTs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lignes_StatutLignes_StatutId",
                table: "Lignes",
                column: "StatutId",
                principalTable: "StatutLignes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
