import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import SearchableSelect from '../common/SearchableSelect';

export default function AgentFormModal({ open, onClose, onSubmit, initialValues, dropdowns }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cin: '',
    tel: '',
    mail: '',
    cnss: '',
    cctId: '',
    numeroCAP: '',
    dateCAP: '',
    dateExpirationCAP: '',
    categorieCAPId: '',
    numDecisionRenouv: '',
    dateDecisionRenouv: '',
    statutAdministratifId: '',
    anneeAutorisation: '',
    dateAffectationCCT: '',
    adresse: ''
  });

  // Vérifier si les dropdowns sont chargés
  const dropdownsLoaded = dropdowns && dropdowns.ccts && dropdowns.categories && dropdowns.statutsAdministratifs;

  useEffect(() => {
    if (initialValues) {
      setFormData({
        nom: initialValues.nom || '',
        prenom: initialValues.prenom || '',
        cin: initialValues.cin || '',
        tel: initialValues.tel || '',
        mail: initialValues.mail || '',
        cnss: initialValues.cnss || '',
        cctId: initialValues.cctId || '',
        numeroCAP: initialValues.numeroCAP || '',
        dateCAP: initialValues.dateCAP ? new Date(initialValues.dateCAP).toISOString().split('T')[0] : '',
        dateExpirationCAP: initialValues.dateExpirationCAP ? new Date(initialValues.dateExpirationCAP).toISOString().split('T')[0] : '',
        categorieCAPId: initialValues.categorieCAPId || '',
        numDecisionRenouv: initialValues.numDecisionRenouv || '',
        dateDecisionRenouv: initialValues.dateDecisionRenouv ? new Date(initialValues.dateDecisionRenouv).toISOString().split('T')[0] : '',
        statutAdministratifId: initialValues.statutAdministratifId || '',
        anneeAutorisation: initialValues.anneeAutorisation || '',
        dateAffectationCCT: initialValues.dateAffectationCCT ? new Date(initialValues.dateAffectationCCT).toISOString().split('T')[0] : '',
        adresse: initialValues.adresse || ''
      });
    } else {
      setFormData({
        nom: '',
        prenom: '',
        cin: '',
        tel: '',
        mail: '',
        cnss: '',
        cctId: '',
        numeroCAP: '',
        dateCAP: '',
        dateExpirationCAP: '',
        categorieCAPId: '',
        numDecisionRenouv: '',
        dateDecisionRenouv: '',
        statutAdministratifId: '',
        anneeAutorisation: '',
        dateAffectationCCT: '',
        adresse: ''
      });
    }
  }, [initialValues]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('AgentFormModal - Données du formulaire à envoyer:', formData);
    onSubmit(formData);
  };

  if (!dropdownsLoaded) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Typography>Chargement des données...</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 4
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: '#1976d2', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pr: 1
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {initialValues ? 'Modifier Agent' : 'Ajouter Agent'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Informations personnelles */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2, pb: 1, borderBottom: '2px solid #e0e0e0' }}>
                Informations personnelles
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom *"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom *"
                value={formData.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CIN *"
                value={formData.cin}
                onChange={(e) => handleChange('cin', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Téléphone"
                value={formData.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.mail}
                onChange={(e) => handleChange('mail', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CNSS"
                value={formData.cnss}
                onChange={(e) => handleChange('cnss', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {/* Affectation et CAP */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2, pb: 1, borderBottom: '2px solid #e0e0e0', mt: 2 }}>
                Affectation et CAP
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <SearchableSelect
                label="CCT *"
                value={formData.cctId}
                onChange={(value) => handleChange('cctId', value)}
                options={dropdowns.ccts || []}
                placeholder="Rechercher un CCT..."
                getOptionLabel={(option) => option.nom}
                getOptionValue={(option) => option.id}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Numéro CAP"
                value={formData.numeroCAP}
                onChange={(e) => handleChange('numeroCAP', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date CAP"
                type="date"
                value={formData.dateCAP}
                onChange={(e) => handleChange('dateCAP', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date Expiration CAP"
                type="date"
                value={formData.dateExpirationCAP}
                onChange={(e) => handleChange('dateExpirationCAP', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SearchableSelect
                label="Catégorie CAP *"
                value={formData.categorieCAPId}
                onChange={(value) => handleChange('categorieCAPId', value)}
                options={dropdowns.categories || []}
                placeholder="Rechercher une catégorie CAP..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                required
                isStatusField={false}
                showDescriptions={true}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Numéro décision renouvellement"
                value={formData.numDecisionRenouv}
                onChange={(e) => handleChange('numDecisionRenouv', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date décision renouvellement"
                type="date"
                value={formData.dateDecisionRenouv}
                onChange={(e) => handleChange('dateDecisionRenouv', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {/* Statut et autorisation */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2, pb: 1, borderBottom: '2px solid #e0e0e0', mt: 2 }}>
                Statut et autorisation
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <SearchableSelect
                label="Statut administratif *"
                value={formData.statutAdministratifId}
                onChange={(value) => handleChange('statutAdministratifId', value)}
                options={dropdowns.statutsAdministratifs || []}
                placeholder="Rechercher un statut..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                isStatusField={true}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Année autorisation"
                type="number"
                value={formData.anneeAutorisation}
                onChange={(e) => handleChange('anneeAutorisation', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date affectation CCT"
                type="date"
                value={formData.dateAffectationCCT}
                onChange={(e) => handleChange('dateAffectationCCT', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                value={formData.adresse}
                onChange={(e) => handleChange('adresse', e.target.value)}
                multiline
                rows={3}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3
            }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3
            }}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 