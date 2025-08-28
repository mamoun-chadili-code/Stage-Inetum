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
import SearchableSelect from '../Commun/SearchableSelect';

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
          boxShadow: 4,
          minWidth: '1100px',
          width: '95vw',
          maxWidth: '1400px'
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
        <DialogContent sx={{ p: 4, minWidth: '1000px' }}>
          {/* Section Informations personnelles */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Informations personnelles
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <TextField
                fullWidth
                label="Nom *"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Prénom *"
                value={formData.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="CIN *"
                value={formData.cin}
                onChange={(e) => handleChange('cin', e.target.value)}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Téléphone"
                value={formData.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.mail}
                onChange={(e) => handleChange('mail', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="CNSS"
                value={formData.cnss}
                onChange={(e) => handleChange('cnss', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
          </Box>

          {/* Section Affectation et CAP */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Affectation et CAP
            </Typography>
            
            {/* CCT - Champ principal */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>CCT *</InputLabel>
                <Select 
                  label="CCT *" 
                  name="cctId" 
                  value={formData.cctId || ''} 
                  onChange={(e) => handleChange('cctId', e.target.value)} 
                  required
                >
                  {dropdowns.ccts?.map(cct => (
                    <MenuItem key={cct.id} value={cct.id}>
                      {cct.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Champs CAP en grille 2 colonnes */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, mb: 3 }}>
              <TextField
                fullWidth
                label="Numéro CAP"
                value={formData.numeroCAP}
                onChange={(e) => handleChange('numeroCAP', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Date CAP"
                type="date"
                value={formData.dateCAP}
                onChange={(e) => handleChange('dateCAP', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Date Expiration CAP"
                type="date"
                value={formData.dateExpirationCAP}
                onChange={(e) => handleChange('dateExpirationCAP', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Numéro décision renouvellement"
                value={formData.numDecisionRenouv}
                onChange={(e) => handleChange('numDecisionRenouv', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>

            {/* Date décision renouvellement - pleine largeur */}
            <TextField
              fullWidth
              label="Date décision renouvellement"
              type="date"
              value={formData.dateDecisionRenouv}
              onChange={(e) => handleChange('dateDecisionRenouv', e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            {/* Catégorie CAP */}
            <Box sx={{ mt: 3 }}>
              <SearchableSelect
                label="Catégorie CAP *"
                value={formData.categorieCAPId}
                onChange={(value) => handleChange('categorieCAPId', value)}
                options={dropdowns.categories || []}
                placeholder="Rechercher une catégorie..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                isCategorieField={true}
                showDescriptions={true}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    minHeight: '56px'
                  }
                }}
              />
            </Box>
          </Box>

          {/* Section Statut et autorisation */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Statut et autorisation
            </Typography>
            
            {/* Statut administratif avec descriptions et couleurs */}
            <Box sx={{ mb: 3 }}>
              <SearchableSelect
                label="Statut administratif *"
                value={formData.statutAdministratifId}
                onChange={(value) => handleChange('statutAdministratifId', value)}
                options={dropdowns.statutsAdministratifs || []}
                placeholder="Rechercher un statut..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                isStatusField={true}
                showDescriptions={true}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    minHeight: '56px'
                  }
                }}
              />
            </Box>

            {/* Champs autorisation en grille 2 colonnes */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <TextField
                fullWidth
                label="Année autorisation"
                type="number"
                value={formData.anneeAutorisation}
                onChange={(e) => handleChange('anneeAutorisation', e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Date affectation CCT"
                type="date"
                value={formData.dateAffectationCCT}
                onChange={(e) => handleChange('dateAffectationCCT', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
          </Box>

          {/* Section Adresse */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Adresse
            </Typography>
            
            <TextField
              fullWidth
              label="Adresse"
              value={formData.adresse}
              onChange={(e) => handleChange('adresse', e.target.value)}
              multiline
              rows={3}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
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