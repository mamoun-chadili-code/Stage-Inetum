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
  Pagination,
  FormControl
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FirstPage as FirstPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  LastPage as LastPageIcon
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
  const [pageSize, setPageSize] = useState(5); // Changé de 10 à 5
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

  // ✅ SUPPRIMÉ : loadVillesByRegion et loadCCTsByVille - Plus de dépendance

  // Charger les lignes avec des paramètres spécifiques
  const loadLignesWithParams = async (specificPage, specificPageSize) => {
    try {
      console.log('🔄 Chargement des lignes avec paramètres spécifiques:', { specificPage, specificPageSize, searchParams });
      
      // Nettoyer les paramètres de recherche
      const cleanSearchParams = {};
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== '' && searchParams[key] !== null && searchParams[key] !== undefined) {
          cleanSearchParams[key] = searchParams[key];
        }
      });

      const searchData = {
        ...cleanSearchParams,
        page: Math.max(1, specificPage),
        pageSize: Math.max(1, Math.min(100, specificPageSize)),
        searchTerm: searchTerm?.trim() || undefined
      };

      console.log('Données de recherche envoyées:', searchData);
      const result = await ligneService.searchLignes(searchData);
      console.log('📊 Résultat de la recherche:', result);
      setLignes(result.lignes || []);
      setTotalCount(result.totalCount || 0);
      setTotalPages(result.totalPages || 0);
      console.log('📋 Pagination mise à jour:', { 
        lignes: result.lignes?.length || 0, 
        totalCount: result.totalCount || 0, 
        totalPages: result.totalPages || 0,
        page: specificPage,
        pageSize: specificPageSize
      });
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

  // Charger les lignes (fonction originale pour compatibilité)
  const loadLignes = async () => {
    await loadLignesWithParams(page, pageSize);
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

  // Charger les statuts des lignes
  const loadStatuts = async () => {
    try {
      const statutsData = await dropdownsService.getStatutLignes();
      setStatuts(statutsData);
    } catch (error) {
      console.error('Erreur lors du chargement des statuts de lignes:', error);
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
    console.log('🔄 Changement de page:', { oldPage: page, newPage });
    setPage(newPage);
    // Recharger les données avec la nouvelle page
    loadLignesWithParams(newPage, pageSize);
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

  // Fonction pour obtenir la couleur basée sur le statut de ligne
  const getStatutLigneColor = (statutText) => {
    const text = (statutText || '').toLowerCase();
    
    if (text.includes('activité') || text.includes('active')) {
      return '#4caf50'; // Vert pour actif
    } else if (text.includes('suspendue') || text.includes('suspendu')) {
      return '#ff9800'; // Orange pour suspendu
    } else if (text.includes('maintenance')) {
      return '#2196f3'; // Bleu pour maintenance
    } else if (text.includes('fermée') || text.includes('fermé') || text.includes('definitivement')) {
      return '#f44336'; // Rouge pour fermé
    } else if (text.includes('ouverture') || text.includes('cours')) {
      return '#ffeb3b'; // Jaune pour en cours d'ouverture
    }
    return '#9e9e9e'; // Gris par défaut
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
    const newPageSize = parseInt(event.target.value);
    console.log('📏 Changement de taille de page:', { oldSize: pageSize, newSize: newPageSize });
    setPageSize(newPageSize);
    setPage(1);
    // Recharger les données avec la nouvelle taille de page
    loadLignesWithParams(1, newPageSize);
  };

  // Filtrer les lignes par terme de recherche
  const filteredLignes = lignes.filter(ligne =>
    ligne.numeroLigne.toString().includes(searchTerm) ||
    ligne.categorieNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ligne.cctNom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ligne.statutNom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction de test de pagination
  const testPagination = () => {
    console.log('🧪 TEST PAGINATION:', {
      page,
      pageSize,
      totalCount,
      totalPages,
      lignesCount: lignes.length,
      filteredCount: filteredLignes.length
    });
  };

  // Appeler le test au chargement
  useEffect(() => {
    testPagination();
  }, [page, pageSize, totalCount, totalPages, lignes.length]);

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
      {/* Titre principal centré */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        pt: 2,
        pb: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            color: '#1976d2', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Gestion des Lignes
        </Typography>
      </Box>

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
          
          <Box display="flex" alignItems="center" gap={2}>
            {/* Sélecteur d'éléments par page */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Éléments par page :
              </Typography>
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddLigne}
            >
              Ajouter Ligne
            </Button>
          </Box>
        </Box>

        {/* Barre de recherche */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
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
          <Table sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
            <TableHead>
                          <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>N° de ligne</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Catégorie</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date statut</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
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
                    <Box display="flex" alignItems="center" gap={1}>
                      {/* Point coloré pour le statut */}
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: getStatutLigneColor(ligne.statutNom),
                          flexShrink: 0,
                          border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      />
                      {/* Texte du statut */}
                      <Typography variant="body2">
                        {ligne.statutNom || 'N/A'}
                      </Typography>
                    </Box>
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

        {/* Pagination avec style personnalisé */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          mt: 3,
          p: 2,
          backgroundColor: '#f8f9fa',
          borderRadius: 2,
          border: '1px solid #e0e0e0'
        }}>


          {/* Navigation de pagination personnalisée centrée */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {/* Bouton première page */}
              <IconButton
                onClick={() => handlePageChange(null, 1)}
                disabled={page === 1}
                sx={{
                  color: page === 1 ? '#bdbdbd' : '#1976d2',
                  '&:hover': {
                    backgroundColor: page === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <FirstPageIcon />
              </IconButton>

              {/* Bouton page précédente */}
              <IconButton
                onClick={() => handlePageChange(null, page - 1)}
                disabled={page === 1}
                sx={{
                  color: page === 1 ? '#bdbdbd' : '#1976d2',
                  '&:hover': {
                    backgroundColor: page === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              {/* Numéros de page */}
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (page <= 2) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 1) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = page - 1 + i;
                }

                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <IconButton
                      key={pageNum}
                      onClick={() => handlePageChange(null, pageNum)}
                      sx={{
                        backgroundColor: page === pageNum ? '#1976d2' : 'transparent',
                        color: page === pageNum ? 'white' : '#424242',
                        minWidth: 36,
                        height: 36,
                        fontSize: '0.875rem',
                        '&:hover': {
                          backgroundColor: page === pageNum ? '#1976d2' : 'rgba(25, 118, 210, 0.1)'
                        }
                      }}
                    >
                      {pageNum}
                    </IconButton>
                  );
                }
                return null;
              })}

              {/* Bouton page suivante */}
              <IconButton
                onClick={() => handlePageChange(null, page + 1)}
                disabled={page >= totalPages}
                sx={{
                  color: page >= totalPages ? '#bdbdbd' : '#1976d2',
                  '&:hover': {
                    backgroundColor: page >= totalPages ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Bouton dernière page */}
              <IconButton
                onClick={() => handlePageChange(null, totalPages)}
                disabled={page >= totalPages}
                sx={{
                  color: page >= totalPages ? '#bdbdbd' : '#1976d2',
                  '&:hover': {
                    backgroundColor: page >= totalPages ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                <LastPageIcon />
              </IconButton>
            </Box>
          )}

          {/* Informations d'affichage en dessous */}
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Affichage de {((page - 1) * pageSize) + 1} à {Math.min(page * pageSize, totalCount)} sur {totalCount} lignes
          </Typography>
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

