import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { fr } from 'date-fns/locale';
import { decisionService } from '../../services/decisionService';

const DecisionFormModal = ({ open, decision, editMode, dropdowns, onClose, onSave }) => {
  const [form, setForm] = useState({
    typeDecision: '',
    entiteConcernee: '',
    reseauId: '',
    cctId: '',
    chefCentreId: '',
    agentId: '',
    ligneId: '',
    dateReference: null,
    dateDebut: null,
    dateFin: null,
    lienDocument: '',
    montant: '',
    observation: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialiser le formulaire avec les données de la décision en mode édition
  useEffect(() => {
    if (decision && editMode) {
      setForm({
        typeDecision: decision.typeDecision || '',
        entiteConcernee: decision.entiteConcernee || '',
        reseauId: decision.reseauId || '',
        cctId: decision.cctId || '',
        chefCentreId: decision.chefCentreId || '',
        agentId: decision.agentId || '',
        ligneId: decision.ligneId || '',
        dateReference: decision.dateReference ? new Date(decision.dateReference) : null,
        dateDebut: decision.dateDebut ? new Date(decision.dateDebut) : null,
        dateFin: decision.dateFin ? new Date(decision.dateFin) : null,
        lienDocument: decision.lienDocument || '',
        montant: decision.montant ? decision.montant.toString() : '',
        observation: decision.observation || ''
      });
    } else {
      // Réinitialiser le formulaire en mode ajout
      setForm({
        typeDecision: '',
        entiteConcernee: 'Agent', // Valeur par défaut
        reseauId: '',
        cctId: '',
        chefCentreId: '',
        agentId: '',
        ligneId: '',
        dateReference: null,
        dateDebut: null,
        dateFin: null,
        lienDocument: '',
        montant: '',
        observation: ''
      });
    }
    setErrors({});
  }, [decision, editMode]);

  // Gérer les changements dans le formulaire
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!form.typeDecision.trim()) {
      newErrors.typeDecision = 'Le type de décision est requis';
    }

    if (!form.entiteConcernee.trim()) {
      newErrors.entiteConcernee = 'L\'entité concernée est requise';
    }

    if (!form.dateReference) {
      newErrors.dateReference = 'La date de référence est requise';
    }

    // Validation des dates
    if (form.dateDebut && form.dateFin && form.dateDebut > form.dateFin) {
      newErrors.dateFin = 'La date de fin doit être postérieure à la date de début';
    }

    // Validation du montant
    if (form.montant && isNaN(parseFloat(form.montant))) {
      newErrors.montant = 'Le montant doit être un nombre valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sauvegarder la décision
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const decisionData = {
        ...form,
        dateReference: form.dateReference?.toISOString(),
        dateDebut: form.dateDebut?.toISOString(),
        dateFin: form.dateFin?.toISOString(),
        montant: form.montant ? parseFloat(form.montant) : null,
        reseauId: form.reseauId || null,
        cctId: form.cctId || null,
        chefCentreId: form.chefCentreId || null,
        agentId: form.agentId || null,
        ligneId: form.ligneId || null
      };

      if (editMode) {
        await decisionService.updateDecision(decision.id, decisionData);
      } else {
        await decisionService.createDecision(decisionData);
      }

      onSave();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      // Gérer l'erreur (afficher un message, etc.)
    } finally {
      setLoading(false);
    }
  };

  // Gérer la fermeture
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {editMode ? 'MODIFIER DÉCISION' : 'AJOUTER DÉCISION'}
        </Box>
        <Typography
          variant="body2"
          component="a"
          href="#"
          sx={{ color: 'white', textDecoration: 'none' }}
        >
          GESTION DES DÉCISIONS
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Première section - Informations principales */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 2 }}>
                Informations principales
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.typeDecision}>
                    <InputLabel>Type de décision *</InputLabel>
                    <Select
                      value={form.typeDecision}
                      onChange={(e) => handleChange('typeDecision', e.target.value)}
                      label="Type de décision *"
                    >
                      <MenuItem value="">Sélectionnez un élément</MenuItem>
                      {dropdowns.typesDecision?.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.typeDecision && (
                      <FormHelperText>{errors.typeDecision}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.entiteConcernee}>
                    <InputLabel>Entité concernée *</InputLabel>
                    <Select
                      value={form.entiteConcernee}
                      onChange={(e) => handleChange('entiteConcernee', e.target.value)}
                      label="Entité concernée *"
                    >
                      {dropdowns.typesEntite?.map((entite) => (
                        <MenuItem key={entite} value={entite}>
                          {entite}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.entiteConcernee && (
                      <FormHelperText>{errors.entiteConcernee}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Réseau</InputLabel>
                    <Select
                      value={form.reseauId}
                      onChange={(e) => handleChange('reseauId', e.target.value)}
                      label="Réseau"
                    >
                      <MenuItem value="">Sélectionnez un élément</MenuItem>
                      {dropdowns.reseaux?.map((reseau) => (
                        <MenuItem key={reseau.id} value={reseau.id}>
                          {reseau.libelle}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>CCT</InputLabel>
                    <Select
                      value={form.cctId}
                      onChange={(e) => handleChange('cctId', e.target.value)}
                      label="CCT"
                    >
                      <MenuItem value="">Sélectionnez un élément</MenuItem>
                      {dropdowns.ccts?.map((cct) => (
                        <MenuItem key={cct.id} value={cct.id}>
                          {cct.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Agent</InputLabel>
                    <Select
                      value={form.agentId}
                      onChange={(e) => handleChange('agentId', e.target.value)}
                      label="Agent"
                    >
                      <MenuItem value="">Sélectionnez un élément</MenuItem>
                      {dropdowns.agents?.map((agent) => (
                        <MenuItem key={agent.id} value={agent.id}>
                          {agent.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      label="Date référence *"
                      value={form.dateReference}
                      onChange={(newValue) => handleChange('dateReference', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dateReference}
                          helperText={errors.dateReference}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Deuxième section - Informations supplémentaires */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 2 }}>
                Informations supplémentaires
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lien du document"
                    value={form.lienDocument}
                    onChange={(e) => handleChange('lienDocument', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachFileIcon />
                        </InputAdornment>
                      ),
                    }}
                    helperText="Choisir un fichier"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Montant"
                    value={form.montant}
                    onChange={(e) => handleChange('montant', e.target.value)}
                    type="number"
                    error={!!errors.montant}
                    helperText={errors.montant}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">DH</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      label="Date début"
                      value={form.dateDebut}
                      onChange={(newValue) => handleChange('dateDebut', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      label="Date fin"
                      value={form.dateFin}
                      onChange={(newValue) => handleChange('dateFin', newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dateFin}
                          helperText={errors.dateFin}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Observation"
                    value={form.observation}
                    onChange={(e) => handleChange('observation', e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          startIcon={<CancelIcon />}
          variant="outlined"
          color="inherit"
        >
          Annuler
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          startIcon={<SaveIcon />}
          variant="contained"
          sx={{ bgcolor: editMode ? '#1976d2' : '#2e7d32' }}
        >
          {editMode ? 'Enregistrer' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DecisionFormModal;
