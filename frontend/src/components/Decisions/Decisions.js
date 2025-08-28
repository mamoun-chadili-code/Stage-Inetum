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
  TablePagination,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  Edit as EditIcon,
  AutoDelete as AutoDeleteIcon,
  PrivacyTip as PrivacyTipIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import DecisionFormModal from './DecisionFormModal';
import DecisionDetailsModal from './DecisionDetailsModal';
import SectionTitle from '../Commun/SectionTitle';
import { decisionService } from '../../services/decisionService';
import { dropdownsService } from '../../services/dropdownsService';

const Decisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // États pour les filtres
  const [filters, setFilters] = useState({
    reseauId: '',
    cctId: '',
    chefCentreId: '',
    agentId: '',
    ligneId: '',
    typeDecision: '',
    dateDecision: null,
    entiteConcernee: ''
  });

  // États pour les modales
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // États pour les dropdowns
  const [dropdowns, setDropdowns] = useState({
    reseaux: [],
    ccts: [],
    chefsCentre: [],
    agents: [],
    lignes: [],
    typesDecision: [],
    typesEntite: []
  });

  // Charger les données initiales
  useEffect(() => {
    loadDropdowns();
    loadDecisions();
  }, []);

  // Charger les données de référence
  const loadDropdowns = async () => {
    try {
      const [
        reseaux,
        ccts,
        chefsCentre,
        agents,
        lignes,
        typesDecision,
        typesEntite
      ] = await Promise.all([
        dropdownsService.getReseaux(),
        dropdownsService.getCCTs(),
        dropdownsService.getChefsCentre(),
        dropdownsService.getAgents(),
        dropdownsService.getLignes(),
        decisionService.getDecisionTypes(),
        decisionService.getEntiteTypes()
      ]);

      setDropdowns({
        reseaux,
        ccts,
        chefsCentre,
        agents,
        lignes,
        typesDecision,
        typesEntite
      });
    } catch (error) {
      console.error('Erreur lors du chargement des dropdowns:', error);
      setError('Erreur lors du chargement des données de référence');
    }
  };

  // Charger les décisions
  const loadDecisions = async () => {
    setLoading(true);
    setError('');

    try {
      const searchParams = {
        page: page + 1, // Conversion page 0-based vers 1-based
        pageSize: rowsPerPage
      };

      // Ajouter seulement les filtres non-vides
      if (filters.reseauId && filters.reseauId !== '') searchParams.reseauId = filters.reseauId;
      if (filters.cctId && filters.cctId !== '') searchParams.cctId = filters.cctId;
      if (filters.chefCentreId && filters.chefCentreId !== '') searchParams.chefCentreId = filters.chefCentreId;
      if (filters.ligneId && filters.ligneId !== '') searchParams.ligneId = filters.ligneId;
      if (filters.agentId && filters.agentId !== '') searchParams.agentId = filters.agentId;
      if (filters.typeDecision && filters.typeDecision !== '') searchParams.typeDecisionId = filters.typeDecision;
      if (filters.dateDecision) {
        // Conversion sûre de la date sans changement de timezone
        const year = filters.dateDecision.getFullYear();
        const month = String(filters.dateDecision.getMonth() + 1).padStart(2, '0');
        const day = String(filters.dateDecision.getDate()).padStart(2, '0');
        searchParams.dateReference = `${year}-${month}-${day}`;
      }

      console.log('🔍 Paramètres de recherche envoyés:', searchParams);
      console.log('🔍 Filtres actuels:', filters);

      const response = await decisionService.searchDecisions(searchParams);
      setDecisions(response.decisions);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Erreur lors du chargement des décisions:', error);
      setError('Erreur lors du chargement des décisions');
    } finally {
      setLoading(false);
    }
  };

  // Charger les décisions avec une taille de page personnalisée
  const loadDecisionsWithCustomPageSize = async (customPageSize) => {
    setLoading(true);
    setError('');

    try {
      const searchParams = {
        page: 1, // Toujours page 1 lors du changement de taille
        pageSize: customPageSize
      };

      // Ajouter seulement les filtres non-vides
      if (filters.reseauId && filters.reseauId !== '') searchParams.reseauId = filters.reseauId;
      if (filters.cctId && filters.cctId !== '') searchParams.cctId = filters.cctId;
      if (filters.chefCentreId && filters.chefCentreId !== '') searchParams.chefCentreId = filters.chefCentreId;
      if (filters.ligneId && filters.ligneId !== '') searchParams.ligneId = filters.ligneId;
      if (filters.agentId && filters.agentId !== '') searchParams.agentId = filters.agentId;
      if (filters.typeDecision && filters.typeDecision !== '') searchParams.typeDecisionId = filters.typeDecision;
      if (filters.dateDecision) {
        // Conversion sûre de la date sans changement de timezone
        const year = filters.dateDecision.getFullYear();
        const month = String(filters.dateDecision.getMonth() + 1).padStart(2, '0');
        const day = String(filters.dateDecision.getDate()).padStart(2, '0');
        searchParams.dateReference = `${year}-${month}-${day}`;
      }

      console.log('🔍 Paramètres de recherche avec taille personnalisée:', searchParams);

      const response = await decisionService.searchDecisions(searchParams);
      setDecisions(response.decisions);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Erreur lors du chargement des décisions:', error);
      setError('Erreur lors du chargement des décisions');
    } finally {
      setLoading(false);
    }
  };

  // Charger les décisions avec des filtres spécifiques
  const loadDecisionsWithFilters = async (customFilters) => {
    setLoading(true);
    setError('');

    try {
      const searchParams = {
        page: 1, // Toujours page 1 lors de la réinitialisation
        pageSize: rowsPerPage
      };

      // Ajouter seulement les filtres non-vides
      if (customFilters.reseauId && customFilters.reseauId !== '') searchParams.reseauId = customFilters.reseauId;
      if (customFilters.cctId && customFilters.cctId !== '') searchParams.cctId = customFilters.cctId;
      if (customFilters.chefCentreId && customFilters.chefCentreId !== '') searchParams.chefCentreId = customFilters.chefCentreId;
      if (customFilters.ligneId && customFilters.ligneId !== '') searchParams.ligneId = customFilters.ligneId;
      if (customFilters.agentId && customFilters.agentId !== '') searchParams.agentId = customFilters.agentId;
      if (customFilters.typeDecision && customFilters.typeDecision !== '') searchParams.typeDecisionId = customFilters.typeDecision;
      if (customFilters.dateDecision) {
        // Conversion sûre de la date sans changement de timezone
        const year = customFilters.dateDecision.getFullYear();
        const month = String(customFilters.dateDecision.getMonth() + 1).padStart(2, '0');
        const day = String(customFilters.dateDecision.getDate()).padStart(2, '0');
        searchParams.dateReference = `${year}-${month}-${day}`;
      }

      const response = await decisionService.searchDecisions(searchParams);
      setDecisions(response.decisions);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Erreur lors du chargement des décisions:', error);
      setError('Erreur lors du chargement des décisions');
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements de filtres
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Rechercher
  const handleSearch = () => {
    setPage(0);
    loadDecisions();
  };

  // Réinitialiser les filtres
  const handleClearFilters = () => {
    console.log('🧹 Réinitialisation des filtres...');
    
    // Créer les filtres vides
    const emptyFilters = {
      reseauId: '',
      cctId: '',
      chefCentreId: '',
      agentId: '',
      ligneId: '',
      typeDecision: '',
      dateDecision: null,
      entiteConcernee: ''
    };
    
    // Mettre à jour l'état
    setFilters(emptyFilters);
    setPage(0);
    
    // Recharger les données avec les filtres vides
    loadDecisionsWithFilters(emptyFilters);
    console.log('✅ Filtres réinitialisés et données rechargées');
  };

  // Gérer la pagination
  const handleChangePage = (event, newPage) => {
    console.log('📄 Changement de page:', newPage);
    setPage(newPage);
    // Recharger les données immédiatement après le changement de page
    setTimeout(() => loadDecisions(), 0);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log('📊 Changement de lignes par page:', newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Retour à la première page
    // Recharger les données avec la nouvelle taille de page
    setTimeout(() => {
      // Créer un objet temporaire avec la nouvelle valeur
      const tempRowsPerPage = newRowsPerPage;
      loadDecisionsWithCustomPageSize(tempRowsPerPage);
    }, 0);
  };

  // Ouvrir la modale d'ajout
  const handleAddDecision = () => {
    setSelectedDecision(null);
    setEditMode(false);
    setOpenFormModal(true);
  };

  // Ouvrir la modale de modification
  const handleEditDecision = (decision) => {
    setSelectedDecision(decision);
    setEditMode(true);
    setOpenFormModal(true);
  };

  // Ouvrir la modale de détails
  const handleViewDecision = (decision) => {
    setSelectedDecision(decision);
    setOpenDetailsModal(true);
  };

  // Supprimer une décision
  const handleDeleteDecision = async (decision) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette décision ?')) {
      try {
        await decisionService.deleteDecision(decision.id);
        loadDecisions();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError('Erreur lors de la suppression de la décision');
      }
    }
  };

  // Fermer les modales
  const handleCloseFormModal = () => {
    setOpenFormModal(false);
    setSelectedDecision(null);
    setEditMode(false);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedDecision(null);
  };

  // Rafraîchir après modification
  const handleDecisionSaved = () => {
    handleCloseFormModal();
    loadDecisions();
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Titre principal centré */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        pt: 1,
        pb: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50px'
      }}>
        <SectionTitle 
          title="GESTION DES DÉCISIONS/SANCTIONS" 
          variant="section"
        />
      </Box>

      {/* Section Recherche */}
      <Paper sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon sx={{ mr: 1, color: '#1976d2' }} />
          RECHERCHE
        </Typography>

        {/* Grille de filtres organisée en 4 colonnes */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 2, 
          mb: 3,
          '& > *': { width: '100%' }
        }}>
          {/* Colonne 1 */}
            <FormControl fullWidth size="small">
              <InputLabel>Réseau</InputLabel>
              <Select
                value={filters.reseauId}
                onChange={(e) => handleFilterChange('reseauId', e.target.value)}
                label="Réseau"
              >
              <MenuItem value="">Sélectionnez un réseau</MenuItem>
                {dropdowns.reseaux.map((reseau) => (
                  <MenuItem key={reseau.id} value={reseau.id}>
                  {reseau.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          {/* Colonne 2 */}
            <FormControl fullWidth size="small">
              <InputLabel>CCT</InputLabel>
              <Select
                value={filters.cctId}
                onChange={(e) => handleFilterChange('cctId', e.target.value)}
                label="CCT"
              >
              <MenuItem value="">Sélectionnez un CCT</MenuItem>
                {dropdowns.ccts.map((cct) => (
                  <MenuItem key={cct.id} value={cct.id}>
                    {cct.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          {/* Colonne 3 */}
            <FormControl fullWidth size="small">
              <InputLabel>Chef de centre</InputLabel>
              <Select
                value={filters.chefCentreId}
                onChange={(e) => handleFilterChange('chefCentreId', e.target.value)}
                label="Chef de centre"
              >
              <MenuItem value="">Sélectionnez un chef</MenuItem>
                {dropdowns.chefsCentre.map((chef) => (
                  <MenuItem key={chef.id} value={chef.id}>
                    {chef.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          {/* Colonne 1 - Ligne 2 */}
            <FormControl fullWidth size="small">
              <InputLabel>Agent</InputLabel>
              <Select
                value={filters.agentId}
                onChange={(e) => handleFilterChange('agentId', e.target.value)}
                label="Agent"
              >
              <MenuItem value="">Sélectionnez un agent</MenuItem>
                {dropdowns.agents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>
                  {agent.prenom} {agent.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          {/* Colonne 2 - Ligne 2 */}
            <FormControl fullWidth size="small">
              <InputLabel>Ligne</InputLabel>
              <Select
                value={filters.ligneId}
                onChange={(e) => handleFilterChange('ligneId', e.target.value)}
                label="Ligne"
              >
              <MenuItem value="">Sélectionnez une ligne</MenuItem>
                {dropdowns.lignes.map((ligne) => (
                  <MenuItem key={ligne.id} value={ligne.id}>
                  Ligne {ligne.numeroLigne}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>



          {/* Colonne 4 - Ligne 1 */}
            <FormControl fullWidth size="small">
              <InputLabel>Type décision</InputLabel>
              <Select
                value={filters.typeDecision}
                onChange={(e) => handleFilterChange('typeDecision', e.target.value)}
                label="Type décision"
              >
              <MenuItem value="">Sélectionnez un type</MenuItem>
                {dropdowns.typesDecision.map((type) => (
                <MenuItem key={type.id || type} value={type.id || type}>
                  {type.libelle || type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Colonne 1 - Ligne 2 */}
          <FormControl fullWidth size="small">
            <InputLabel>Agent</InputLabel>
            <Select
              value={filters.agentId}
              onChange={(e) => handleFilterChange('agentId', e.target.value)}
              label="Agent"
            >
              <MenuItem value="">Sélectionnez un agent</MenuItem>
              {dropdowns.agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.prenom} {agent.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Colonne 2 - Ligne 2 */}
          <FormControl fullWidth size="small">
            <InputLabel>Ligne</InputLabel>
            <Select
              value={filters.ligneId}
              onChange={(e) => handleFilterChange('ligneId', e.target.value)}
              label="Ligne"
            >
              <MenuItem value="">Sélectionnez une ligne</MenuItem>
              {dropdowns.lignes.map((ligne) => (
                <MenuItem key={ligne.id} value={ligne.id}>
                  Ligne {ligne.numeroLigne}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          {/* Colonne 3 - Ligne 2 */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date décision"
                value={filters.dateDecision}
                onChange={(newValue) => handleFilterChange('dateDecision', newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth
                  size="small"
                  placeholder="Sélectionnez une date"
                />
              )}
              />
            </LocalizationProvider>

          {/* Colonne 4 - Ligne 2 : Boutons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 1
          }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{ bgcolor: '#1976d2' }}
          >
            Rechercher
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
          >
            Annuler
          </Button>
          </Box>
        </Box>
      </Paper>

      {/* Section Décisions */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: '#1976d2', fontWeight: 'bold' }}>
            <PrivacyTipIcon sx={{ mr: 1, color: '#1976d2' }} />
            DÉCISIONS
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Sélecteur d'éléments par page */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Éléments par page :
              </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                  label="Éléments par page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDecision}
              sx={{ 
                bgcolor: '#1976d2',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3
              }}
            >
              Ajouter Décision
            </Button>
          </Box>
        </Box>

        {/* Messages d'erreur */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Table des décisions */}
        <TableContainer>
          <Table sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
            <TableHead>
                          <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Type de Décision</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Entité concernée</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date Décision</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Réseau</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Chef de centre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ligne</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : decisions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Aucune décision trouvée
                  </TableCell>
                </TableRow>
              ) : (
                decisions.map((decision) => (
                  <TableRow key={decision.id} hover>
                    <TableCell>
                      <Chip
                        label={decision.typeDecisionLibelle || `Type ${decision.typeDecisionId}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={decision.entiteTypeLibelle || `Entité ${decision.entiteTypeId}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(decision.dateReference).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>{decision.cctNom || '-'}</TableCell>
                    <TableCell>{decision.reseauNom || '-'}</TableCell>
                    <TableCell>{decision.chefCentreNom || '-'}</TableCell>
                    <TableCell>{decision.ligneNumero || '-'}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewDecision(decision)}
                        title="Voir les détails"
                      >
                        <PrivacyTipIcon sx={{ color: '#22780F' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditDecision(decision)}
                        title="Modifier"
                      >
                        <EditIcon sx={{ color: '#DF6D14' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteDecision(decision)}
                        title="Supprimer"
                      >
                        <AutoDeleteIcon sx={{ color: '#EB0000' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
              onClick={() => handleChangePage(null, 0)}
              disabled={page === 0}
              sx={{
                color: page === 0 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: page === 0 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <FirstPageIcon />
            </IconButton>

            {/* Bouton page précédente */}
            <IconButton
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              sx={{
                color: page === 0 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: page === 0 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {/* Numéros de page */}
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = i;
              if (pageNum < totalPages) {
                return (
                  <IconButton
                    key={pageNum}
                    onClick={() => handleChangePage(null, pageNum)}
                    sx={{
                      backgroundColor: page === pageNum ? '#008080' : 'transparent',
                      color: page === pageNum ? 'white' : '#424242',
                      minWidth: 36,
                      height: 36,
                      fontSize: '0.875rem',
                      '&:hover': {
                        backgroundColor: page === pageNum ? '#008080' : 'rgba(0, 128, 128, 0.1)'
                      }
                    }}
                  >
                    {pageNum + 1}
                  </IconButton>
                );
              }
              return null;
            })}

            {/* Bouton page suivante */}
            <IconButton
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= totalPages - 1}
              sx={{
                color: page >= totalPages - 1 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: page >= totalPages - 1 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <ChevronRightIcon />
            </IconButton>

            {/* Bouton dernière page */}
            <IconButton
              onClick={() => handleChangePage(null, totalPages - 1)}
              disabled={page >= totalPages - 1}
              sx={{
                color: page >= totalPages - 1 ? '#bdbdbd' : '#008080',
                '&:hover': {
                  backgroundColor: page >= totalPages - 1 ? 'transparent' : 'rgba(0, 128, 128, 0.1)'
                }
              }}
            >
              <LastPageIcon />
            </IconButton>
          </Box>
        )}

        {/* Informations d'affichage en dessous */}
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Affichage de {page * rowsPerPage + 1} à {Math.min((page + 1) * rowsPerPage, totalCount)} sur {totalCount} décisions
          </Typography>
        </Box>
      </Paper>

      {/* Modales */}
      <DecisionFormModal
        open={openFormModal}
        decision={selectedDecision}
        editMode={editMode}
        dropdowns={dropdowns}
        onClose={handleCloseFormModal}
        onSave={handleDecisionSaved}
      />

      <DecisionDetailsModal
        open={openDetailsModal}
        decision={selectedDecision}
        onClose={handleCloseDetailsModal}
      />
    </Box>
  );
};

export default Decisions; 