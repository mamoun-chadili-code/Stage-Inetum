import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchableSelect from '../common/SearchableSelect';
import LigneFormModal from './LigneFormModal';
import LigneDetailsModal from './LigneDetailsModal';
import cctService from '../../services/cctService';
import { reseauxService } from '../../services/reseauxService';
import { dropdownsService } from '../../services/dropdownsService';
import { lignesService } from '../../services/lignesService';
import api from '../../services/api';

export default function Lignes() {
  const [lignes, setLignes] = useState([]);
  const [filteredLignes, setFilteredLignes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [editingLigne, setEditingLigne] = useState(null);
  const [selectedLigne, setSelectedLigne] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ligneToDelete, setLigneToDelete] = useState(null);
  const [dropdowns, setDropdowns] = useState({
    regions: [],
    villes: [],
    reseaux: [],
    ccts: [],
    categories: [],
    statuts: []
  });
  const [filters, setFilters] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    cctId: '',
    anneeDemarrage: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 5,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDropdowns();
    loadLignes();
  }, []);

  useEffect(() => {
    // Ne pas appliquer les filtres au chargement initial
    if (lignes.length > 0) {
      applyFilters();
    }
  }, [filters, searchTerm, lignes]);

  const loadDropdowns = async () => {
    try {
      setLoading(true);
      
      console.log('=== CHARGEMENT DROPDOWNS ===');
      
      // Charger les CCTs depuis le service CCT
      const cctsData = await cctService.getAllCCTs();
      console.log('CCTs chargés:', cctsData);
      
      // Charger les réseaux depuis le service réseaux
      const reseauxData = await reseauxService.getAllReseaux();
      console.log('Réseaux chargés:', reseauxData);
      
      // Charger les régions, villes, catégories et statuts depuis le service dropdowns
      const regionsData = dropdownsService.MOCK_REGIONS;
      const villesData = dropdownsService.MOCK_VILLES;
      
      // Charger les vraies catégories et statuts depuis la base de données
      const categoriesData = await dropdownsService.loadCategoriesFromDB();
      const statutsData = await dropdownsService.loadStatutsFromDB();
      
      console.log('Données mock chargées:', {
        regions: regionsData,
        villes: villesData,
        categories: categoriesData,
        statuts: statutsData
      });

      setDropdowns({
        regions: regionsData || [],
        villes: villesData || [],
        reseaux: reseauxData || [],
        ccts: cctsData || [],
        categories: categoriesData || [],
        statuts: statutsData || []
      });

      console.log('Dropdowns chargés depuis les vrais services:', {
        regions: regionsData?.length || 0,
        villes: villesData?.length || 0,
        reseaux: reseauxData?.length || 0,
        ccts: cctsData?.length || 0,
        categories: categoriesData?.length || 0,
        statuts: statutsData?.length || 0
      });

    } catch (error) {
      console.error('Erreur lors du chargement des dropdowns:', error);
      
      // En cas d'erreur, utiliser des données de fallback minimales
      setDropdowns({
        regions: dropdownsService.MOCK_REGIONS,
        villes: dropdownsService.MOCK_VILLES,
        reseaux: [],
        ccts: [],
        categories: dropdownsService.MOCK_CATEGORIES,
        statuts: dropdownsService.MOCK_STATUTS
      });
    } finally {
      setLoading(false);
    }
  };

  const loadLignes = async () => {
    try {
      setLoading(true);
      const data = await lignesService.getAllLignes();
      console.log('🚨 === STRUCTURE DES DONNÉES REÇUES ===');
      console.log('🚨 Données brutes reçues:', data);
      if (data && data.length > 0) {
        console.log('🚨 Première ligne:', data[0]);
        console.log('🚨 Clés de la première ligne:', Object.keys(data[0]));
        console.log('🚨 Types des valeurs:', {
          id: typeof data[0].id,
          numLigne: typeof data[0].numLigne,
          numeroLigne: typeof data[0].numeroLigne,
          cctId: typeof data[0].cctId,
          cct: typeof data[0].cct,
          typeLigneId: typeof data[0].typeLigneId,
          categorieId: typeof data[0].categorieId,
          categorie: typeof data[0].categorie,
          statutId: typeof data[0].statutId,
          statut: typeof data[0].statut,
          dateStatut: typeof data[0].dateStatut
        });
      }
      setLignes(data || []);
      setFilteredLignes(data || []); // Ajouter cette ligne
    } catch (error) {
      console.error('🚨 Erreur lors du chargement des lignes:', error);
      
      // En cas d'erreur, essayer de récupérer au moins les lignes de base
      try {
        console.log('🚨 Tentative de récupération des lignes de base...');
        const lignesResponse = await api.get('/Lignes');
        const lignesDeBase = lignesResponse.data || [];
        console.log('🚨 Lignes de base récupérées:', lignesDeBase);
        
        setLignes(lignesDeBase);
        setFilteredLignes(lignesDeBase);
        
        toast.warning('Lignes chargées sans données liées (CCT, Catégorie, Statut)');
      } catch (fallbackError) {
        console.error('🚨 Erreur même pour le fallback:', fallbackError);
        toast.error('Erreur lors du chargement des lignes');
        setLignes([]);
        setFilteredLignes([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const applyFilters = () => {
    console.log('Application des filtres:', { filters, searchTerm, lignes });
    
    let filtered = [...lignes];

    // Filtrage par critères
    if (filters.regionId) {
      const region = dropdowns.regions.find(r => r.id === filters.regionId);
      if (region) {
        filtered = filtered.filter(l => l.region === region.libelle);
        console.log('Filtrage par région:', region.libelle, 'Résultat:', filtered);
      }
    }

    if (filters.villeId) {
      const ville = dropdowns.villes.find(v => v.id === filters.villeId);
      if (ville) {
        filtered = filtered.filter(l => l.ville === ville.nom);
        console.log('Filtrage par ville:', ville.nom, 'Résultat:', filtered);
      }
    }

    if (filters.reseauId) {
      const reseau = dropdowns.reseaux.find(r => r.id === filters.reseauId);
      if (reseau) {
        filtered = filtered.filter(l => l.reseau === reseau.nom);
        console.log('Filtrage par réseau:', reseau.nom, 'Résultat:', filtered);
      }
    }

    if (filters.cctId) {
      const cct = dropdowns.ccts.find(c => c.id === filters.cctId);
      if (cct) {
        filtered = filtered.filter(l => l.cct === cct.nom);
        console.log('Filtrage par CCT:', cct.nom, 'Résultat:', filtered);
      }
    }

    if (filters.anneeDemarrage) {
      filtered = filtered.filter(l => l.dateStatut.includes(filters.anneeDemarrage));
      console.log('Filtrage par année:', filters.anneeDemarrage, 'Résultat:', filtered);
    }

    // Recherche textuelle
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(l => 
        l.numLigne.toString().includes(term) ||
        (l.categorie && l.categorie.toLowerCase().includes(term)) ||
        (l.cct && l.cct.toLowerCase().includes(term)) ||
        (l.statut && l.statut.toLowerCase().includes(term)) ||
        (l.dateStatut && l.dateStatut.includes(term))
      );
      console.log('Recherche textuelle:', searchTerm, 'Résultat:', filtered);
    }

    console.log('Lignes filtrées finales:', filtered);
    setFilteredLignes(filtered);
    setPagination(prev => ({ ...prev, totalItems: filtered.length, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      regionId: '',
      villeId: '',
      reseauId: '',
      cctId: '',
      anneeDemarrage: ''
    });
    setSearchTerm('');
    setFilteredLignes(lignes);
    setPagination(prev => ({ ...prev, totalItems: lignes.length, currentPage: 1 }));
  };

  const handleAddLigne = () => {
    setEditingLigne(null);
    setOpenFormModal(true);
  };

  const handleEditLigne = (ligne) => {
    console.log('🚨 === STRUCTURE COMPLÈTE DE LA LIGNE ===');
    console.log('🚨 Ligne complète:', ligne);
    console.log('🚨 Tous les champs:', Object.keys(ligne));
    console.log('🚨 Valeurs des champs:', {
      id: ligne.id,
      numeroLigne: ligne.numeroLigne,
      cctId: ligne.cctId,
      typeLigneId: ligne.typeLigneId,
      categorieId: ligne.categorieId,
      statutId: ligne.statutId,
      dateStatut: ligne.dateStatut
    });

    // Préparer les données pour l'édition avec les IDs corrects
    const lignePourEdition = {
      id: ligne.id,
      cctId: '', // À remplir avec l'ID correspondant
      numLigne: ligne.numLigne,
      categorieId: '', // À remplir avec l'ID correspondant
      statutId: '', // À remplir avec l'ID correspondant
      dateStatut: ligne.dateStatut
    };

    // Trouver les IDs correspondants dans les dropdowns
    console.log('🚨 === RECHERCHE DES IDs CORRESPONDANTS ===');
    console.log('🚨 Dropdowns disponibles:', {
      ccts: dropdowns.ccts?.length || 0,
      categories: dropdowns.categories?.length || 0,
      statuts: dropdowns.statuts?.length || 0
    });
    
    // Recherche CCT
    const cctTrouve = dropdowns.ccts?.find(c => c.nom === ligne.cct);
    console.log('🚨 Recherche CCT:', {
      valeurLigne: ligne.cct,
      cctTrouve: cctTrouve ? { id: cctTrouve.id, nom: cctTrouve.nom } : null,
      tousCCTs: dropdowns.ccts?.map(c => ({ id: c.id, nom: c.nom }))
    });
    
    // Recherche Catégorie
    const categorieTrouvee = dropdowns.categories?.find(c => c.libelle === ligne.categorie);
    console.log('🚨 Recherche Catégorie:', {
      valeurLigne: ligne.categorie,
      categorieTrouvee: categorieTrouvee ? { id: categorieTrouvee.id, libelle: categorieTrouvee.libelle } : null,
      toutesCategories: dropdowns.categories?.map(c => ({ id: c.id, libelle: c.libelle }))
    });
    
    // Recherche Statut
    const statutTrouve = dropdowns.statuts?.find(s => s.libelle === ligne.statut);
    console.log('🚨 Recherche Statut:', {
      valeurLigne: ligne.statut,
      statutTrouve: statutTrouve ? { id: statutTrouve.id, libelle: statutTrouve.libelle } : null,
      tousStatuts: dropdowns.statuts?.map(s => ({ id: s.id, libelle: s.libelle }))
    });
    
    // Debug supplémentaire pour la catégorie
    if (!categorieTrouvee) {
      console.warn('⚠️ === CATÉGORIE NON TROUVÉE ===');
      console.warn('⚠️ Valeur recherchée:', ligne.categorie);
      console.warn('⚠️ Type de la valeur:', typeof ligne.categorie);
      console.warn('⚠️ Catégories disponibles:', dropdowns.categories?.map(c => c.libelle));
      console.warn('⚠️ Correspondance exacte:', dropdowns.categories?.some(c => c.libelle === ligne.categorie));
      console.warn('⚠️ Correspondance insensible à la casse:', dropdowns.categories?.some(c => c.libelle.toLowerCase() === ligne.categorie?.toLowerCase()));
      
      // Essayer de trouver une correspondance partielle
      const correspondancePartielle = dropdowns.categories?.find(c => 
        c.libelle.toLowerCase().includes(ligne.categorie?.toLowerCase()) ||
        ligne.categorie?.toLowerCase().includes(c.libelle.toLowerCase())
      );
      
      if (correspondancePartielle) {
        console.warn('⚠️ Correspondance partielle trouvée:', correspondancePartielle);
        lignePourEdition.categorieId = correspondancePartielle.id;
      }
    }
    
    // Assigner les IDs trouvés
    if (cctTrouve) {
      lignePourEdition.cctId = cctTrouve.id;
      console.log('🚨 CCT ID assigné:', cctTrouve.id);
    } else {
      console.warn('⚠️ CCT non trouvé pour:', ligne.cct);
    }
    
    if (categorieTrouvee) {
      lignePourEdition.categorieId = categorieTrouvee.id;
      console.log('🚨 Catégorie ID assigné:', categorieTrouvee.id);
    } else {
      console.warn('⚠️ Catégorie non trouvée pour:', ligne.categorie);
    }
    
    if (statutTrouve) {
      lignePourEdition.statutId = statutTrouve.id;
      console.log('🚨 Statut ID assigné:', statutTrouve.id);
    } else {
      console.warn('⚠️ Statut non trouvé pour:', ligne.statut);
    }
    
    console.log('🚨 Données préparées pour édition:', lignePourEdition);
    setEditingLigne(lignePourEdition);
    setOpenFormModal(true);
  };

  const handleDeleteLigne = (ligne) => {
    setLigneToDelete(ligne);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (ligneToDelete) {
      try {
        setLoading(true);
        
        // Supprimer la ligne depuis l'API backend
        await lignesService.deleteLigne(ligneToDelete.id);
        
        // Mettre à jour l'état local
        const updatedLignes = lignes.filter(l => l.id !== ligneToDelete.id);
        setLignes(updatedLignes);
        setFilteredLignes(updatedLignes);
        setPagination(prev => ({ ...prev, totalItems: updatedLignes.length }));
        
        toast.success(`Ligne ${ligneToDelete.numLigne} supprimée avec succès`);
        console.log('Ligne supprimée:', ligneToDelete);
        
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de la ligne');
      } finally {
        setLoading(false);
        setDeleteDialogOpen(false);
        setLigneToDelete(null);
      }
    }
  };

  const handleViewDetails = (ligne) => {
    setSelectedLigne(ligne);
    setOpenDetailsModal(true);
  };

  const handleFormSubmit = async (ligneData) => {
    try {
      setLoading(true);
      
      console.log('🚨 === DÉBOGAGE SOUMISSION FORMULAIRE ===');
      console.log('🚨 Données reçues du formulaire:', ligneData);
      console.log('🚨 Dropdowns disponibles:', {
        ccts: dropdowns.ccts?.length || 0,
        categories: dropdowns.categories?.length || 0,
        statuts: dropdowns.statuts?.length || 0
      });
      
      // Vérifier que les IDs existent dans les dropdowns
      const cctExists = dropdowns.ccts?.find(c => c.id === ligneData.cctId);
      const categorieExists = dropdowns.categories?.find(c => c.id === ligneData.categorieId);
      const statutExists = dropdowns.statuts?.find(s => s.id === ligneData.statutId);
      
      console.log('🚨 Vérification de l\'existence des IDs:', {
        cctExists: !!cctExists,
        categorieExists: !!categorieExists,
        statutExists: !!statutExists
      });
      
      // Validation détaillée des catégories
      if (!categorieExists) {
        console.error('🚨 === ERREUR CATÉGORIE ===');
        console.error('🚨 ID de catégorie invalide:', ligneData.categorieId);
        console.error('🚨 Catégories disponibles:', dropdowns.categories?.map(c => ({ id: c.id, libelle: c.libelle })));
        throw new Error(`Catégorie avec l'ID ${ligneData.categorieId} n'existe pas. Catégories disponibles: ${dropdowns.categories?.map(c => c.libelle).join(', ')}`);
      }
      
      if (!cctExists || !categorieExists || !statutExists) {
        throw new Error('Un ou plusieurs IDs sélectionnés n\'existent pas dans les données disponibles');
      }
      
      // Préparer les données à envoyer (garder les IDs)
      const processedData = {
        numeroLigne: ligneData.numeroLigne,
        cctId: ligneData.cctId,
        categorieId: ligneData.categorieId, // Le service convertira en typeLigneId
        statutId: ligneData.statutId,
        dateStatut: ligneData.dateStatut
      };
      
      console.log('🚨 Données à envoyer (avec IDs):', processedData);
      console.log('🚨 Types des données:', {
        numeroLigne: typeof processedData.numeroLigne,
        cctId: typeof processedData.cctId,
        categorieId: typeof processedData.categorieId,
        statutId: typeof processedData.statutId,
        dateStatut: typeof processedData.dateStatut
      });
      
      if (editingLigne) {
        // Modification
        console.log('🚨 Mode MODIFICATION - ID:', editingLigne.id);
        
        // Inclure l'ID dans les données pour la modification
        const modificationData = {
          id: editingLigne.id, // ← Ajouter l'ID !
          ...processedData
        };
        
        await lignesService.updateLigne(editingLigne.id, modificationData);
        setEditingLigne(null);
        toast.success(`Ligne ${ligneData.numeroLigne} modifiée avec succès`);
        console.log('🚨 Ligne modifiée:', modificationData);
        
      } else {
        // Ajout
        console.log('🚨 Mode AJOUT');
        await lignesService.createLigne(processedData);
        toast.success(`Nouvelle ligne ${ligneData.numeroLigne} ajoutée avec succès`);
        console.log('🚨 Nouvelle ligne ajoutée:', processedData);
      }
      
      // Recharger les lignes et fermer le modal
      await loadLignes();
      setOpenFormModal(false);
      
    } catch (error) {
      console.error('🚨 Erreur lors de la soumission:', error);
      toast.error(error.message || 'Erreur lors de la sauvegarde de la ligne');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
    setEditingLigne(null);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedLigne(null);
  };

  // Calcul des lignes à afficher pour la pagination
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const currentLignes = filteredLignes.slice(startIndex, endIndex);

  return (
    <Box sx={{ p: 3 }}>
      {/* Toast Container pour les notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Titre principal */}
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          color: '#1976d2', 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        📋 Gestion des Lignes
      </Typography>

      {/* Section Recherche - Style identique au module CCT */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Région"
              value={filters.regionId}
              onChange={(value) => handleFilterChange('regionId', value)}
              options={[{ id: '', libelle: 'Toutes' }, ...dropdowns.regions]}
              placeholder="Rechercher une région..."
              getOptionLabel={(option) => option.libelle}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Ville"
              value={filters.villeId}
              onChange={(value) => handleFilterChange('villeId', value)}
              options={[{ id: '', nom: 'Toutes' }, ...dropdowns.villes]}
              placeholder="Rechercher une ville..."
              getOptionLabel={(option) => option.nom}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Réseau"
              value={filters.reseauId}
              onChange={(value) => handleFilterChange('reseauId', value)}
              options={[{ id: '', nom: 'Tous' }, ...dropdowns.reseaux]}
              placeholder="Rechercher un réseau..."
              getOptionLabel={(option) => option.nom}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="CCT"
              value={filters.cctId || ''}
              onChange={(value) => handleFilterChange('cctId', value)}
              options={[{ id: '', nom: 'Tous' }, ...dropdowns.ccts]}
              placeholder="Rechercher un CCT..."
              getOptionLabel={(option) => option.nom}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <TextField
              fullWidth
              size="small"
              label="Année de démarrage"
              value={filters.anneeDemarrage}
              onChange={(e) => handleFilterChange('anneeDemarrage', e.target.value)}
              type="number"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={applyFilters}
              fullWidth
            >
              Filtrer
            </Button>
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              fullWidth
            >
              Réinitialiser
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Barre d'actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Rechercher par numéro, catégorie, CCT ou statut..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddLigne}
        >
          Nouvelle Ligne
        </Button>
      </Box>

      {/* Section Lignes - Style compact comme CCT */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        {/* En-tête de la section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1976d2', 
              fontWeight: 'bold'
            }}
          >
            Liste des Lignes
          </Typography>
          
          {/* Chips d'information */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label={`${filteredLignes.length} Lignes au total`} 
              size="small" 
              sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
            />
            <Chip 
              label={`Page ${pagination.currentPage}/${Math.ceil(filteredLignes.length / pagination.pageSize) || 1}`} 
              size="small" 
              sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
            />
          </Box>
        </Box>

        {/* Table des lignes */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>N° Ligne</strong></TableCell>
                <TableCell><strong>CCT</strong></TableCell>
                <TableCell><strong>Catégorie</strong></TableCell>
                <TableCell><strong>Statut</strong></TableCell>
                <TableCell><strong>Date Statut</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLignes.map((ligne) => (
                <TableRow key={ligne.id} hover>
                  <TableCell>
                    {ligne.numLigne || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {ligne.cct || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {ligne.categorie || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {ligne.statut || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {ligne.dateStatut ? 
                      new Date(ligne.dateStatut).toLocaleDateString('fr-FR') : 
                      'N/A'
                    }
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Modifier">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditLigne(ligne)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Voir détails">
                        <IconButton 
                          size="small" 
                          color="info"
                          onClick={() => setSelectedLigne(ligne)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Debug - Voir structure des données">
                        <IconButton 
                          size="small" 
                          color="warning"
                          onClick={() => {
                            console.log('🚨 === STRUCTURE COMPLÈTE DE LA LIGNE ===');
                            console.log('🚨 Ligne complète:', ligne);
                            console.log('🚨 Tous les champs:', Object.keys(ligne));
                            console.log('🚨 Valeurs des champs:', {
                              id: ligne.id,
                              numLigne: ligne.numLigne,
                              cct: ligne.cct,
                              categorie: ligne.categorie,
                              statut: ligne.statut,
                              dateStatut: ligne.dateStatut,
                              decision: ligne.decision,
                              decisionDate: ligne.decisionDate
                            });
                          }}
                        >
                          <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold' }}>?</Typography>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteLigne(ligne.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - Style compact comme CCT */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Affichage de {startIndex + 1} à {Math.min(endIndex, filteredLignes.length)} sur {filteredLignes.length} lignes
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={pagination.pageSize}
                onChange={(e) => {
                  setPagination(prev => ({ ...prev, pageSize: e.target.value, currentPage: 1 }));
                }}
                size="small"
              >
                <MenuItem value={5}>5 par page</MenuItem>
                <MenuItem value={10}>10 par page</MenuItem>
                <MenuItem value={25}>25 par page</MenuItem>
                <MenuItem value={50}>50 par page</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Page {pagination.currentPage} sur {Math.ceil(filteredLignes.length / pagination.pageSize) || 1}
            </Typography>
            <Pagination
              count={Math.ceil(filteredLignes.length / pagination.pageSize)}
              page={pagination.currentPage}
              onChange={(e, page) => setPagination(prev => ({ ...prev, currentPage: page }))}
              color="primary"
              showFirstButton
              showLastButton
              size="small"
            />
          </Box>
        </Box>
      </Paper>

      {/* Modals */}
      <LigneFormModal
        open={openFormModal}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        editingLigne={editingLigne}
        dropdowns={dropdowns}
      />

      <LigneDetailsModal
        open={openDetailsModal}
        onClose={handleCloseDetailsModal}
        ligne={selectedLigne}
        onEdit={handleEditLigne}
      />

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: 'warning.main' }} />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer la ligne <strong>N° {ligneToDelete?.numLigne}</strong> ?
            <br />
            <br />
            <strong>Attention :</strong> Cette action est irréversible et supprimera définitivement la ligne de la base de données.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

