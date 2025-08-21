# Utiliser l'image officielle .NET 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Utiliser l'image SDK pour la compilation
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier les fichiers de projet
COPY ["CT_CNEH_API.csproj", "./"]
RUN dotnet restore "CT_CNEH_API.csproj"

# Copier le reste du code source
COPY . .
WORKDIR "/src/CT_CNEH_API"

# Compiler l'application
RUN dotnet build "CT_CNEH_API.csproj" -c Release -o /app/build

# Publier l'application
FROM build AS publish
RUN dotnet publish "CT_CNEH_API.csproj" -c Release -o /app/publish

# Image finale
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Créer un utilisateur non-root
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Point d'entrée
ENTRYPOINT ["dotnet", "CT_CNEH_API.dll"]
