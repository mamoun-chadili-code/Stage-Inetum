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
  InputAdornment,
  IconButton
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
    lienDocumentUrl: '',
    fileName: '',
    montant: '',
    dateDebut: null,
    dateFin: null,
    observation: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialiser le formulaire avec les données de la décision en mode édition
  useEffect(() => {
    console.log('DecisionFormModal useEffect:', { decision, editMode });
    
    if (decision && editMode) {
      console.log('Mode édition - Décision reçue:', decision);
      setForm({
        typeDecision: decision.typeDecisionId || '',
        entiteConcernee: decision.entiteTypeId || '',
        reseauId: decision.reseauId || '',
        cctId: decision.cctId || '',
        chefCentreId: decision.chefCentreId || '',
        agentId: decision.agentId || '',
        ligneId: decision.ligneId || '',
        dateReference: decision.dateReference ? new Date(decision.dateReference) : null,
        lienDocumentUrl: decision.lienDocumentUrl || '',
        fileName: decision.fileName || '',
        montant: decision.montant || '',
        dateDebut: decision.dateDebut ? new Date(decision.dateDebut) : null,
        dateFin: decision.dateFin ? new Date(decision.dateFin) : null,
        observation: decision.observation || ''
      });
      console.log('Formulaire initialisé avec:', {
        typeDecision: decision.typeDecisionId,
        entiteConcernee: decision.entiteTypeId,
        dateReference: decision.dateReference
      });
    } else {
      console.log('Mode ajout - Réinitialisation du formulaire');
      // Réinitialiser le formulaire en mode ajout
      setForm({
        typeDecision: '',
        entiteConcernee: 3, // Valeur par défaut pour AGENT
        reseauId: '',
        cctId: '',
        chefCentreId: '',
        agentId: '',
        ligneId: '',
        dateReference: null,
        lienDocumentUrl: '',
        fileName: '',
        montant: '',
        dateDebut: null,
        dateFin: null,
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

    // Validation du type de décision (peut être objet ou chaîne)
    const typeDecisionValue = typeof form.typeDecision === 'object' ? form.typeDecision?.libelle || form.typeDecision : form.typeDecision;
    if (!typeDecisionValue || !String(typeDecisionValue).trim()) {
      newErrors.typeDecision = 'Le type de décision est requis';
    }

    // Validation de l'entité concernée (peut être objet ou chaîne)
    const entiteValue = typeof form.entiteConcernee === 'object' ? form.entiteConcernee?.libelle || form.entiteConcernee : form.entiteConcernee;
    if (!entiteValue || !String(entiteValue).trim()) {
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
      // Préparer les données selon le format attendu par le backend
      const decisionData = {
        // Champs obligatoires selon le modèle backend
        typeDecisionId: form.typeDecision,      // ID du type de décision
        entiteTypeId: form.entiteConcernee,     // ID du type d'entité
        entiteId: form.agentId || form.chefCentreId || form.cctId || form.reseauId || form.ligneId || 0,
        dateReference: form.dateReference?.toISOString(),
        
        // Champs optionnels
        dateDebut: form.dateDebut?.toISOString() || null,
        dateFin: form.dateFin?.toISOString() || null,
        lienDocumentUrl: form.lienDocumentUrl || null,
        montant: form.montant ? parseFloat(form.montant) : null,
        observation: form.observation || null,
        
        // Informations de contexte optionnelles
        reseauId: form.reseauId || null,
        cctId: form.cctId || null,
        
        // Champs d'audit (seront gérés par le backend)
        createdAt: new Date().toISOString()
      };

      // Log pour déboguer
      console.log('🔍 DONNÉES DU FORMULAIRE:', form);
      console.log('🔍 DONNÉES PRÉPARÉES:', decisionData);
      console.log('🔍 Type de typeDecision:', typeof form.typeDecision, form.typeDecision);
      console.log('🔍 Type de entiteConcernee:', typeof form.entiteConcernee, form.entiteConcernee);

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
        {/* Filtres organisÃ©s en sections claires */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Section 1: Informations principales */}
          <Paper sx={{ p: 3, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
              Informations principales
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
              <FormControl fullWidth error={!!errors.typeDecision}>
                <InputLabel>
                  Type de décision <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={form.typeDecision}
                  onChange={(e) => handleChange('typeDecision', e.target.value)}
                  label="Type de décision *"
                >
                  <MenuItem value="">Sélectionnez un élément</MenuItem>
                  {dropdowns.typesDecision?.map((type) => (
                    <MenuItem key={type.id || type} value={type.id || type}>
                      {type.libelle || type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.typeDecision && (
                  <FormHelperText>{errors.typeDecision}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={!!errors.entiteConcernee}>
                <InputLabel>
                  Entité concernée <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  value={form.entiteConcernee}
                  onChange={(e) => handleChange('entiteConcernee', e.target.value)}
                  label="Entité concernée *"
                >
                  {dropdowns.typesEntite?.map((entite) => (
                    <MenuItem key={entite.id || entite} value={entite.id || entite}>
                      {entite.libelle || entite}
                    </MenuItem>
                  ))}
                </Select>
                {errors.entiteConcernee && (
                  <FormHelperText>{errors.entiteConcernee}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Réseau</InputLabel>
                <Select
                  value={form.reseauId}
                  onChange={(e) => handleChange('reseauId', e.target.value)}
                  label="Réseau"
                  error={!!errors.reseauId}
                >
                  <MenuItem value="">Sélectionnez un élément</MenuItem>
                  {dropdowns.reseaux && dropdowns.reseaux.length > 0 ? (
                    dropdowns.reseaux.map((reseau) => (
                      <MenuItem key={reseau.id} value={reseau.id}>
                        {reseau.nom || reseau.libelle || 'Réseau sans nom'}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>
                      Aucun réseau disponible - Vérifiez la connexion à la base de données
                    </MenuItem>
                  )}
                </Select>
                {errors.reseauId && (
                  <FormHelperText error>{errors.reseauId}</FormHelperText>
                )}
                {dropdowns.reseaux && dropdowns.reseaux.length === 0 && (
                  <FormHelperText>
                    Aucun réseau trouvé. Vérifiez que la base de données contient des réseaux.
                  </FormHelperText>
                )}
              </FormControl>

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
                      {agent.prenom} {agent.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <DatePicker
                  label={
                    <span>
                      Date référence <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
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
            </Box>
          </Paper>

          {/* Section 2: Informations supplémentaires */}
          <Paper sx={{ p: 3, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
            Informations supplémentaires
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
              <TextField
                fullWidth
                label={
                  <span>
                    Lien du document <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                value={form.lienDocumentUrl}
                onChange={(e) => handleChange('lienDocumentUrl', e.target.value)}
                placeholder="Saisir une URL ou cliquer sur l'icône pour sélectionner un fichier"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Vérifier le type de fichier
                            const allowedTypes = [
                              'application/pdf',
                              'application/msword',
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                              'application/vnd.ms-excel',
                              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                              'image/jpeg',
                              'image/png'
                            ];
                            
                            if (allowedTypes.includes(file.type)) {
                              const fileName = file.name;
                              const fileUrl = URL.createObjectURL(file);
                              handleChange('lienDocumentUrl', fileUrl);
                              handleChange('fileName', fileName);
                              // Effacer les erreurs précédentes
                              if (errors.lienDocumentUrl) {
                                setErrors(prev => ({ ...prev, lienDocumentUrl: '' }));
                              }
                            } else {
                              // Afficher une erreur pour type de fichier non autorisé
                              setErrors(prev => ({ 
                                ...prev, 
                                lienDocumentUrl: 'Type de fichier non autorisé. Formats acceptés : PDF, DOC, DOCX, XLS, XLSX, JPG, PNG' 
                              }));
                              // Réinitialiser le champ
                              handleChange('lienDocumentUrl', '');
                              handleChange('fileName', '');
                            }
                          }
                        }}
                      />
                      <label htmlFor="file-upload">
                        <IconButton
                          component="span"
                          size="small"
                          sx={{ color: '#1976d2' }}
                          title="Sélectionner un fichier"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  form.fileName 
                    ? `✓ Fichier sélectionné : ${form.fileName}` 
                    : "Saisir une URL ou cliquer sur l'icône pour sélectionner un fichier (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG)"
                }
                error={!!errors.lienDocumentUrl}
                FormHelperTextProps={{
                  error: !!errors.lienDocumentUrl
                }}
              />
              {errors.lienDocumentUrl && (
                <FormHelperText error sx={{ mt: 1, ml: 2 }}>
                  {errors.lienDocumentUrl}
                </FormHelperText>
              )}

              {/* Champs optionnels - Affichés uniquement en mode modification */}
              {editMode && (
                <>
                  <TextField
                    fullWidth
                    label="Montant"
                    value={form.montant}
                    onChange={(e) => handleChange('montant', e.target.value)}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">DH</InputAdornment>,
                    }}
                    helperText="Montant optionnel"
                  />

                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      label="Date début"
                      value={form.dateDebut}
                      onChange={(newValue) => handleChange('dateDebut', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth helperText="Date optionnelle" />}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                    <DatePicker
                      label="Date fin"
                      value={form.dateFin}
                      onChange={(newValue) => handleChange('dateFin', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth helperText="Date optionnelle" />}
                    />
                  </LocalizationProvider>
                </>
              )}
            </Box>

            {/* Champ Observation en pleine largeur */}
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label={
                  <span>
                    Observation <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                value={form.observation}
                onChange={(e) => handleChange('observation', e.target.value)}
                multiline
                rows={3}
              />
            </Box>
          </Paper>
        </Box>
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



