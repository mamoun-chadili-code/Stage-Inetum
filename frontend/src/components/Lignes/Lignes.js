import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Pagination,
  Chip,
  Card,
  CardContent,
  Collapse,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ligneService from '../../services/ligneService';
import dropdownsService from '../../services/dropdownsService';
import LigneFormModal from './LigneFormModal';
import LigneDetailsModal from './LigneDetailsModal';

const Lignes = () => {
  // États principaux
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États de recherche
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchParams, setSearchParams] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    cctId: '',
    anneeDemarrage: '',
    categorieId: '',
    statutId: ''
  });

  // États de pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // États des modals
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editingLigne, setEditingLigne] = useState(null);
  const [selectedLigne, setSelectedLigne] = useState(null);

  // États des dropdowns
  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [reseaux, setReseaux] = useState([]);
  const [ccts, setCcts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [decisions, setDecisions] = useState([]);

  // États de recherche textuelle
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les données initiales
  useEffect(() => {
    loadInitialData();
  }, []);

  // Charger les données de recherche
  useEffect(() => {
    if (searchParams.regionId) {
      loadVillesByRegion(searchParams.regionId);
    }
    if (searchParams.villeId) {
      loadCCTsByVille(searchParams.villeId);
    }
  }, [searchParams.regionId, searchParams.villeId]);

  // Charger les données initiales
  const loadInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadLignes(),
        loadDropdowns()
      ]);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Charger les lignes
  const loadLignes = async () => {
    try {
      // Nettoyer les paramètres de recherche
      const cleanSearchParams = {};
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== '' && searchParams[key] !== null && searchParams[key] !== undefined) {
          cleanSearchParams[key] = searchParams[key];
        }
      });

      const searchData = {
        ...cleanSearchParams,
        page: Math.max(1, page),
        pageSize: Math.max(1, Math.min(100, pageSize)),
        searchTerm: searchTerm?.trim() || undefined
      };

      console.log('Données de recherche envoyées:', searchData);
      const result = await ligneService.searchLignes(searchData);
      setLignes(result.lignes || []);
      setTotalCount(result.totalCount || 0);
      setTotalPages(result.totalPages || 0);
    } catch (error) {
      console.error('Erreur lors du chargement des lignes:', error);
      if (error.response?.status === 400) {
        toast.error('Erreur de validation des paramètres de recherche');
      } else {
        toast.error('Erreur lors du chargement des lignes');
      }
      // En cas d'erreur, initialiser avec des valeurs par défaut
      setLignes([]);
      setTotalCount(0);
      setTotalPages(0);
    }
  };

  // Charger les dropdowns
  const loadDropdowns = async () => {
    try {
      const [regionsData, reseauxData, categoriesData, statutsData, decisionsData, cctsData] = await Promise.all([
        dropdownsService.getRegions(),
        dropdownsService.getReseaux(),
        dropdownsService.getCategories(),
        dropdownsService.getStatuts(),
        dropdownsService.getDecisions(),
        dropdownsService.getCCTs() // Charger tous les CCTs disponibles
      ]);

      setRegions(regionsData);
      setReseaux(reseauxData);
      setCategories(categoriesData);
      setStatuts(statutsData);
      setDecisions(decisionsData);
      setCcts(cctsData); // Initialiser les CCTs
    } catch (error) {
      console.error('Erreur lors du chargement des dropdowns:', error);
    }
  };

  // Charger les villes par région
  const loadVillesByRegion = async (regionId) => {
    try {
      const villesData = await dropdownsService.getVillesByRegion(regionId);
      setVilles(villesData);
      // Réinitialiser les dépendances
      setSearchParams(prev => ({
        ...prev,
        villeId: '',
        cctId: ''
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    }
  };

  // Charger les CCTs par ville
  const loadCCTsByVille = async (villeId) => {
    try {
      const cctsData = await dropdownsService.getCCTsByVille(villeId);
      setCcts(cctsData);
      // Réinitialiser les dépendances
      setSearchParams(prev => ({
        ...prev,
        cctId: ''
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des CCTs:', error);
    }
  };

  // Gérer les changements de recherche
  const handleSearchChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Lancer la recherche
  const handleSearch = () => {
    // Validation côté client
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      toast.error('Paramètres de pagination invalides');
      return;
    }
    
    setPage(1);
    loadLignes();
  };

  // Réinitialiser la recherche
  const handleClearSearch = () => {
    setSearchParams({
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      anneeDemarrage: '',
      categorieId: '',
      statutId: ''
    });
    setSearchTerm('');
    setPage(1);
    loadLignes();
  };

  // Ouvrir le modal d'ajout
  const handleAddLigne = () => {
    setEditingLigne(null);
    setFormModalOpen(true);
  };

  // Ouvrir le modal de modification
  const handleEditLigne = (ligne) => {
    setEditingLigne(ligne);
    setFormModalOpen(true);
  };

  // Ouvrir le modal de détails
  const handleViewLigne = (ligne) => {
    setSelectedLigne(ligne);
    setDetailsModalOpen(true);
  };

  // Supprimer une ligne
  const handleDeleteLigne = async (ligne) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la ligne ${ligne.numeroLigne} ?`)) {
      try {
        await ligneService.deleteLigne(ligne.id);
        toast.success('Ligne supprimée avec succès');
        loadLignes();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de la ligne');
      }
    }
  };

  // Gérer la soumission du formulaire
  const handleFormSubmit = async (ligneData) => {
    try {
      if (editingLigne) {
        await ligneService.updateLigne(editingLigne.id, ligneData);
        toast.success('Ligne mise à jour avec succès');
      } else {
        await ligneService.createLigne(ligneData);
        toast.success('Ligne créée avec succès');
      }
      
      setFormModalOpen(false);
      setEditingLigne(null);
      loadLignes();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error('Erreur lors de la sauvegarde de la ligne');
    }
  };

  // Gérer le changement de page
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Gérer le changement de taille de page
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setPage(1);
  };

  // Filtrer les lignes par terme de recherche
  const filteredLignes = useMemo(() => {
    if (!searchTerm) return lignes;
    
    return lignes.filter(ligne =>
      ligne.numeroLigne.toString().includes(searchTerm) ||
      ligne.categorieNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ligne.cctNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ligne.statutNom?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [lignes, searchTerm]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Chargement en cours...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Titre */}
      <Typography variant="h4" gutterBottom>
        Gestion des Lignes
      </Typography>

      {/* Section de recherche */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" display="flex" alignItems="center">
              <SearchIcon sx={{ mr: 1 }} />
              Q RECHERCHE
            </Typography>
            <IconButton
              onClick={() => setSearchExpanded(!searchExpanded)}
              size="small"
            >
              {searchExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={searchExpanded}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Région</InputLabel>
                  <Select
                    value={searchParams.regionId}
                    onChange={(e) => handleSearchChange('regionId', e.target.value)}
                    label="Région"
                  >
                    <MenuItem value="">Toutes les régions</MenuItem>
                    {regions.map((region) => (
                      <MenuItem key={region.id} value={region.id}>
                        {region.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Ville</InputLabel>
                  <Select
                    value={searchParams.villeId}
                    onChange={(e) => handleSearchChange('villeId', e.target.value)}
                    label="Ville"
                    disabled={!searchParams.regionId}
                  >
                    <MenuItem value="">Toutes les villes</MenuItem>
                    {villes.map((ville) => (
                      <MenuItem key={ville.id} value={ville.id}>
                        {ville.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Réseau de ralliement</InputLabel>
                  <Select
                    value={searchParams.reseauId}
                    onChange={(e) => handleSearchChange('reseauId', e.target.value)}
                    label="Réseau de ralliement"
                  >
                    <MenuItem value="">Tous les réseaux</MenuItem>
                    {reseaux.map((reseau) => (
                      <MenuItem key={reseau.id} value={reseau.id}>
                        {reseau.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>CCT</InputLabel>
                  <Select
                    value={searchParams.cctId}
                    onChange={(e) => handleSearchChange('cctId', e.target.value)}
                    label="CCT"
                    disabled={!searchParams.villeId}
                  >
                    <MenuItem value="">Tous les CCTs</MenuItem>
                    {ccts.map((cct) => (
                      <MenuItem key={cct.id} value={cct.id}>
                        {cct.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Année de démarrage"
                  type="number"
                  value={searchParams.anneeDemarrage}
                  onChange={(e) => handleSearchChange('anneeDemarrage', e.target.value)}
                  inputProps={{ min: 1900, max: 2100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={searchParams.categorieId}
                    onChange={(e) => handleSearchChange('categorieId', e.target.value)}
                    label="Catégorie"
                  >
                    <MenuItem value="">Toutes les catégories</MenuItem>
                    {categories.map((categorie) => (
                      <MenuItem key={categorie.id} value={categorie.id}>
                        {categorie.libelle || categorie.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={searchParams.statutId}
                    onChange={(e) => handleSearchChange('statutId', e.target.value)}
                    label="Statut"
                  >
                    <MenuItem value="">Tous les statuts</MenuItem>
                    {statuts.map((statut) => (
                      <MenuItem key={statut.id} value={statut.id}>
                        {statut.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  Rechercher
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClearSearch}
                >
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>

      {/* Section des lignes */}
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" display="flex" alignItems="center">
              LIGNES
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddLigne}
            >
              + Ajouter Ligne
            </Button>
          </Box>

          {/* Contrôles de pagination et recherche */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Afficher</Typography>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                size="small"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Typography>éléments</Typography>
            </Box>

            <TextField
              size="small"
              label="Rechercher:"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
            />
          </Box>

          {/* Table des lignes */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N° de ligne</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>CCT</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Date statut</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lignes.map((ligne) => (
                  <TableRow key={ligne.id}>
                    <TableCell>{ligne.numeroLigne}</TableCell>
                    <TableCell>
                      <Chip 
                        label={ligne.categorieNom || 'N/A'} 
                        color="primary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{ligne.cctNom || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip 
                        label={ligne.statutNom || 'N/A'} 
                        color="secondary" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(ligne.dateStatut).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditLigne(ligne)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteLigne(ligne)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => handleViewLigne(ligne)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography>
              Affichage de l'élément {(page - 1) * pageSize + 1} à {Math.min(page * pageSize, totalCount)} sur {totalCount} éléments
            </Typography>
            
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </CardContent>
      </Card>

      {/* Modal de formulaire */}
      <LigneFormModal
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingLigne(null);
        }}
        onSubmit={handleFormSubmit}
        ligne={editingLigne}
        categories={categories}
        ccts={ccts}
        statuts={statuts}
        decisions={decisions}
        regions={regions}
        villes={villes}
        reseaux={reseaux}
      />

      {/* Modal de détails */}
      <LigneDetailsModal
        open={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedLigne(null);
        }}
        ligne={selectedLigne}
        onEdit={() => {
          setDetailsModalOpen(false);
          setEditingLigne(selectedLigne);
          setFormModalOpen(true);
        }}
      />
    </Box>
  );
};

export default Lignes;

