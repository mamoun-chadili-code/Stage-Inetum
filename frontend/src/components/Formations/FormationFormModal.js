import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Box
} from '@mui/material';

export default function FormationFormModal({ open, onClose, onSubmit, initialValues = null, dropdowns = {} }) {
  // Composant pour l'astérisque rouge obligatoire
  const RequiredAsterisk = () => (
    <span style={{ color: '#f44336', marginLeft: '4px' }}>*</span>
  );

  // Fonction utilitaire pour formater les dates pour les champs input de type date
  const formatDateForInput = (dateString) => {
    console.log('formatDateForInput - Entrée:', dateString, 'Type:', typeof dateString);
    
    if (!dateString) {
      console.log('formatDateForInput - Date vide ou null, retourne chaîne vide');
      return '';
    }
    
    try {
      const date = new Date(dateString);
      console.log('formatDateForInput - Date créée:', date);
      
      if (isNaN(date.getTime())) {
        console.log('formatDateForInput - Date invalide, retourne chaîne vide');
        return '';
      }
      
      // Formater la date au format YYYY-MM-DD pour les champs input de type date
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      const result = `${year}-${month}-${day}`;
      console.log('formatDateForInput - Résultat formaté:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return '';
    }
  };

  // Fonction utilitaire pour formater les dates avec heure pour les champs input de type datetime-local
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // Formater la date au format YYYY-MM-DDTHH:MM pour les champs input de type datetime-local
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error('Erreur lors du formatage de la date/heure:', error);
      return '';
    }
  };

  const [form, setForm] = useState({
    intitule: '',
    cctId: '',
    agentId: '',
    chefCentreId: '',
    typeFormationId: '',
    matiere: '',
    dateDebut: '',
    dateFin: '',
    valideParFormateur: false,
    premierAnimateur: '',
    deuxiemeAnimateur: '',
    valideCHEH: false,
    dateValidation: ''
  });

  useEffect(() => {
    console.log('FormationFormModal - initialValues reçus:', initialValues);
    
    if (initialValues && initialValues.id) {
      console.log('FormationFormModal - Formatage des dates:');
      console.log('- dateDebut:', initialValues.dateDebut, '→', formatDateTimeForInput(initialValues.dateDebut));
      console.log('- dateFin:', initialValues.dateFin, '→', formatDateTimeForInput(initialValues.dateFin));
      console.log('- valideLe:', initialValues.valideLe, '→', formatDateForInput(initialValues.valideLe));
      
      setForm({
        intitule: initialValues.intitule || '',
        cctId: initialValues.cctId?.toString() || '',
        agentId: initialValues.agentId?.toString() || '',
        chefCentreId: initialValues.chefCentreId?.toString() || '',
        typeFormationId: initialValues.typeFormationId?.toString() || '',
        matiere: initialValues.matiere || '',
        dateDebut: initialValues.dateDebut ? formatDateTimeForInput(initialValues.dateDebut) : '',
        dateFin: initialValues.dateFin ? formatDateTimeForInput(initialValues.dateFin) : '',
        valideParFormateur: initialValues.valideParFormateur || false,
        premierAnimateur: initialValues.premierAnimateur || '',
        deuxiemeAnimateur: initialValues.deuxiemeAnimateur || '',
        valideCHEH: initialValues.valideCHEH || false,
        dateValidation: initialValues.valideLe ? formatDateForInput(initialValues.valideLe) : ''
      });
    } else {
      setForm({
        intitule: '',
        cctId: '',
        agentId: '',
        chefCentreId: '',
        typeFormationId: '',
        matiere: '',
        dateDebut: '',
        dateFin: '',
        valideParFormateur: false,
        premierAnimateur: '',
        deuxiemeAnimateur: '',
        valideCHEH: false,
        dateValidation: ''
      });
    }
  }, [initialValues, open]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const generateIntitule = () => {
    // Logs de débogage
    console.log('generateIntitule - form:', form);
    console.log('generateIntitule - dropdowns:', dropdowns);
    
    if (!form.cctId || !form.typeFormationId) {
      console.log('Champs requis manquants:', { cctId: form.cctId, typeFormationId: form.typeFormationId });
      return '';
    }
    
    // Vérifier que les dropdowns sont chargés
    if (!dropdowns.ccts || !dropdowns.typesFormation) {
      console.log('Dropdowns non chargés:', { ccts: dropdowns.ccts, typesFormation: dropdowns.typesFormation });
      return '';
    }
    
    // Récupérer le CCT et le type de formation
    const cct = dropdowns.ccts?.find(c => c.id.toString() === form.cctId.toString());
    const typeFormation = dropdowns.typesFormation?.find(t => t.id.toString() === form.typeFormationId.toString());
    
    console.log('Recherche CCT:', { recherche: form.cctId, trouve: cct });
    console.log('Recherche TypeFormation:', { recherche: form.typeFormationId, trouve: typeFormation });
    
    if (!cct || !typeFormation) {
      console.log('CCT ou Type formation non trouvé:', { cct, typeFormation });
      return '';
    }
    
    try {
      // Format: {CodeCCT}_{CodeTypeFormation}_{DateHeure}
      const now = new Date();
      const dateStr = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '');
      const timeStr = now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/:/g, '');
      
      // Utiliser les 3 premières lettres du nom CCT et les 6 premières lettres du libellé
      const cctCode = (cct.nom || '').substring(0, 3).toUpperCase().replace(/\s+/g, '');
      const typeCode = (typeFormation.libelle || '').substring(0, 6).toUpperCase().replace(/\s+/g, '');
      
      const result = `${cctCode}_${typeCode}_${dateStr}_${timeStr}`;
      console.log('Intitulé généré:', result);
      return result;
    } catch (error) {
      console.error('Erreur lors de la génération de l\'intitulé:', error);
      return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifier que les champs requis sont remplis
    if (!form.cctId || !form.typeFormationId || !form.matiere || !form.dateDebut || !form.dateFin) {
      alert('Veuillez remplir tous les champs obligatoires (CCT, Type de formation, Matière, Date début, Date fin).');
      return;
    }
    
    // Vérifier que la date de validation est remplie si les deux validations sont cochées
    if (form.valideParFormateur && form.valideCHEH && !form.dateValidation) {
      alert('La date de validation est obligatoire quand "Validé par formateur(s)" et "Validé CHEH" sont tous les deux cochés.');
      return;
    }
    
    // Générer l'intitulé automatiquement
    const intitule = generateIntitule();
    if (!intitule) {
      // Message d'erreur plus détaillé
      let errorMessage = 'Erreur lors de la génération de l\'intitulé. ';
      if (!form.cctId) {
        errorMessage += 'Veuillez sélectionner un CCT. ';
      }
      if (!form.typeFormationId) {
        errorMessage += 'Veuillez sélectionner un type de formation. ';
      }
      if (!dropdowns.ccts || dropdowns.ccts.length === 0) {
        errorMessage += 'Les CCTs ne sont pas chargés. ';
      }
      if (!dropdowns.typesFormation || dropdowns.typesFormation.length === 0) {
        errorMessage += 'Les types de formation ne sont pas chargés. ';
      }
      
      alert(errorMessage + 'Rechargez la page si le problème persiste.');
      return;
    }
    
    // Ajouter l'intitulé généré au formulaire et nettoyer les données
    const formWithIntitule = {
      ...form,
      intitule: intitule,
      // S'assurer que les IDs sont des nombres
      cctId: form.cctId ? parseInt(form.cctId) : null,
      agentId: form.agentId ? parseInt(form.agentId) : null,
      chefCentreId: form.chefCentreId ? parseInt(form.chefCentreId) : null,
      typeFormationId: form.typeFormationId ? parseInt(form.typeFormationId) : null,
      // Nettoyer les chaînes vides
      matiere: form.matiere?.trim() || '',
      premierAnimateur: form.premierAnimateur?.trim() || '',
      deuxiemeAnimateur: form.deuxiemeAnimateur?.trim() || '',
      valideLe: form.valideLe || null
    };
    
    console.log('Données envoyées au service:', formWithIntitule);
    onSubmit(formWithIntitule);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialValues?.id ? 'Modifier Formation' : 'Ajouter Formation'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2 }}>
            {/* Section Intitulé généré */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Intitulé de la formation (généré automatiquement)
              </Typography>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#f5f5f5', 
                borderRadius: 1, 
                border: '1px solid #e0e0e0',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#666' }}>
                  {form.cctId && form.typeFormationId ? generateIntitule() : 'Sélectionnez un CCT et un type de formation pour voir l\'intitulé généré'}
                </Typography>
                {form.cctId && form.typeFormationId && (
                  <Typography variant="caption" sx={{ color: '#1976d2', fontStyle: 'italic' }}>
                    ⚡ Généré automatiquement
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Section Informations principales */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Informations principales
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>

                
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>CCT<RequiredAsterisk /></InputLabel>
                  <Select
                    value={form.cctId}
                    onChange={(e) => handleChange('cctId', e.target.value)}
                    label="CCT"
                    required
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.ccts) && dropdowns.ccts.map(cct => (
                      <MenuItem key={cct.id} value={cct.id}>{cct.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
            
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>Agent<RequiredAsterisk /></InputLabel>
                  <Select
                    value={form.agentId}
                    onChange={(e) => handleChange('agentId', e.target.value)}
                    label="Agent"
                    required
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.agents) && dropdowns.agents.map(agent => (
                      <MenuItem key={agent.id} value={agent.id}>
                        {agent.nom} {agent.prenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>Chef centre<RequiredAsterisk /></InputLabel>
                  <Select
                    value={form.chefCentreId}
                    onChange={(e) => handleChange('chefCentreId', e.target.value)}
                    label="Chef centre"
                    required
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.chefsCentre) && dropdowns.chefsCentre.map(chef => (
                      <MenuItem key={chef.id} value={chef.id}>
                        {chef.nom} {chef.prenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" sx={{ minHeight: '56px' }}>
                  <InputLabel>Type de formation<RequiredAsterisk /></InputLabel>
                  <Select
                    value={form.typeFormationId}
                    onChange={(e) => handleChange('typeFormationId', e.target.value)}
                    label="Type de formation"
                    required
                  >
                    <MenuItem value="">Sélectionnez</MenuItem>
                    {Array.isArray(dropdowns.typesFormation) && dropdowns.typesFormation.map(type => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.libelle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
            {/* Section Matière */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Matière
              </Typography>
              <TextField
                label="Matière"
                value={form.matiere}
                onChange={(e) => handleChange('matiere', e.target.value)}
                fullWidth
                required
                margin="dense"
                multiline
                rows={3}
                sx={{ minHeight: '80px' }}
                InputLabelProps={{
                  children: (
                    <>
                      Matière
                      <RequiredAsterisk />
                    </>
                  )
                }}
              />
            </Box>
            
            {/* Section Dates */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Période de formation
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>
                <TextField
                  label="Début"
                  type="datetime-local"
                  value={form.dateDebut}
                  onChange={(e) => handleChange('dateDebut', e.target.value)}
                  fullWidth
                  required
                  margin="dense"
                  InputLabelProps={{ 
                    shrink: true,
                    children: (
                      <>
                        Début
                        <RequiredAsterisk />
                      </>
                    )
                  }}
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="Fin"
                  type="datetime-local"
                  value={form.dateFin}
                  onChange={(e) => handleChange('dateFin', e.target.value)}
                  fullWidth
                  required
                  margin="dense"
                  InputLabelProps={{ 
                    shrink: true,
                    children: (
                      <>
                        Fin
                        <RequiredAsterisk />
                      </>
                    )
                  }}
                  sx={{ minHeight: '56px' }}
                />
              </Box>
            </Box>
            
            {/* Section Validation */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Validation
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3,
                '& > *': { minWidth: '200px' }
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.valideParFormateur}
                      onChange={(e) => handleChange('valideParFormateur', e.target.checked)}
                    />
                  }
                  label="Validé par formateur(s)"
                  sx={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.valideCHEH}
                      onChange={(e) => handleChange('valideCHEH', e.target.checked)}
                    />
                  }
                  label="Validé CHEH"
                  sx={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}
                />
              </Box>
            </Box>
            
            {/* Section Animateurs */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Animateurs
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                '& > *': { minWidth: '250px', flex: '1 1 250px' }
              }}>
                <TextField
                  label="1er Animateur"
                  value={form.premierAnimateur}
                  onChange={(e) => handleChange('premierAnimateur', e.target.value)}
                  fullWidth
                  margin="dense"
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="2ème Animateur"
                  value={form.deuxiemeAnimateur}
                  onChange={(e) => handleChange('deuxiemeAnimateur', e.target.value)}
                  fullWidth
                  margin="dense"
                  sx={{ minHeight: '56px' }}
                />
                
                <TextField
                  label="Validé le"
                  type="date"
                  value={form.dateValidation}
                  onChange={(e) => handleChange('dateValidation', e.target.value)}
                  fullWidth
                  required={form.valideParFormateur && form.valideCHEH}
                  margin="dense"
                  InputLabelProps={{ 
                    shrink: true,
                    children: (
                      <>
                        Validé le
                        <RequiredAsterisk />
                      </>
                    )
                  }}
                  sx={{ 
                    minHeight: '56px',
                    display: (form.valideParFormateur && form.valideCHEH) ? 'block' : 'none'
                  }}
                  error={form.valideParFormateur && form.valideCHEH && !form.dateValidation}
                  helperText={form.valideParFormateur && form.valideCHEH && !form.dateValidation ? 'La date de validation est obligatoire quand les deux validations sont cochées' : ''}
                />
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 