import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import { historiqueAffectationsService } from '../../services/historiqueAffectationsService';
import { dropdownsService } from '../../services/dropdownsService';

const HistoriqueAffectations = () => {
  const [historiques, setHistoriques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedHistorique, setSelectedHistorique] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    ccts: [],
    agents: [],
    chefsCentre: []
  });

  // État du formulaire
  const [formData, setFormData] = useState({
    entiteId: '',
    typeEntite: '',
    cctId: '',
    dateAffectation: null,
    dateFinAffectation: null,
    motifAffectation: '',
    motifFinAffectation: '',
    isActive: true,
    agentId: null,
    chefCentreId: null
  });

  // Charger les données initiales
  useEffect(() => {
    loadDropdowns();
    loadHistoriques();
  }, []);

  // Charger les dropdowns
  const loadDropdowns = async () => {
    try {
      const [ccts, agents, chefsCentre] = await Promise.all([
        dropdownsService.getCCTs(),
        dropdownsService.getAgents(),
        dropdownsService.getChefsCentre()
      ]);

      setDropdowns({ ccts, agents, chefsCentre });
    } catch (error) {
      console.error('Erreur lors du chargement des dropdowns:', error);
      setError('Erreur lors du chargement des données de référence');
    }
  };

  // Charger les historiques
  const loadHistoriques = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await historiqueAffectationsService.getAll();
      setHistoriques(data);
    } catch (error) {
      console.error('Erreur lors du chargement des historiques:', error);
      setError('Erreur lors du chargement des historiques');
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements du formulaire
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Gérer le changement de type d'entité
  const handleTypeEntiteChange = (typeEntite) => {
    setFormData(prev => ({
      ...prev,
      typeEntite,
      entiteId: '',
      agentId: null,
      chefCentreId: null
    }));
  };

  // Ouvrir la modale d'ajout
  const handleAddHistorique = () => {
    setSelectedHistorique(null);
    setEditMode(false);
    setFormData({
      entiteId: '',
      typeEntite: '',
      cctId: '',
      dateAffectation: null,
      dateFinAffectation: null,
      motifAffectation: '',
      motifFinAffectation: '',
      isActive: true,
      agentId: null,
      chefCentreId: null
    });
    setOpenFormModal(true);
  };

  // Ouvrir la modale de modification
  const handleEditHistorique = (historique) => {
    setSelectedHistorique(historique);
    setEditMode(true);
    setFormData({
      entiteId: historique.entiteId,
      typeEntite: historique.typeEntite,
      cctId: historique.cctId,
      dateAffectation: historique.dateAffectation ? new Date(historique.dateAffectation) : null,
      dateFinAffectation: historique.dateFinAffectation ? new Date(historique.dateFinAffectation) : null,
      motifAffectation: historique.motifAffectation || '',
      motifFinAffectation: historique.motifFinAffectation || '',
      isActive: historique.isActive,
      agentId: historique.agentId,
      chefCentreId: historique.chefCentreId
    });
    setOpenFormModal(true);
  };

  // Sauvegarder l'historique
  const handleSave = async () => {
    try {
      if (editMode) {
        await historiqueAffectationsService.update(selectedHistorique.id, formData);
      } else {
        await historiqueAffectationsService.create(formData);
      }

      setOpenFormModal(false);
      loadHistoriques();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError('Erreur lors de la sauvegarde de l\'historique');
    }
  };

  // Supprimer un historique
  const handleDelete = async (historique) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet historique ?')) {
      try {
        await historiqueAffectationsService.delete(historique.id);
        loadHistoriques();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError('Erreur lors de la suppression de l\'historique');
      }
    }
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setOpenFormModal(false);
    setSelectedHistorique(null);
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
        Historique des Affectations
      </Typography>

      {/* Messages d'erreur */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Bouton d'ajout */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddHistorique}
          sx={{ bgcolor: '#1976d2' }}
        >
          Ajouter Affectation
        </Button>
      </Box>

      {/* Table des historiques */}
      <Paper sx={{ border: '1px solid #e0e0e0' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type Entité</TableCell>
                <TableCell>Entité</TableCell>
                <TableCell>CCT</TableCell>
                <TableCell>Date Affectation</TableCell>
                <TableCell>Date Fin</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : historiques.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Aucun historique trouvé
                  </TableCell>
                </TableRow>
              ) : (
                historiques.map((historique) => (
                  <TableRow key={historique.id} hover>
                    <TableCell>
                      <Chip
                        label={historique.typeEntite}
                        size="small"
                        color={historique.typeEntite === 'Agent' ? 'primary' : 'secondary'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {historique.typeEntite === 'Agent' ? historique.agentNom : historique.chefCentreNom}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={historique.cctNom || `CCT ${historique.cctId}`}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {historique.dateAffectation ? new Date(historique.dateAffectation).toLocaleDateString('fr-FR') : '-'}
                    </TableCell>
                    <TableCell>
                      {historique.dateFinAffectation ? new Date(historique.dateFinAffectation).toLocaleDateString('fr-FR') : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={historique.isActive ? 'Active' : 'Terminée'}
                        size="small"
                        color={historique.isActive ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditHistorique(historique)}
                        title="Modifier"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(historique)}
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
      </Paper>

      {/* Modale de formulaire */}
      <Dialog open={openFormModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Modifier l\'affectation' : 'Ajouter une affectation'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Type d'entité</InputLabel>
                <Select
                  value={formData.typeEntite}
                  onChange={(e) => handleTypeEntiteChange(e.target.value)}
                  label="Type d'entité"
                >
                  <MenuItem value="">Sélectionnez un type</MenuItem>
                  <MenuItem value="Agent">Agent</MenuItem>
                  <MenuItem value="ChefCentre">Chef de Centre</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>CCT</InputLabel>
                <Select
                  value={formData.cctId}
                  onChange={(e) => handleFormChange('cctId', e.target.value)}
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
            </Box>

            {formData.typeEntite === 'Agent' && (
              <FormControl fullWidth>
                <InputLabel>Agent</InputLabel>
                <Select
                  value={formData.agentId || ''}
                  onChange={(e) => {
                    handleFormChange('agentId', e.target.value);
                    handleFormChange('entiteId', e.target.value);
                  }}
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
            )}

            {formData.typeEntite === 'ChefCentre' && (
              <FormControl fullWidth>
                <InputLabel>Chef de Centre</InputLabel>
                <Select
                  value={formData.chefCentreId || ''}
                  onChange={(e) => {
                    handleFormChange('chefCentreId', e.target.value);
                    handleFormChange('entiteId', e.target.value);
                  }}
                  label="Chef de Centre"
                >
                  <MenuItem value="">Sélectionnez un chef de centre</MenuItem>
                  {dropdowns.chefsCentre.map((chef) => (
                    <MenuItem key={chef.id} value={chef.id}>
                      {chef.prenom} {chef.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <DatePicker
                  label="Date d'affectation"
                  value={formData.dateAffectation}
                  onChange={(newValue) => handleFormChange('dateAffectation', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <DatePicker
                  label="Date de fin (optionnel)"
                  value={formData.dateFinAffectation}
                  onChange={(newValue) => handleFormChange('dateFinAffectation', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <TextField
              fullWidth
              label="Motif d'affectation"
              value={formData.motifAffectation}
              onChange={(e) => handleFormChange('motifAffectation', e.target.value)}
              multiline
              rows={2}
            />

            <TextField
              fullWidth
              label="Motif de fin d'affectation (optionnel)"
              value={formData.motifFinAffectation}
              onChange={(e) => handleFormChange('motifFinAffectation', e.target.value)}
              multiline
              rows={2}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleFormChange('isActive', e.target.checked)}
                />
              }
              label="Affectation active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HistoriqueAffectations;
