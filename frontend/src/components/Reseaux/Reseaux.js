import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, MenuItem, InputLabel, FormControl, Pagination, CircularProgress,
  Typography, Divider, Box, Avatar, Chip, Autocomplete, FormHelperText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Added for logo upload button
import { toast } from 'react-toastify';
import reseauxService from '../../services/reseauxService';
import dropdownsService from '../../services/dropdownsService';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';

/**
 * COMPOSANT RÉSEAUX AVEC AUTOCOMPLETE
 * 
 * NOUVELLES FONCTIONNALITÉS :
 * - Autocomplete pour Ville avec recherche en temps réel
 * - Autocomplete pour Statut avec recherche en temps réel  
 * - Autocomplete pour Cadre d'autorisation avec recherche en temps réel
 * - Validation améliorée des sélections
 * - Interface moderne et intuitive
 */
// Fonction pour obtenir le style coloré des statuts
const getStatutStyle = (statutLibelle) => {
  // Vérifier que statutLibelle est une chaîne valide
  if (!statutLibelle || typeof statutLibelle !== 'string') {
    console.warn('⚠️ getStatutStyle appelé avec une valeur invalide:', statutLibelle);
    return { backgroundColor: '#e0e0e0', color: '#333' }; // Gris clair par défaut
  }
  
  switch (statutLibelle.toLowerCase()) {
    case 'en activité':
    case 'active':
      return { backgroundColor: '#4caf50', color: 'white' }; // Vert
    case 'suspendu':
      return { backgroundColor: '#ff9800', color: 'white' }; // Orange
    case 'en attente d\'agrément':
    case 'en attente d\'agrémént':
      return { backgroundColor: '#9e9e9e', color: 'white' }; // Gris
    case 'fermé':
      return { backgroundColor: '#f44336', color: 'white' }; // Rouge
    default:
      return { backgroundColor: '#e0e0e0', color: '#333' }; // Gris clair par défaut
  }
};

// Fonction pour obtenir le statut affiché et son style
const getStatutAffichage = (statutReseau) => {
  console.log('🔍 getStatutAffichage appelé avec:', statutReseau);
  
  // Utiliser directement les données de l'API
  let statutAAfficher = 'Statut inconnu';
  let couleurStatut = { backgroundColor: '#e0e0e0', color: '#333' };
  
  if (statutReseau) {
    // Si statutReseau est un objet avec nom (API)
    if (statutReseau.nom) {
      statutAAfficher = statutReseau.nom;
      couleurStatut = getStatutStyle(statutReseau.nom);
      console.log('✅ Statut utilisé depuis l\'API:', statutReseau.nom);
    }
    // Si statutReseau est un objet avec libelle (fallback)
    else if (statutReseau.libelle) {
      statutAAfficher = statutReseau.libelle;
      couleurStatut = getStatutStyle(statutReseau.libelle);
      console.log('✅ Statut utilisé depuis libelle:', statutReseau.libelle);
    }
    // Si statutReseau est une chaîne
    else if (typeof statutReseau === 'string') {
      statutAAfficher = statutReseau;
      couleurStatut = getStatutStyle(statutReseau);
      console.log('✅ Statut utilisé directement:', statutReseau);
    }
    // Si statutReseau est un ID numérique
    else if (typeof statutReseau === 'number') {
      console.log('⚠️ StatutReseau est un ID numérique, impossible de l\'afficher sans contexte');
    }
  }
  
  return { statutAAfficher, couleurStatut };
};

const REQUIRED_FIELDS = [
  'nom', 'agrement', 'dateAgrement', 'statut', 'dateStatut', 'adresseSiege', 'ville', 'tel', 'fax', 'mail', 'cadreAutorisation', 'nomRepresentantLegal', 'telRepresentantLegal', 'adressRepresentantLegal'
];

const emptyForm = {
  nom: '',
  agrement: '',
  dateAgrement: '',
  statut: '',
  dateStatut: '',
  adresseSiege: '',
  adresseDomiciliation: '',
  ville: '',
  tel: '',
  fax: '',
  mail: '',
  ice: '',
  idFiscal: '',
  registerCommerce: '',
  cadreAutorisation: '',
  nomRepresentantLegal: '',
  adressRepresentantLegal: '',
  telRepresentantLegal: '',
  mailRepresentant: '',
  logoFile: null
};

