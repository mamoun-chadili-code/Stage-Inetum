import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, MenuItem, InputLabel, FormControl, Pagination, CircularProgress,
  Typography, Divider, Box, Avatar, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Added for logo upload button
import { toast } from 'react-toastify';
import reseauxService from '../../services/reseauxService';
import dropdownsService from '../../services/dropdownsService';

// Fonction pour obtenir le style coloré des statuts
const getStatutStyle = (statutLibelle) => {
  switch (statutLibelle?.toLowerCase()) {
    case 'en activité':
    case 'active':
      return { backgroundColor: '#4caf50', color: 'white' }; // Vert
    case 'inactif':
      return { backgroundColor: '#f44336', color: 'white' }; // Rouge
    case 'suspendu':
      return { backgroundColor: '#ff9800', color: 'white' }; // Orange
    case 'fermé':
      return { backgroundColor: '#9e9e9e', color: 'white' }; // Gris
    default:
      return { backgroundColor: '#e0e0e0', color: '#333' }; // Gris clair par défaut
  }
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
  logo: ''
};

export default function Reseaux() {
  // États pour les données
  const [reseaux, setReseaux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdowns, setDropdowns] = useState({ statuts: [], villes: [], cadres: [] });
  const [dropdownsLoading, setDropdownsLoading] = useState(true);

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
    loadDropdowns();
    loadReseaux(); // Charger les réseaux au montage
  }, []);

  // Charger les réseaux quand la page ou rowsPerPage changent
  useEffect(() => {
    if (dropdowns.statuts.length > 0) { // Attendre que les dropdowns soient chargés
      loadReseaux();
    }
  }, [page, rowsPerPage]);

  // Charger les réseaux quand search change (pour la réinitialisation)
  useEffect(() => {
    if (dropdowns.statuts.length > 0 && !loading) {
      loadReseaux();
    }
  }, [search]);

  // Charger les dropdowns dynamiques
  const loadDropdowns = async () => {
    try {
      setDropdownsLoading(true);
      const data = await dropdownsService.getAllDropdowns();
      console.log('Données des dropdowns reçues:', data);
      
      setDropdowns({
        statuts: data.statuts || [], // getStatutsRC() retourne les statuts des réseaux
        villes: data.villes || [],
        cadres: data.cadresAutorisation || []
      });
      
      console.log('Dropdowns configurés:', {
        statuts: data.statuts || [],
        villes: data.villes || [],
        cadres: data.cadresAutorisation || []
      });
    } catch (error) {
      console.error('Erreur loadDropdowns:', error);
      toast.error('Erreur lors du chargement des données de référence');
      // Utiliser des données par défaut en cas d'erreur
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
        nomRepresentantLegal: details.nomRepresentantLegal || '',
        adressRepresentantLegal: details.adressRepresentantLegal || '',
        telRepresentantLegal: details.telRepresentantLegal || '',
        statut: details.StatutId || details.statut?.id || '',
        ville: details.VilleId || details.ville?.id || '',
        cadreAutorisation: details.CadreAutorisationId || details.cadreAutorisation?.id || '',
        dateAgrement: details.dateAgrement ? details.dateAgrement.substring(0, 10) : '',
        dateStatut: details.dateStatut ? details.dateStatut.substring(0, 10) : '',
        mailRepresentant: details.mailRepresentant || '',
        logo: details.logo || ''
      });
      setSelected(details);
    } else {
      setForm(emptyForm);
      setSelected(null);
    }
    setOpenForm(true);
  };

  // Validation des champs obligatoires
  const validateForm = () => {
    console.log('Validation du formulaire avec les valeurs:', form);
    
    for (const field of REQUIRED_FIELDS) {
      const value = form[field];
      console.log(`Vérification du champ ${field}:`, value);
      
      if (!value || value.toString().trim() === '') {
        const fieldLabels = {
          nom: 'Réseau',
          agrement: 'Agrément',
          dateAgrement: 'Date agrément',
          statut: 'Statut',
          dateStatut: 'Date statut',
          adresseSiege: 'Adresse siège',
          ville: 'Ville',
          tel: 'Téléphone',
          fax: 'Fax',
          mail: 'Email',
          cadreAutorisation: 'Cadre d\'autorisation',
          nomRepresentantLegal: 'Nom du représentant légal',
          telRepresentantLegal: 'Téléphone du représentant légal',
          adressRepresentantLegal: 'Adresse du représentant légal'
        };
        toast.error(`Le champ "${fieldLabels[field] || field}" est obligatoire.`);
        return false;
      }
    }
    
    console.log('Validation réussie !');
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Tentative de soumission du formulaire');
    
    if (!validateForm()) {
      console.log('Validation échouée, arrêt de la soumission');
      return;
    }

    // Validation du cadre d'autorisation - plus flexible
    if (!form.cadreAutorisation) {
      toast.error('Veuillez sélectionner un cadre d\'autorisation.');
      return;
    }

    try {
      setFormLoading(true);
      console.log('Formulaire envoyé:', form);
      
      if (selected) {
        // Modification
        await reseauxService.updateReseau(selected.id, form);
        toast.success('Réseau modifié avec succès');
      } else {
        // Ajout
        await reseauxService.createReseau(form);
        toast.success('Réseau ajouté avec succès');
      }
      
      setOpenForm(false);
      loadReseaux(); // Recharger la liste
    } catch (error) {
      toast.error(selected ? 'Erreur lors de la modification' : 'Erreur lors de l\'ajout');
      console.error('Erreur submit:', error);
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
      // Convertir le fichier en base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1]; // Enlever le préfixe data:image/...
        setForm(prev => ({ ...prev, logo: base64String }));
        toast.success('Logo sélectionné avec succès');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Erreur lors de la lecture du logo');
      console.error('Erreur logo:', error);
    }
  };

  // Supprimer le logo
  const handleLogoRemove = () => {
    setForm(prev => ({ ...prev, logo: '' }));
    toast.success('Logo supprimé');
  };

  return (
    <div>
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
              {dropdowns.statuts.map(s => (
                <MenuItem key={s.id} value={s.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%',
                        ...getStatutStyle(s.libelle)
                      }} 
                    />
                    {s.libelle}
                  </Box>
                </MenuItem>
              ))}
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
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenForm(null)}
          disabled={loading}
        >
          Ajouter Réseau
        </Button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div>
          Afficher
          <Select 
            value={rowsPerPage} 
            onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }} 
            size="small" 
            style={{ margin: '0 8px' }}
            disabled={loading}
          >
            {[5, 10, 20].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
          éléments
        </div>
      </div>

      {/* Tableau des réseaux */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Réseau</TableCell>
            <TableCell>Agrément</TableCell>
            <TableCell>Date agrément</TableCell>
            <TableCell>Date statut</TableCell>
            <TableCell>Adr. Siège</TableCell>
            <TableCell>Ville</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Actions</TableCell>
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
                  {r.logo ? (
                    <img 
                      src={`data:image/png;base64,${r.logo}`} 
                      alt="logo" 
                      width={32} 
                      height={32} 
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
                  <Chip 
                    label={r.statut?.libelle || r.statut} 
                    sx={{ ...getStatutStyle(r.statut?.libelle || r.statut) }} 
                  />
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
                    <DeleteIcon />
                  </IconButton>
                  <IconButton 
                    color="info" 
                    onClick={() => { setOpenDetails(true); setSelected(r); }}
                    disabled={loading}
                    sx={{ background: '#e3f2fd', borderRadius: 2, ml: 1 }}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={(_, v) => setPage(v)} 
          color="primary" 
          disabled={loading}
        />
      </div>

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
                  {form.logo && (
                    <Box sx={{ mb: 2, textAlign: 'center' }}>
                      <img 
                        src={`data:image/png;base64,${form.logo}`} 
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
                    {form.logo ? 'Changer le logo' : 'Sélectionner un logo'}
                    <input type="file" hidden onChange={handleLogoUpload} accept="image/*" />
                  </Button>
                  
                  <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                    Formats acceptés : PNG, JPG, JPEG. Taille max : 5MB
                  </Typography>
                </div>
                <TextField 
                  label="Réseau" 
                  name="nom" 
                  value={form.nom} 
                  onChange={e => setForm({ ...form, nom: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Agrément" 
                  name="agrement" 
                  value={form.agrement} 
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
                  value={form.dateAgrement} 
                  onChange={e => setForm({ ...form, dateAgrement: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  InputLabelProps={{ shrink: true }} 
                  required 
                  disabled={formLoading}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Statut</InputLabel>
                  <Select 
                    label="Statut" 
                    name="statut" 
                    value={form.statut} 
                    onChange={e => setForm({ ...form, statut: e.target.value })} 
                    required
                    disabled={formLoading || dropdownsLoading}
                  >
                    {dropdowns.statuts.map(s => (
                      <MenuItem key={s.id} value={s.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box 
                            sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%',
                              ...getStatutStyle(s.libelle)
                            }} 
                          />
                          {s.libelle}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField 
                  label="Date statut" 
                  name="dateStatut" 
                  type="date" 
                  value={form.dateStatut} 
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
                  value={form.adresseSiege} 
                  onChange={e => setForm({ ...form, adresseSiege: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  required 
                  disabled={formLoading}
                />
                <TextField 
                  label="Adr. domiciliation" 
                  name="adresseDomiciliation" 
                  value={form.adresseDomiciliation} 
                  onChange={e => setForm({ ...form, adresseDomiciliation: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Ville</InputLabel>
                  <Select 
                    label="Ville" 
                    name="ville" 
                    value={form.ville} 
                    onChange={e => setForm({ ...form, ville: e.target.value })} 
                    required
                    disabled={formLoading || dropdownsLoading}
                  >
                    {dropdowns.villes.map(v => (
                      <MenuItem key={v.id} value={v.id}>{v.nom}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField 
                  label="Tel" 
                  name="tel" 
                  value={form.tel} 
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
                  value={form.fax} 
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
                  value={form.ice} 
                  onChange={e => setForm({ ...form, ice: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <TextField 
                  label="Id. Fiscal" 
                  name="idFiscal" 
                  value={form.idFiscal} 
                  onChange={e => setForm({ ...form, idFiscal: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <TextField 
                  label="N° RegisterCommerce" 
                  name="registerCommerce" 
                  value={form.registerCommerce} 
                  onChange={e => setForm({ ...form, registerCommerce: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Cadre d'autorisation</InputLabel>
                  <Select 
                    label="Cadre d'autorisation" 
                    name="cadreAutorisation" 
                    value={form.cadreAutorisation} 
                    onChange={e => setForm({ ...form, cadreAutorisation: Number(e.target.value) })} 
                    required
                    disabled={formLoading || dropdownsLoading}
                  >
                    {dropdowns.cadres.map(c => (
                      <MenuItem key={c.id} value={c.id}>{c.libelle}</MenuItem>
                    ))}
                  </Select>
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
                  value={form.mailRepresentant} 
                  onChange={e => setForm({ ...form, mailRepresentant: e.target.value })} 
                  fullWidth 
                  margin="normal" 
                  disabled={formLoading}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenForm(false)} disabled={formLoading}>
              Annuler
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={formLoading || ![1,2].includes(Number(form.cadreAutorisation))}
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
          <InfoIcon color="info" />
          <span>Détails du Réseau</span>
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  src={selected.logo ? `data:image/png;base64,${selected.logo}` : undefined}
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
                    label={selected.statut?.libelle || selected.statut} 
                    sx={{ ...getStatutStyle(selected.statut?.libelle || selected.statut) }} 
                  />
                </div>
                <div>
                  <Typography variant="subtitle2">Cadre d'autorisation</Typography>
                  <Typography>{selected.cadreAutorisation?.libelle || selected.cadreAutorisation}</Typography>
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
                  <Typography>{selected.ville?.nom || selected.ville}</Typography>
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)} variant="outlined">Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 