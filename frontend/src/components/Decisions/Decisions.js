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
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import DecisionFormModal from './DecisionFormModal';
import DecisionDetailsModal from './DecisionDetailsModal';
import { decisionService } from '../../services/decisionService';
import { dropdownsService } from '../../services/dropdownsService';

const Decisions = () => {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
        page: page + 1,
        pageSize: rowsPerPage,
        ...filters,
        dateDecision: filters.dateDecision ? filters.dateDecision.toISOString().split('T')[0] : null
      };

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
    setFilters({
      reseauId: '',
      cctId: '',
      chefCentreId: '',
      agentId: '',
      ligneId: '',
      typeDecision: '',
      dateDecision: null,
      entiteConcernee: ''
    });
    setPage(0);
  };

  // Gérer la pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
        Gestion des Décisions/Sanctions
      </Typography>

      {/* Section Recherche */}
      <Paper sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon sx={{ mr: 1, color: '#1976d2' }} />
          RECHERCHE
        </Typography>

        {/* Grille de filtres organisée en 3 colonnes */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 3, 
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

          {/* Colonne 3 - Ligne 2 */}
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

          {/* Colonne 1 - Ligne 3 */}
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

          {/* Colonnes 2 et 3 - Ligne 3 : Groupe de boutons rapprochés */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 1 // Espacement réduit entre les boutons
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
      <Paper sx={{ p: 3, border: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <ViewIcon sx={{ mr: 1, color: '#1976d2' }} />
            DÉCISIONS
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Afficher</InputLabel>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                label="Afficher"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              éléments
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddDecision}
              sx={{ bgcolor: '#1976d2' }}
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
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell>Type de Décision</TableCell>
                <TableCell>Entité concernée</TableCell>
                <TableCell>Date Décision</TableCell>
                <TableCell>CCT</TableCell>
                <TableCell>Réseau</TableCell>
                <TableCell>Chef de centre</TableCell>
                <TableCell>Ligne</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                        color="primary"
                        onClick={() => handleViewDecision(decision)}
                        title="Voir les détails"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleEditDecision(decision)}
                        title="Modifier"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteDecision(decision)}
                        title="Supprimer"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Affichage de l'élément {page * rowsPerPage + 1} à {Math.min((page + 1) * rowsPerPage, totalCount)} sur {totalCount} éléments
          </Typography>
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Lignes par page:"
          />
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