export default function Reseaux() {
  // États pour les données
  const [reseaux, setReseaux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdowns, setDropdowns] = useState({ statuts: [], villes: [], cadres: [] });
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

  // Nouveaux états pour les sélections Autocomplete
  const [selectedVille, setSelectedVille] = useState(null);
  const [selectedStatut, setSelectedStatut] = useState(null);
  const [selectedCadre, setSelectedCadre] = useState(null);

  // Vérifier que tous les dropdowns sont chargés
  const isDropdownsReady = dropdowns.statuts && dropdowns.statuts.length > 0 && 
                           dropdowns.villes && dropdowns.villes.length > 0 && 
                           dropdowns.cadres && dropdowns.cadres.length > 0;

  // États pour la pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // États pour la recherche
  const [search, setSearch] = useState({
    agrement: '',
    dateAgrement: '',
    statut: '',
    dateStatut: '',
    nom: ''
  });

  // États pour les modals
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formLoading, setFormLoading] = useState(false);

  // Charger les dropdowns au montage du composant
  useEffect(() => {
    // Charger les données du service directement
    loadDropdowns();
    // Charger les réseaux après l'initialisation
    setTimeout(() => loadReseaux(), 100);
  }, []);

  // Nouvelles fonctions de gestion des changements Autocomplete
  const handleVilleChange = (event, newValue) => {
    setSelectedVille(newValue);
    setForm({ ...form, ville: newValue?.id || '' });
  };

  const handleStatutChange = (event, newValue) => {
    setSelectedStatut(newValue);
    setForm({ ...form, statut: newValue?.id || '' });
  };

  const handleCadreChange = (event, newValue) => {
    setSelectedCadre(newValue);
    setForm({ ...form, cadreAutorisation: newValue?.id || '' });
  };

  // Charger les réseaux quand la page ou rowsPerPage changent
  useEffect(() => {
    if (dropdowns.statuts && dropdowns.statuts.length > 0) { // Attendre que les dropdowns soient chargés
      loadReseaux();
    }
  }, [page, rowsPerPage]);

  // Charger les réseaux quand search change (pour la réinitialisation)
  useEffect(() => {
    if (dropdowns.statuts && dropdowns.statuts.length > 0 && !loading) {
      loadReseaux();
    }
  }, [search]);

  // Charger les dropdowns dynamiques
  const loadDropdowns = async () => {
    try {
      setDropdownsLoading(true);
      const data = await dropdownsService.getAllDropdowns();
      console.log('✅ Données des dropdowns reçues depuis l\'API:', data);
      
      // Utiliser UNIQUEMENT les données de l'API
      const statutsFinaux = data.statuts || [];
      const villesFinales = data.villes || [];
      const cadresFinaux = data.cadresAutorisation || [];
      
      console.log('📊 Données finales des dropdowns:', {
        statuts: statutsFinaux,
        villes: villesFinales,
        cadres: cadresFinaux
      });
      
      setDropdowns({
        statuts: statutsFinaux,
        villes: villesFinales,
        cadres: cadresFinaux
      });
      
      // Vérifier que les statuts sont bien chargés
      console.log('✅ Statuts chargés depuis l\'API:', statutsFinaux);
      console.log('📊 Nombre de statuts:', statutsFinaux.length);
      
      if (statutsFinaux.length === 0) {
        console.warn('⚠️ Aucun statut chargé depuis l\'API');
        toast.warning('Aucun statut disponible - vérifiez la connexion à l\'API');
      }
    } catch (error) {
      console.error('❌ Erreur loadDropdowns:', error);
      toast.error('Erreur lors du chargement des données de référence');
      // En cas d'erreur, laisser les dropdowns vides
      setDropdowns({
        statuts: [],
        villes: [],
        cadres: []
      });
    } finally {
      setDropdownsLoading(false);
    }
  };

  // Charger la liste des réseaux
  const loadReseaux = async () => {
    try {
      setLoading(true);
      
      // Filtrer les paramètres vides
      const searchParams = {};
      Object.keys(search).forEach(key => {
        if (search[key] && search[key].toString().trim() !== '') {
          searchParams[key] = search[key];
        }
      });
      
      const params = {
        ...searchParams,
        page,
        pageSize: rowsPerPage
      };
      
      console.log('Chargement des réseaux avec params:', params);
      console.log('Paramètres de recherche originaux:', search);
      console.log('Paramètres de recherche filtrés:', searchParams);
      
      const result = await reseauxService.getReseaux(params);
      console.log('Résultat reçu:', result);
      
      setReseaux(result.data || []);
      setTotalCount(result.totalCount || 0);
      setPageCount(result.pageCount || 0);
      
      console.log(`${result.data?.length || 0} réseaux chargés sur ${result.totalCount || 0} total`);
    } catch (error) {
      toast.error('Erreur lors du chargement des réseaux');
      console.error('Erreur loadReseaux:', error);
      setReseaux([]);
      setTotalCount(0);
      setPageCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la recherche
  const handleSearchChange = e => setSearch({ ...search, [e.target.name]: e.target.value });
  
  const handleSearch = () => {
    console.log('Recherche lancée avec les paramètres:', search);
    
    // Vérifier qu'au moins un critère de recherche est rempli
    const hasSearchCriteria = search.nom || search.agrement || search.dateAgrement || search.statut || search.dateStatut;
    
    if (!hasSearchCriteria) {
      toast.warning('Veuillez remplir au moins un critère de recherche');
      return;
    }
    
    // Afficher les critères de recherche utilisés
    const usedCriteria = [];
    if (search.nom) usedCriteria.push(`Nom: "${search.nom}"`);
    if (search.agrement) usedCriteria.push(`Agrément: "${search.agrement}"`);
    if (search.dateAgrement) usedCriteria.push(`Date agrément: "${search.dateAgrement}"`);
    if (search.statut) usedCriteria.push(`Statut: "${search.statut}"`);
    if (search.dateStatut) usedCriteria.push(`Date statut: "${search.dateStatut}"`);
    
    console.log('Critères de recherche utilisés:', usedCriteria);
    toast.info(`Recherche lancée avec: ${usedCriteria.join(', ')}`);
    
    setPage(1); // Retour à la première page lors d'une recherche
    loadReseaux();
  };
  
  const handleReset = () => {
    console.log('Réinitialisation de la recherche');
    setSearch({ agrement: '', dateAgrement: '', statut: '', dateStatut: '', nom: '' });
    setPage(1);
    toast.success('Recherche réinitialisée - Affichage de tous les réseaux');
    // loadReseaux() sera déclenché automatiquement par le useEffect
  };

  // Recherche intelligente par agrément
  const handleAgrementSearch = async () => {
    if (!search.agrement.trim()) return;
    
    try {
      const found = await reseauxService.searchByAgrement(search.agrement);
      if (found) {
        toast.success(`Réseau trouvé : ${found.nom} (${found.agrement})`);
        setOpenDetails(true);
        setSelected(found);
      } else {
        toast.warning(`Aucun réseau trouvé avec l'agrément : ${search.agrement}`);
      }
    } catch (error) {
      toast.error('Erreur lors de la recherche');
    }
  };

  // Ouvrir le formulaire (ajout ou modification)
  const handleOpenForm = async (reseau) => {
    if (reseau) {
      const details = await reseauxService.getReseau(reseau.id);
      setForm({
        ...emptyForm,
        ...details,
        nom: details.nom || '',
        agrement: details.agrement || '',
        dateAgrement: details.dateAgrement ? details.dateAgrement.substring(0, 10) : '',
        statut: details.StatutId || details.statut?.id || '',
        dateStatut: details.dateStatut ? details.dateStatut.substring(0, 10) : '',
        adresseSiege: details.adresseSiege || '',
        ville: details.VilleId || details.ville?.id || '',
        tel: details.tel || '',
        fax: details.fax || '',
        mail: details.mail || '',
        cadreAutorisation: details.CadreAutorisationId || details.cadreAutorisation?.id || '',
        nomRepresentantLegal: details.nomRepresentantLegal || '',
        telRepresentantLegal: details.telRepresentantLegal || '',
        adressRepresentantLegal: details.adressRepresentantLegal || '',
        mailRepresentant: details.mailRepresentant || '',
        logoFile: null
      });

      // SETTER LES VALEURS SÉLECTIONNÉES POUR LES AUTOCOMPLETE
      const ville = dropdowns.villes?.find(v => v.id === (details.VilleId || details.ville?.id));
      const statut = dropdowns.statuts?.find(s => s.id === (details.StatutId || details.statut?.id));
      const cadre = dropdowns.cadres?.find(c => c.id === (details.CadreAutorisationId || details.cadreAutorisation?.id));
      
      setSelectedVille(ville || null);
      setSelectedStatut(statut || null);
      setSelectedCadre(cadre || null);
      
      setSelected(details);
    } else {
      setForm(emptyForm);
      setSelected(null);
      // RÉINITIALISER LES SÉLECTIONS
      setSelectedVille(null);
      setSelectedStatut(null);
      setSelectedCadre(null);
    }
    setOpenForm(true);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 === DÉBUT SOUMISSION ===');
    console.log('📋 État des sélections:', {
      selectedVille: selectedVille?.id,
      selectedStatut: selectedStatut?.id,
      selectedCadre: selectedCadre?.id
    });
    console.log('📝 État du formulaire:', form);
    
    // VALIDATION UNIFIÉE AVEC LES SÉLECTIONS
    if (!selectedVille || !selectedStatut || !selectedCadre) {
      console.log('❌ Validation des sélections échouée');
      toast.error('Veuillez sélectionner tous les champs obligatoires (Ville, Statut, Cadre d\'autorisation)');
      return;
    }
    
    console.log('✅ Validation des sélections réussie');
    
    // Validation des autres champs obligatoires
    const fieldsToValidate = ['nom', 'agrement', 'dateAgrement', 'dateStatut', 'adresseSiege', 'tel', 'fax', 'mail', 'nomRepresentantLegal', 'telRepresentantLegal', 'adressRepresentantLegal'];
    
    for (const field of fieldsToValidate) {
      const value = form[field];
      if (!value || value.toString().trim() === '') {
        const fieldLabels = {
          nom: 'Réseau',
          agrement: 'Agrément',
          dateAgrement: 'Date agrément',
          dateStatut: 'Date statut',
          adresseSiege: 'Adresse siège',
          tel: 'Téléphone',
          fax: 'Fax',
          mail: 'Email',
          nomRepresentantLegal: 'Nom du représentant légal',
          telRepresentantLegal: 'Téléphone du représentant légal',
          adressRepresentantLegal: 'Adresse du représentant légal'
        };
        console.log(`❌ Champ ${field} vide:`, value);
        toast.error(`Le champ "${fieldLabels[field] || field}" est obligatoire.`);
        return;
      }
    }

    console.log('✅ Validation de tous les champs réussie');

    try {
      setFormLoading(true);
      
      // CRÉER LES DONNÉES FINALES AVEC LES SÉLECTIONS
      const formData = {
        ...form,
        ville: selectedVille.id,
        statut: selectedStatut.id,
        cadreAutorisation: selectedCadre.id
      };
      
      console.log('📤 Formulaire envoyé avec données finales:', formData);
      
      let reseauId;
      if (selected) {
        // Modification
        const updatedReseau = await reseauxService.updateReseau(selected.id, formData);
        reseauId = selected.id;
        toast.success('Réseau modifié avec succès');
      } else {
        // Ajout
        const newReseau = await reseauxService.createReseau(formData);
        reseauId = newReseau.id;
        toast.success('Réseau ajouté avec succès');
      }
      
      // Upload du logo si présent
      if (form.logoFile && reseauId) {
        try {
          await reseauxService.uploadLogo(reseauId, form.logoFile);
          toast.success('Logo uploadé avec succès');
        } catch (logoError) {
          console.error('Erreur upload logo:', logoError);
          toast.warning('Logo non uploadé mais réseau créé/modifié');
        }
      }
      
      setOpenForm(false);
      // RÉINITIALISER LES SÉLECTIONS
      setSelectedVille(null);
      setSelectedStatut(null);
      setSelectedCadre(null);
      loadReseaux(); // Recharger la liste
      console.log('✅ Soumission terminée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la soumission:', error);
      toast.error(selected ? 'Erreur lors de la modification' : 'Erreur lors de l\'ajout');
    } finally {
      setFormLoading(false);
    }
  };

  // Suppression d'un réseau
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce réseau ?')) return;
    
    try {
      await reseauxService.deleteReseau(id);
      toast.success('Réseau supprimé avec succès');
      loadReseaux(); // Recharger la liste
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error('Erreur delete:', error);
    }
  };

  // Gestion du logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      // Stocker le fichier pour l'upload
      setForm(prev => ({ ...prev, logoFile: file }));
      toast.success('Logo sélectionné avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sélection du logo');
      console.error('Erreur logo:', error);
    }
  };

  // Supprimer le logo
  const handleLogoRemove = () => {
    setForm(prev => ({ ...prev, logoFile: null }));
    toast.success('Logo supprimé');
  };

  // Fonction de réinitialisation du formulaire
  const resetForm = () => {
    setForm(emptyForm);
    setSelectedVille(null);
    setSelectedStatut(null);
    setSelectedCadre(null);
    setSelected(null);
  };

  // Afficher un indicateur de chargement si les dropdowns ne sont pas prêts
  if (dropdownsLoading || !isDropdownsReady) {
    return (
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={40} />
          <Typography variant="body1" style={{ marginTop: '16px' }}>
            Chargement des données de référence...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Titre principal centré */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        pt: 2,
        pb: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            color: '#1976d2', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          Gestion des Réseaux
        </Typography>

      </Box>

      {/* Section Recherche avancée */}
      <div style={{ background: '#f5f7fa', padding: 16, borderRadius: 8, marginBottom: 24 }}>
        <h3>Recherche</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <TextField 
            label="Nom du réseau" 
            name="nom" 
            value={search.nom || ''} 
            onChange={handleSearchChange} 
            size="small" 
            placeholder="Rechercher par nom"
          />
          <TextField 
            label="Agrément" 
            name="agrement" 
            value={search.agrement} 
            onChange={handleSearchChange} 
            size="small" 
            placeholder="Rechercher par agrément"
          />
          <TextField 
            label="Date agrément" 
            name="dateAgrement" 
            type="date" 
            value={search.dateAgrement} 
            onChange={handleSearchChange} 
            size="small" 
            InputLabelProps={{ shrink: true }} 
          />
          <FormControl size="small" style={{ minWidth: 160 }}>
            <InputLabel>Statut</InputLabel>
            <Select label="Statut" name="statut" value={search.statut || ''} onChange={handleSearchChange}>
              <MenuItem value=""><em>Tous les statuts</em></MenuItem>
              {(() => {
                console.log('🔍 Rendu du dropdown de recherche - État actuel:', {
                  dropdownsStatuts: dropdowns.statuts,
                  dropdownsStatutsLength: dropdowns.statuts?.length,
                  dropdownsStatutsType: typeof dropdowns.statuts,
                  dropdownsKeys: Object.keys(dropdowns)
                });
                
                if (dropdowns.statuts && dropdowns.statuts.length > 0) {
                  console.log('✅ Utilisation des statuts chargés:', dropdowns.statuts);
                  return dropdowns.statuts.map(s => (
                    <MenuItem key={s.id} value={s.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%',
                            ...getStatutStyle(s.nom || s.libelle || 'Statut inconnu')
                          }} 
                        />
                        {s.nom || s.libelle || 'Statut inconnu'}
                      </Box>
                    </MenuItem>
                  ));
                } else {
                  console.log('⚠️ Utilisation du fallback - dropdowns.statuts est vide ou undefined');
                  const fallbackStatuts = [
                    { id: 1, libelle: 'En activité' },
                    { id: 2, libelle: 'En attente d\'agrément' },
                    { id: 3, libelle: 'Suspendu' },
                    { id: 4, libelle: 'Fermé' }
                  ];
                  console.log('📋 Données de fallback utilisées:', fallbackStatuts);
                  return fallbackStatuts.map(s => (
                    <MenuItem key={s.id} value={s.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%',
                            ...getStatutStyle(s.libelle || 'Statut inconnu')
                          }} 
                        />
                        {s.libelle || 'Statut inconnu'}
                      </Box>
                    </MenuItem>
                  ));
                }
              })()}
            </Select>
          </FormControl>
          <TextField 
            label="Date statut" 
            name="dateStatut" 
            type="date" 
            value={search.dateStatut} 
            onChange={handleSearchChange} 
            size="small" 
            InputLabelProps={{ shrink: true }} 
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch} 
            style={{ alignSelf: 'center' }}
            disabled={loading}
          >
            Rechercher
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleReset} 
            style={{ alignSelf: 'center' }}
            disabled={loading}
          >
            Annuler
          </Button>
          {search.agrement && (
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleAgrementSearch} 
              style={{ alignSelf: 'center' }}
              disabled={loading}
            >
              Rechercher par agrément
            </Button>
          )}
        </div>
      </div>

      {/* Section Réseaux */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h3>RÉSEAUX</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Sélecteur d'éléments par page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Éléments par page :
            </span>
            <Select 
              value={rowsPerPage} 
              onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }} 
              size="small" 
              style={{ minWidth: 120 }}
              disabled={loading}
            >
              {[5, 10, 20].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </div>

          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => handleOpenForm(null)}
            disabled={loading}
          >
            Ajouter Réseau
          </Button>
        </div>
      </div>

      {/* Tableau des réseaux */}
              <Table size="small" sx={{ border: '2px solid #e0e0e0', borderRadius: 1 }}>
        <TableHead>
                      <TableRow sx={{ backgroundColor: '#F2F2F5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Réseau</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Agrément</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date agrément</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date statut</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Adr. Siège</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ville</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : reseaux.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                Aucun réseau trouvé
              </TableCell>
            </TableRow>
          ) : (
            reseaux.map(r => (
              <TableRow key={r.id}>
                <TableCell>
                  {r.logoUrl ? (
                    <img 
                      src={`http://localhost:7000${r.logoUrl}`} 
                      alt="logo" 
                      width={32} 
                      height={32} 
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                  ) : (
                    <span style={{ color: '#bbb' }}>—</span>
                  )}
                </TableCell>
                <TableCell>{r.nom}</TableCell>
                <TableCell>{r.agrement}</TableCell>
                <TableCell>{new Date(r.dateAgrement).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{new Date(r.dateStatut).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>{r.adresseSiege}</TableCell>
                <TableCell>{r.ville?.nom || r.ville}</TableCell>
                                <TableCell>
                  {(() => {
                    const { statutAAfficher, couleurStatut } = getStatutAffichage(r.statut);
                    return (
                      <Chip 
                        label={statutAAfficher} 
                        sx={couleurStatut} 
                      />
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => handleOpenForm(r)}
                    disabled={loading}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(r.id)}
                    disabled={loading}
                  >
                                            <AutoDeleteIcon />
                  </IconButton>
                  <IconButton 
                    color="info" 
                    onClick={() => { setOpenDetails(true); setSelected(r); }}
                    disabled={loading}
                    sx={{ background: '#e3f2fd', borderRadius: 2, ml: 1 }}
                  >
                    <PrivacyTipIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {/* Bouton première page */}
          <IconButton
            onClick={() => setPage(1)}
            disabled={page === 1}
            sx={{
              color: page === 1 ? '#bdbdbd' : '#1976d2',
              '&:hover': {
                backgroundColor: page === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
              }
            }}
          >
            <FirstPageIcon />
          </IconButton>

          {/* Bouton page précédente */}
          <IconButton
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            sx={{
              color: page === 1 ? '#bdbdbd' : '#1976d2',
              '&:hover': {
                backgroundColor: page === 1 ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Numéros de page */}
          {Array.from({ length: Math.min(3, pageCount) }, (_, i) => {
            let pageNum;
            if (pageCount <= 3) {
              pageNum = i + 1;
            } else if (page <= 2) {
              pageNum = i + 1;
            } else if (page >= pageCount - 1) {
              pageNum = pageCount - 2 + i;
            } else {
              pageNum = page - 1 + i;
            }

            if (pageNum > 0 && pageNum <= pageCount) {
              return (
                <IconButton
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  sx={{
                    backgroundColor: page === pageNum ? '#1976d2' : 'transparent',
                    color: page === pageNum ? 'white' : '#424242',
                    minWidth: 36,
                    height: 36,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: page === pageNum ? '#1976d2' : 'rgba(25, 118, 210, 0.1)'
                    }
                  }}
                >
                  {pageNum}
                </IconButton>
              );
            }
            return null;
          })}

          {/* Bouton page suivante */}
          <IconButton
            onClick={() => setPage(page + 1)}
            disabled={page >= pageCount}
            sx={{
              color: page >= pageCount ? '#bdbdbd' : '#1976d2',
              '&:hover': {
                backgroundColor: page >= pageCount ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Bouton dernière page */}
          <IconButton
            onClick={() => setPage(pageCount)}
            disabled={page >= pageCount}
            sx={{
              color: page >= pageCount ? '#bdbdbd' : '#1976d2',
              '&:hover': {
                backgroundColor: page >= pageCount ? 'transparent' : 'rgba(25, 118, 210, 0.1)'
              }
            }}
          >
            <LastPageIcon />
          </IconButton>
        </Box>

        {/* Informations d'affichage en dessous */}
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Affichage de {((page - 1) * rowsPerPage) + 1} à {Math.min(page * rowsPerPage, totalCount)} sur {totalCount} réseaux
        </Typography>
      </Box>

      {/* Modal Ajout/Modification Réseau */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selected ? 'Modifier Réseau' : 'Ajouter Réseau'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                {/* Logo */}
                <div style={{ marginBottom: 16 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Logo du réseau
                  </Typography>
                  
                  {/* Aperçu du logo */}
                  {form.logoFile && (
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                      <img 
                        src={URL.createObjectURL(form.logoFile)} 
                        alt="Aperçu du logo" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: 100, 
                          objectFit: 'contain',
                          border: '1px solid #ddd',
                          borderRadius: 4
                        }} 
                      />
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={handleLogoRemove}
                        sx={{ mt: 1 }}
                      >
                        Supprimer le logo
                      </Button>
                    </Box>
                  )}
                  
                  {/* Bouton d'upload */}
                  <Button 
                    variant="outlined" 
                    component="label" 
                    fullWidth
                    disabled={formLoading}
                    startIcon={<CloudUploadIcon />}
                  >
                    {form.logoFile ? 'Changer le logo' : 'Sélectionner un logo'}
                    <input type="file" hidden onChange={handleLogoUpload} accept="image/*" />
                  </Button>
                  
                  <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                    Formats acceptés : PNG, JPG, JPEG. Taille max : 5MB
                  </Typography>
                </div>
                <TextField 
                  label="Réseau" 
                  name="nom" 
                  value={form.nom || ''} 
                  onChange={e => setForm({ ...form, nom: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Agrément" 
                  name="agrement" 
                  value={form.agrement || ''} 
                  onChange={e => setForm({ ...form, agrement: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Date agrément" 
                  name="dateAgrement" 
                  type="date" 
                  value={form.dateAgrement || ''} 
                  onChange={e => setForm({ ...form, dateAgrement: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  InputLabelProps={{ shrink: true }} 
                  required 
                  disabled={formLoading}
                />
                {/* STATUT AVEC DROPDOWN SIMPLE */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Statut</InputLabel>
                  <Select 
                    label="Statut" 
                    name="statut" 
                    value={selectedStatut?.id || ''} 
                    onChange={(event) => {
                      const selectedId = event.target.value;
                      console.log('🔍 Sélection statut - ID sélectionné:', selectedId);
                      const selectedStatutObj = dropdowns.statuts?.find(s => s.id === selectedId);
                      console.log('🔍 Statut objet trouvé:', selectedStatutObj);
                      setSelectedStatut(selectedStatutObj);
                      setForm({ ...form, statut: selectedId });
                      console.log('✅ Statut mis à jour dans le form:', selectedId);
                    }}
                    required
                    disabled={formLoading || dropdownsLoading}
                  >
                    {dropdowns.statuts?.map(s => (
                      <MenuItem key={s.id} value={s.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box 
                            sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%',
                              ...getStatutStyle(s.nom || s.libelle || 'Statut inconnu')
                            }} 
                          />
                          {s.nom || s.libelle || 'Statut inconnu'}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                  {dropdowns.statuts && dropdowns.statuts.length > 0 && (
                    <FormHelperText>
                      {dropdowns.statuts.length} statut(s) disponible(s)
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField 
                  label="Date statut" 
                  name="dateStatut" 
                  type="date" 
                  value={form.dateStatut || ''} 
                  onChange={e => setForm({ ...form, dateStatut: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  InputLabelProps={{ shrink: true }} 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Adr. Siège" 
                  name="adresseSiege" 
                  value={form.adresseSiege || ''} 
                  onChange={e => setForm({ ...form, adresseSiege: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Adr. domiciliation" 
                  name="adresseDomiciliation" 
                  value={form.adresseDomiciliation || ''} 
                  onChange={e => setForm({ ...form, adresseDomiciliation: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                {/* VILLE AVEC AUTOCOMPLETE */}
                <Autocomplete
                  options={dropdowns.villes || []}
                  getOptionLabel={(option) => option.nom}
                  value={selectedVille}
                  onChange={handleVilleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ville *"
                      required
                      placeholder="Tapez pour rechercher une ville..."
                      error={!selectedVille}
                      helperText={!selectedVille ? "Ville requise" : ""}
                      fullWidth
                      margin="normal"
                      disabled={formLoading || dropdownsLoading}
                    />
                  )}
                  filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                      option.nom.toLowerCase().includes(inputValue.toLowerCase()) ||
                      option.code?.toLowerCase().includes(inputValue.toLowerCase())
                    )
                  }
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  noOptionsText="Aucune ville trouvée"
                  loading={!dropdowns.villes || dropdowns.villes.length === 0}
                  loadingText="Chargement des villes..."
                />
                <TextField 
                  label="Tel" 
                  name="tel" 
                  value={form.tel || ''} 
                  onChange={e => setForm({ ...form, tel: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <TextField 
                  label="Fax" 
                  name="fax" 
                  value={form.fax || ''} 
                  onChange={e => setForm({ ...form, fax: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Mail" 
                  name="mail" 
                  value={form.mail} 
                  onChange={e => setForm({ ...form, mail: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="ICE" 
                  name="ice" 
                  value={form.ice || ''} 
                  onChange={e => setForm({ ...form, ice: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <TextField 
                  label="Id. Fiscal" 
                  name="idFiscal" 
                  value={form.idFiscal || ''} 
                  onChange={e => setForm({ ...form, idFiscal: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <TextField 
                  label="N° RegisterCommerce" 
                  name="registerCommerce" 
                  value={form.registerCommerce || ''} 
                  onChange={e => setForm({ ...form, registerCommerce: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                {/* CADRE AUTORISATION AVEC DROPDOWN SIMPLE */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Cadre d'autorisation</InputLabel>
                  <Select 
                    label="Cadre d'autorisation" 
                    name="cadreAutorisation" 
                    value={selectedCadre?.id || ''} 
                    onChange={(event) => {
                      const selectedId = event.target.value;
                      console.log('🔍 Sélection cadre - ID sélectionné:', selectedId);
                      const selectedCadreObj = dropdowns.cadres?.find(c => c.id === selectedId);
                      console.log('🔍 Cadre objet trouvé:', selectedCadreObj);
                      setSelectedCadre(selectedCadreObj);
                      setForm({ ...form, cadreAutorisation: selectedId });
                      console.log('✅ Cadre mis à jour dans le form:', selectedId);
                    }}
                    required
                    disabled={formLoading || dropdownsLoading}
                  >
                    {dropdowns.cadres?.map(c => (
                      <MenuItem key={c.id} value={c.id}>{c.libelle || 'Cadre inconnu'}</MenuItem>
                    ))}
                  </Select>
                  {dropdowns.cadres && dropdowns.cadres.length > 0 && (
                    <FormHelperText>
                      {dropdowns.cadres.length} cadre(s) disponible(s)
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField
                  label="Nom représentant légal"
                  name="nomRepresentantLegal"
                  value={form.nomRepresentantLegal}
                  onChange={e => setForm({ ...form, nomRepresentantLegal: e.target.value })}
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField
                  label="Adresse représentant légal"
                  name="adressRepresentantLegal"
                  value={form.adressRepresentantLegal}
                  onChange={e => setForm({ ...form, adressRepresentantLegal: e.target.value })}
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField
                  label="N° tel représentant légal"
                  name="telRepresentantLegal"
                  value={form.telRepresentantLegal}
                  onChange={e => setForm({ ...form, telRepresentantLegal: e.target.value })}
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Mail représentant" 
                  name="mailRepresentant" 
                  value={form.mailRepresentant || ''} 
                  onChange={e => setForm({ ...form, mailRepresentant: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenForm(false); resetForm(); }} disabled={formLoading}>
              Annuler
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={formLoading || !selectedVille || !selectedStatut || !selectedCadre}
              startIcon={formLoading ? <CircularProgress size={16} /> : null}
            >
              {formLoading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal Détails Réseau moderne */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PrivacyTipIcon color="info" />
          <span>Détails du Réseau</span>
        </DialogTitle>
        <DialogContent>
          {selected && (
            <>
              {console.log('🔍 Données du réseau sélectionné:', selected)}
              {console.log('🔍 Structure du statut:', selected.statut)}
              {console.log('🔍 Structure du cadre:', selected.cadreAutorisation)}
              {console.log('🔍 Structure de la ville:', selected.ville)}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    src={selected.logoUrl ? `http://localhost:7000${selected.logoUrl}` : undefined}
                    alt="logo"
                    sx={{ width: 80, height: 80, bgcolor: '#e3f2fd', fontSize: 32 }}
                  >
                    {selected.nom?.charAt(0) || '?'}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selected.nom}</Typography>
                    <Typography variant="body2" color="text.secondary">{selected.agrement}</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <div>
                    <Typography variant="subtitle2">Statut</Typography>
                    <Chip 
                      label={selected.statut?.nom || selected.statut?.libelle || selected.statut || 'Statut inconnu'} 
                      sx={{ ...getStatutStyle(selected.statut?.nom || selected.statut?.libelle || selected.statut || 'Statut inconnu') }} 
                    />
                  </div>
                  <div>
                    <Typography variant="subtitle2">Cadre d'autorisation</Typography>
                    <Typography>{selected.cadreAutorisation?.libelle || selected.cadreAutorisation?.nom || selected.cadreAutorisation || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Date agrément</Typography>
                    <Typography>{selected.dateAgrement ? new Date(selected.dateAgrement).toLocaleDateString('fr-FR') : '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Date statut</Typography>
                    <Typography>{selected.dateStatut ? new Date(selected.dateStatut).toLocaleDateString('fr-FR') : '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Ville</Typography>
                    <Typography>{selected.ville?.nom || selected.ville || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Adresse siège</Typography>
                    <Typography>{selected.adresseSiege}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Adresse domiciliation</Typography>
                    <Typography>{selected.adresseDomiciliation || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Téléphone</Typography>
                    <Typography>{selected.tel || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Fax</Typography>
                    <Typography>{selected.fax || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Mail</Typography>
                    <Typography>{selected.mail || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">ICE</Typography>
                    <Typography>{selected.ice || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Id. Fiscal</Typography>
                    <Typography>{selected.idFiscal || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">N° RegisterCommerce</Typography>
                    <Typography>{selected.registerCommerce || '—'}</Typography>
                  </div>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <div>
                    <Typography variant="subtitle2">Nom représentant légal</Typography>
                    <Typography>{selected.nomRepresentantLegal || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Adresse représentant légal</Typography>
                    <Typography>{selected.adressRepresentantLegal || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">N° tel représentant légal</Typography>
                    <Typography>{selected.telRepresentantLegal || '—'}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">Mail représentant</Typography>
                    <Typography>{selected.mailRepresentant || '—'}</Typography>
                  </div>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)} variant="outlined">Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 