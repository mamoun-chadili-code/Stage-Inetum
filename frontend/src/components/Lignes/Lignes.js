import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ligneService from '../../services/ligneService';
import dropdownsService from '../../services/dropdownsService';
import geographieService from '../../services/geographieService';
import LigneFormModal from './LigneFormModal';
import LigneDetailsModal from './LigneDetailsModal';
import SearchableSelect from '../common/SearchableSelect';
import SearchSection from '../common/SearchSection';

const Lignes = () => {
  // États principaux
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États de recherche
  const [searchParams, setSearchParams] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    cctId: '',
    anneeDemarrage: ''
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

  // Charger les données au démarrage
  useEffect(() => {
    console.log('🚀 === DÉMARRAGE DU COMPOSANT LIGNES ===');
    
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Charger tous les dropdowns indépendamment
        await Promise.all([
          loadRegions(),
          loadReseaux(),
          loadCategories(),
          loadStatuts(),
          loadDecisions(),
          loadVilles(),
          loadCCTs()
        ]);
        
        // Charger les lignes initiales
        await loadLignes();
        
        console.log('✅ Tous les dropdowns chargés indépendamment');
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
        console.log('✅ État loading mis à false');
      }
    };
    
    initializeData();
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

  // Charger les régions
  const loadRegions = async () => {
    try {
      const regionsData = await dropdownsService.getRegions();
      setRegions(regionsData);
    } catch (error) {
      console.error('Erreur lors du chargement des régions:', error);
    }
  };

  // Charger les réseaux
  const loadReseaux = async () => {
    try {
      const reseauxData = await dropdownsService.getReseaux();
      setReseaux(reseauxData);
    } catch (error) {
      console.error('Erreur lors du chargement des réseaux:', error);
    }
  };

  // Charger les catégories
  const loadCategories = async () => {
    try {
      const categoriesData = await dropdownsService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  // Charger les statuts
  const loadStatuts = async () => {
    try {
      const statutsData = await dropdownsService.getStatuts();
      setStatuts(statutsData);
    } catch (error) {
      console.error('Erreur lors du chargement des statuts:', error);
    }
  };

  // Charger les décisions
  const loadDecisions = async () => {
    try {
      const decisionsData = await dropdownsService.getDecisions();
      setDecisions(decisionsData);
    } catch (error) {
      console.error('Erreur lors du chargement des décisions:', error);
    }
  };

  // Charger les villes (toutes, sans filtrage par région)
  const loadVilles = async () => {
    try {
      console.log('🚀 === CHARGEMENT DE TOUTES LES VILLES ===');
      
      // Récupérer toutes les villes depuis l'API
      const allVilles = await geographieService.getVillesByRegion();
      console.log('📊 Toutes les villes récupérées:', allVilles.length);
      
      setVilles(allVilles);
      console.log('✅ Toutes les villes mises à jour dans l\'état');
      
    } catch (error) {
      console.error('❌ ERREUR lors du chargement des villes:', error);
      setVilles([]);
    }
  };

  // Charger les CCTs (tous, sans filtrage par ville)
  const loadCCTs = async () => {
    try {
      console.log('🚀 === CHARGEMENT DE TOUS LES CCTs ===');
      
      // Récupérer tous les CCTs depuis l'API
      const allCCTs = await dropdownsService.getCCTs();
      console.log('📊 Tous les CCTs récupérés:', allCCTs.length);
      
      setCcts(allCCTs);
      console.log('✅ Tous les CCTs mis à jour dans l\'état');
      
    } catch (error) {
      console.error('❌ ERREUR lors du chargement des CCTs:', error);
      setCcts([]);
    }
  };

  // ✅ SUPPRIMÉ : loadVillesByRegion - Plus de dépendance
  // ✅ SUPPRIMÉ : loadCCTsByVille - Plus de dépendance

  // Gérer les changements dans les champs de recherche
  const handleSearchChange = (field, value) => {
    console.log(`🔄 === CHANGEMENT DE ${field} ===`);
    console.log('Valeur sélectionnée:', value);
    console.log('Type de valeur:', typeof value);
    console.log('Anciens paramètres:', searchParams);
    
    // Mettre à jour les paramètres de recherche
    const newParams = {
      ...searchParams,
      [field]: value
    };
    
    console.log('Nouveaux paramètres:', newParams);
    setSearchParams(newParams);
    
    // ✅ SIMPLE : Pas de dépendance, pas de chargement automatique
    console.log(`✅ ${field} mis à jour, aucune dépendance`);
    console.log(`=== FIN CHANGEMENT DE ${field} ===`);
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

  // Réinitialiser les filtres
  const clearFilters = () => {
    setSearchParams({
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      anneeDemarrage: ''
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

  // Fonction pour obtenir la couleur basée sur la catégorie
  const getCategorieColor = (categorieText) => {
    const text = (categorieText || '').toLowerCase();
    
    if (text.includes('véhicules légers') || text.includes('vl')) {
      return '#84D189'; // Vert personnalisé pour véhicules légers
    } else if (text.includes('poids lourds') || text.includes('pl')) {
      return '#ED6345'; // Rouge personnalisé pour poids lourds
    } else if (text.includes('motocycles') || text.includes('moto')) {
      return '#90C6DE'; // Bleu personnalisé pour motocycles
    } else if (text.includes('toute catégorie') || text.includes('polyvalente')) {
      return '#ED934E'; // Orange personnalisé pour toute catégorie
    }
    return '#9c27b0'; // Violet par défaut
  };

  // Récupérer la catégorie actuelle depuis les données CategorieLignes
  const getLigneCategorie = (ligne) => {
    if (!ligne.categorieId || !categories.length) {
      return { libelle: ligne.categorieNom || 'N/A', description: null };
    }
    
    const categorie = categories.find(cat => cat.id === ligne.categorieId);
    return categorie || { libelle: ligne.categorieNom || 'N/A', description: null };
  };

  // Gérer le changement de taille de page
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setPage(1);
  };

  // Filtrer les lignes par terme de recherche
  const filteredLignes = lignes.filter(ligne =>
    ligne.numeroLigne.toString().includes(searchTerm) ||
    ligne.categorieNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ligne.cctNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ligne.statutNom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <SearchSection title="RECHERCHE">
        {/* Section de recherche avec tous les champs sur une seule ligne */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(6, 1fr)', 
            gap: 2, 
            alignItems: 'start' 
          }}>
                <SearchableSelect
                  label="Région"
                  value={searchParams.regionId}
                  onChange={(value) => handleSearchChange('regionId', value)}
                  options={regions}
                  getOptionLabel={(option) => option.libelle || option.nom}
                  getOptionValue={(option) => option.id}
                  placeholder="Toutes les régions"
                  sx={{ width: '100%' }}
                />

                <SearchableSelect
                  label="Ville"
                  value={searchParams.villeId}
                  onChange={(value) => handleSearchChange('villeId', value)}
                  options={villes}
                  getOptionLabel={(option) => option.nom || option.libelle}
                  getOptionValue={(option) => option.id}
                  placeholder="Toutes les villes"
                  sx={{ width: '100%' }}
                />

                <SearchableSelect
                  label="Réseau de ralliement"
                  value={searchParams.reseauId}
                  onChange={(value) => handleSearchChange('reseauId', value)}
                  options={reseaux}
                  getOptionLabel={(option) => option.nom || option.libelle}
                  getOptionValue={(option) => option.id}
                  placeholder="Tous les réseaux"
                  sx={{ width: '100%' }}
                />

                <SearchableSelect
                  label="CCT"
                  value={searchParams.cctId}
                  onChange={(value) => handleSearchChange('cctId', value)}
                  options={ccts}
                  getOptionLabel={(option) => option.nom || option.libelle}
                  getOptionValue={(option) => option.id}
                  placeholder="Tous les CCTs"
                  sx={{ width: '100%' }}
                />

                <SearchableSelect
                  label="Catégorie"
                  value={searchParams.categorieId}
                  onChange={(value) => handleSearchChange('categorieId', value)}
                  options={categories}
                  getOptionLabel={(option) => option.libelle || option.nom}
                  getOptionValue={(option) => option.id}
                  placeholder="Toutes les catégories"
                  showDescriptions={true}
                  isCategorieField={true}
                  sx={{ width: '100%' }}
                />

                <TextField
                  sx={{ 
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      height: '56px', // Même hauteur exacte que SearchableSelect
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.23)', // Même bordure
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.87)', // Même hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2', // Même focus
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.875rem', // Même taille de label
                      color: 'rgba(0, 0, 0, 0.6)', // Même couleur
                      '&.Mui-focused': {
                        color: '#1976d2' // Même couleur au focus
                      }
                    },
                    '& .MuiInputBase-input': {
                      padding: '16.5px 14px', // Même padding que SearchableSelect
                      fontSize: '0.875rem' // Même taille de police
                    }
                  }}
                  size="small"
                  label="Année de démarrage"
                  type="number"
                  value={searchParams.anneeDemarrage}
                  onChange={(e) => handleSearchChange('anneeDemarrage', e.target.value)}
                  inputProps={{ min: 1900, max: 2100 }}
                  placeholder="Année"
                  margin="dense"
                  fullWidth={true}
                />
              </Box>

            {/* Boutons d'action */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 2 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ minWidth: 120 }}
              >
                RECHERCHER
              </Button>
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={clearFilters}
                sx={{ minWidth: 120 }}
              >
                ANNULER
              </Button>
            </Box>
          </Box>
        </SearchSection>

      {/* Section des lignes */}
      <Paper>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" display="flex" alignItems="center">
            LIGNES
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddLigne}
          >
            Ajouter Ligne
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
              {lignes.map((ligne) => {
                const ligneCategorie = getLigneCategorie(ligne);
                const categorieColor = getCategorieColor(ligneCategorie.libelle);
                
                return (
                  <TableRow key={ligne.id}>
                    <TableCell>{ligne.numeroLigne}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        {/* Point coloré */}
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: categorieColor,
                            flexShrink: 0,
                            border: '1px solid rgba(0,0,0,0.1)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                          }}
                        />
                        {/* Texte simple au lieu du Chip */}
                        <Typography variant="body2">
                          {ligneCategorie.libelle}
                        </Typography>
                      </Box>
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
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  </TableRow>
                );
              })}
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
      </Paper>

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
        categories={categories}
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

