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
  MenuItem
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
import { historiqueCCTService } from '../../services/historiqueCCTService';
import { dropdownsService } from '../../services/dropdownsService';

const HistoriqueCCT = () => {
  const [historiques, setHistoriques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedHistorique, setSelectedHistorique] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    ccts: [],
    reseaux: []
  });

  // État du formulaire
  const [formData, setFormData] = useState({
    cctId: '',
    reseauId: '',
    dateDebut: null,
    dateFin: null
  });

  // Charger les données initiales
  useEffect(() => {
    loadDropdowns();
    loadHistoriques();
  }, []);

  // Charger les dropdowns
  const loadDropdowns = async () => {
    try {
      const [ccts, reseaux] = await Promise.all([
        dropdownsService.getCCTs(),
        dropdownsService.getReseaux()
      ]);

      setDropdowns({ ccts, reseaux });
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
      const data = await historiqueCCTService.getAll();
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

  // Ouvrir la modale d'ajout
  const handleAddHistorique = () => {
    setSelectedHistorique(null);
    setEditMode(false);
    setFormData({
      cctId: '',
      reseauId: '',
      dateDebut: null,
      dateFin: null
    });
    setOpenFormModal(true);
  };

  // Ouvrir la modale de modification
  const handleEditHistorique = (historique) => {
    setSelectedHistorique(historique);
    setEditMode(true);
    setFormData({
      cctId: historique.cctId,
      reseauId: historique.reseauId,
      dateDebut: historique.dateDebut ? new Date(historique.dateDebut) : null,
      dateFin: historique.dateFin ? new Date(historique.dateFin) : null
    });
    setOpenFormModal(true);
  };

  // Sauvegarder l'historique
  const handleSave = async () => {
    try {
      if (editMode) {
        await historiqueCCTService.update(selectedHistorique.id, formData);
      } else {
        await historiqueCCTService.create(formData);
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
        await historiqueCCTService.delete(historique.id);
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
        Historique des CCTs
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
          Ajouter Historique CCT
        </Button>
      </Box>

      {/* Table des historiques */}
      <Paper sx={{ border: '1px solid #e0e0e0' }}>
        <TableContainer>
          <Table sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
            <TableHead>
                          <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Réseau</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date Début</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date Fin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : historiques.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucun historique trouvé
                  </TableCell>
                </TableRow>
              ) : (
                historiques.map((historique) => (
                  <TableRow key={historique.id} hover>
                    <TableCell>
                      <Chip
                        label={historique.cctNom || `CCT ${historique.cctId}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={historique.reseauNom || `Réseau ${historique.reseauId}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {historique.dateDebut ? new Date(historique.dateDebut).toLocaleDateString('fr-FR') : '-'}
                    </TableCell>
                    <TableCell>
                      {historique.dateFin ? new Date(historique.dateFin).toLocaleDateString('fr-FR') : '-'}
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
      <Dialog open={openFormModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Modifier l\'historique CCT' : 'Ajouter un historique CCT'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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

            <FormControl fullWidth>
              <InputLabel>Réseau</InputLabel>
              <Select
                value={formData.reseauId}
                onChange={(e) => handleFormChange('reseauId', e.target.value)}
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

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date de début"
                value={formData.dateDebut}
                onChange={(newValue) => handleFormChange('dateDebut', newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date de fin (optionnel)"
                value={formData.dateFin}
                onChange={(newValue) => handleFormChange('dateFin', newValue)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth />
                )}
              />
            </LocalizationProvider>
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

export default HistoriqueCCT;
