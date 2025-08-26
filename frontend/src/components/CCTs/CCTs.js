import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Divider,
  Pagination,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Tooltip,
  Tabs,
  Tab,
  Skeleton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  DirectionsCar as CarIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import cctService from '../../services/cctService';
import { dropdownsService } from '../../services/dropdownsService';
import { historiqueCCTService } from '../../services/historiqueCCTService';
import CCTFormModal from './CCTFormModal';
import CCTDetailsModal from './CCTDetailsModal';
import CCTDebugModal from './CCTDebugModal';
import SearchableSelect from '../common/SearchableSelect';

export default function CCTs() {
  // États principaux
  const [ccts, setCCTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageCount: 0,
    currentPage: 1,
    pageSize: 5
  });

  // États des modals
  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDebugModal, setOpenDebugModal] = useState(false);
  const [editingCCT, setEditingCCT] = useState(null);
  const [selectedCCT, setSelectedCCT] = useState(null);
  const [debugData, setDebugData] = useState(null);

  // États des filtres
  const [filters, setFilters] = useState({
    regionId: null,
    villeId: null,
    reseauId: null,
    anneeDemarrage: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // États des dropdowns
  const [dropdowns, setDropdowns] = useState({
    regions: [],
    provinces: [],
    villes: [],
    reseaux: [],
    categories: [],
    statuts: [],
    types: [],
    cadresAutorisation: []
  });

  // États des détails
  const [detailsTab, setDetailsTab] = useState(0);
  const [cctDetails, setCctDetails] = useState({
    agents: [],
    chefsCentres: [],
    lignes: [],
    equipements: []
  });
  const [historique, setHistorique] = useState([]);

  // Charger les données initiales
  useEffect(() => {
    loadDropdowns();
    loadCCTs();
  }, []);

  // Recharger les CCTs quand la pagination change
  useEffect(() => {
    if (!loadingDropdowns) {
      loadCCTs();
    }
  }, [pagination.currentPage, pagination.pageSize, loadingDropdowns]);

  // Charger les CCTs
  const loadCCTs = async () => {
    try {
      setLoading(true);
      const response = await cctService.getCCTs(filters, pagination.currentPage, pagination.pageSize);
      

      
      // Si l'API ne fournit pas la pagination, la calculer côté client
      let paginationData = response.pagination;
      if (!paginationData || !paginationData.totalCount) {
        // Récupérer tous les CCTs pour calculer la pagination côté client
        const allCCTsResponse = await cctService.getCCTs(filters, 1, 1000);
        const totalCount = allCCTsResponse.data.length;
        const pageCount = Math.ceil(totalCount / pagination.pageSize);
        
        paginationData = {
          totalCount,
          pageCount,
          currentPage: pagination.currentPage,
          pageSize: pagination.pageSize
        };
        
        // Filtrer les données pour la page actuelle
        const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        const paginatedData = allCCTsResponse.data.slice(startIndex, endIndex);
        
        setCCTs(paginatedData);
      } else {
        setCCTs(response.data);
      }
      
      setPagination(prev => ({
        ...prev,
        totalCount: paginationData.totalCount,
        pageCount: paginationData.pageCount,
        currentPage: paginationData.currentPage,
        pageSize: paginationData.pageSize
      }));
    } catch (error) {
      toast.error('Erreur lors du chargement des CCTs');
      console.error('Erreur loadCCTs:', error);
      // En cas d'erreur, initialiser avec des valeurs par défaut
      setCCTs([]);
      setPagination(prev => ({
        ...prev,
        totalCount: 0,
        pageCount: 1,
        currentPage: 1
      }));
    } finally {
      setLoading(false);
    }
  };

  // Charger les données des dropdowns
  const loadDropdowns = async () => {
    try {
      setLoadingDropdowns(true);
      const [
        regions,
        provinces,
        villes,
        reseaux,
        categories,
        statuts,
        types,
        cadresAutorisation
      ] = await Promise.all([
        dropdownsService.getRegions(),
        dropdownsService.getProvinces(),
        dropdownsService.getVilles(),
        dropdownsService.getReseaux(),
        dropdownsService.getCategoriesCCT(),
        dropdownsService.getStatutsCCT(),
        dropdownsService.getTypesCCT(),
        dropdownsService.getCadresAutorisation()
      ]);

      setDropdowns({
        regions,
        provinces,
        villes,
        reseaux,
        categories,
        statuts,
        types,
        cadresAutorisation
      });
    } catch (error) {
      console.error('Erreur lors du chargement des dropdowns:', error);
      toast.error('Erreur lors du chargement des données de référence');
    } finally {
      setLoadingDropdowns(false);
    }
  };

  // Gérer les changements de page
  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  // Gérer les changements de filtres
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Appliquer les filtres
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadCCTs();
  };

  // Réinitialiser les filtres
  const clearFilters = () => {
    setFilters({
      regionId: null,
      villeId: null,
      reseauId: null,
      anneeDemarrage: ''
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadCCTs();
  };

  // Ouvrir modal d'ajout
  const handleAdd = () => {
    setEditingCCT(null);
    setOpenModal(true);
  };

  // Ouvrir modal de modification
  const handleEdit = async (cct) => {
    try {
      // Utiliser directement les données du CCT avec les IDs déjà présents
      // Les IDs sont maintenant inclus dans le DTO retourné par GetCCTs
      const cctComplet = {
        ...cct,
        // S'assurer que tous les champs nécessaires sont présents
        id: cct.id,
        nom: cct.nom,
        agrement: cct.agrement,
        dateAgrement: cct.dateAgrement,
        categorieId: cct.categorieId,
        statutId: cct.statutId,
        dateStatut: cct.dateStatut,
        reseauId: cct.reseauId,
        dateRalliement: cct.dateRalliement,
        adresseCCT: cct.adresseCCT,
        latitude: cct.latitude,
        longitude: cct.longitude,
        adresseSiege: cct.adresseSiege,
        adresseDomiciliation: cct.adresseDomiciliation,
        villeId: cct.villeId,
        tel: cct.tel,
        fax: cct.fax,
        mail: cct.mail,
        ice: cct.ice,
        idFiscal: cct.idFiscal,
        cadreAutorisationId: cct.cadreAutorisationId,
        engagementSpecifique: cct.engagementSpecifique,
        isPersonneMorale: cct.isPersonneMorale,
        typeId: cct.typeId,
        quotaVL: cct.quotaVL,
        quotaPL: cct.quotaPL,
        provinceId: cct.provinceId,
        regionId: cct.regionId,
        thumbprintCertificat: cct.thumbprintCertificat
      };
      
      console.log('=== MODIFICATION CCT ===');
      console.log('CCT sélectionné:', cct);
      console.log('CCT complet pour modification:', cctComplet);
      
      setEditingCCT(cctComplet);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors de la préparation de la modification:', error);
      toast.error('Erreur lors de la préparation de la modification');
    }
  };

  // Ouvrir modal de détails
  const handleDetails = async (cct) => {
    setSelectedCCT(cct);
    setDetailsTab(0);
    setOpenDetailsModal(true);

    try {
      const cctResponse = await cctService.getCCT(cct.id);
      const cctComplet = cctResponse.data;

      // Charger les détails du CCT
      const [agents, chefsCentres, lignes, equipements] = await Promise.all([
        cctService.getCCTAgents(cct.id).catch(() => ({ data: [] })),
        cctService.getCCTChefsCentres(cct.id).catch(() => ({ data: [] })),
        cctService.getCCTLignes(cct.id).catch(() => ({ data: [] })),
        cctService.getCCTEquipements(cct.id).catch(() => ({ data: [] }))
      ]);

      setCctDetails({
        agents: agents.data || [],
        chefsCentres: chefsCentres.data || [],
        lignes: lignes.data || [],
        equipements: equipements.data || []
      });

      // Charger l'historique
      try {
        const historiqueResponse = await historiqueCCTService.getByCCTId(cct.id);
        setHistorique(historiqueResponse || []);
        console.log('✅ Historique CCT chargé avec succès:', historiqueResponse);
      } catch (error) {
        console.warn('Impossible de charger l\'historique:', error);
        setHistorique([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des détails:', error);
      setCctDetails({
        agents: [],
        chefsCentres: [],
        lignes: [],
        equipements: []
      });
      setHistorique([]);
    }
  };

  // Supprimer un CCT
  const handleDelete = async (cct) => {
    try {
      // Vérifier d'abord s'il y a des associations
      const associations = await cctService.checkCCTAssociations(cct.id);
      const totalAssociations = Object.values(associations || {}).reduce((sum, count) => sum + count, 0);
      
      if (totalAssociations === 0) {
        // Pas d'associations - suppression simple
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le CCT "${cct.nom}" ?`)) {
          await cctService.deleteCCT(cct.id);
          toast.success('CCT supprimé avec succès');
          loadCCTs();
        }
        return;
      }
      
      // Il y a des associations - proposer 3 choix
      const choice = window.confirm(
        `🚨 CCT "${cct.nom}" avec ${totalAssociations} association(s) active(s) !
        
🔍 **Associations trouvées :**
${associations.agents > 0 ? `• ${associations.agents} agent(s)` : ''}
${associations.chefsCentres > 0 ? `• ${associations.chefsCentres} chef(s) de centre` : ''}
${associations.lignes > 0 ? `• ${associations.lignes} ligne(s)` : ''}
${associations.equipements > 0 ? `• ${associations.equipements} équipement(s)` : ''}
${associations.formations > 0 ? `• ${associations.formations} formation(s)` : ''}
${associations.decisions > 0 ? `• ${associations.decisions} décision(s)` : ''}

💡 **Que souhaitez-vous faire ?**
• Cliquer sur "OK" pour voir les 3 options de suppression
• Cliquer sur "Annuler" pour annuler la suppression

⚠️ **Attention :** Ce CCT a des associations actives !`
      );
      
      if (!choice) return;
      
      // Afficher les 3 options de suppression
      const suppressionChoice = window.confirm(
        `CHOIX DE SUPPRESSION pour le CCT "${cct.nom}" :
        
1. Suppression avec désassociation (Recommandée)
   • Supprime le CCT
   • Garde les agents (CCTId = null)
   • Pas de perte de données

2. Suppression forcée (DANGEREUSE)
   • Supprime le CCT de force
   • Les agents deviennent orphelins
   • Risque de données incohérentes

3. Annuler la suppression

Cliquez sur "OK" pour la suppression avec désassociation (option 1)
Cliquez sur "Annuler" pour voir l'option 2 (suppression forcée)

Recommandation : Utilisez l'option 1 pour la sécurité des données.`
      );
      
      if (suppressionChoice) {
        // Option 1 : Suppression avec désassociation
        await cctService.deleteCCTWithDisassociation(cct.id);
        toast.success(`CCT "${cct.nom}" supprimé avec désassociation des ${totalAssociations} association(s)`);
        loadCCTs();
      } else {
        // Proposer l'option 2 : Suppression forcée
        const forceChoice = window.confirm(
          `SUPPRESSION FORCEE - ATTENTION DANGER !
          
Le CCT "${cct.nom}" sera supprimé de FORCE !
${totalAssociations} entité(s) deviendront ORPHELINES !

RISQUES :
• Agents sans CCT assigné
• Données incohérentes
• Problèmes de reporting
• Erreurs potentielles

Êtes-vous ABSOLUMENT SÛR de vouloir forcer la suppression ?
• Cliquer sur "OK" = SUPPRESSION FORCÉE (irréversible)
• Cliquer sur "Annuler" = Annuler complètement

DERNIÈRE CHANCE : Cette action est irréversible !`
        );
        
        if (forceChoice) {
          // Option 2 : Suppression forcée
          const result = await cctService.forceDeleteCCT(cct.id);
          toast.success(
            <div>
              <strong>🚨 SUPPRESSION FORCÉE RÉUSSIE !</strong><br/>
              CCT supprimé de force !<br/>
              <small>{result.totalOrphaned} entité(s) orpheline(s)</small>
            </div>,
            { autoClose: 10000 }
          );
          loadCCTs();
        }
      }
      
    } catch (error) {
      console.error('Erreur handleDelete:', error);
      
      // Gestion intelligente des erreurs de suppression
      if (error.message.includes('associé à des entités liées')) {
        toast.error(
          <div>
            <strong>Suppression impossible</strong><br/>
            Ce CCT a des associations actives.<br/>
            <small>Voir la console pour plus de détails</small>
          </div>,
          { autoClose: 8000 }
        );
      } else if (error.message.includes('référencé par d\'autres données')) {
        toast.error(
          <div>
            <strong>Contraintes de base de données</strong><br/>
            Ce CCT ne peut pas être supprimé.<br/>
            <small>Voir la console pour plus de détails</small>
          </div>,
          { autoClose: 8000 }
        );
      } else if (error.message.includes('suppression avec désassociation')) {
        toast.error(
          <div>
            <strong>Erreur lors de la désassociation</strong><br/>
            Impossible de désassocier les entités.<br/>
            <small>Voir la console pour plus de détails</small>
          </div>,
          { autoClose: 8000 }
        );
      } else if (error.message.includes('suppression forcée')) {
        toast.error(
          <div>
            <strong>🚨 Suppression forcée impossible</strong><br/>
            Le backend bloque la suppression.<br/>
            <small>Voir la console pour plus de détails</small>
          </div>,
          { autoClose: 10000 }
        );
      } else {
        toast.error('Erreur lors de la suppression du CCT');
      }
    }
  };

  // Filtrer les CCTs par terme de recherche
  const filteredCCTs = ccts.filter(cct =>
    cct.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cct.agrement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cct.adresseCCT?.toLowerCase().includes(searchTerm.toLowerCase())
  );



  // Fonction pour obtenir le style coloré des statuts
  const getStatutStyle = (statutLibelle) => {
    if (!statutLibelle) return { backgroundColor: '#e0e0e0', color: '#333' };
    
    const statut = statutLibelle.toLowerCase();
    
    // Couleurs spécifiques pour les statuts CCT
    if (statut.includes('activité') || statut.includes('active')) {
      return { backgroundColor: '#4caf50', color: 'white' }; // Vert
    }
    if (statut.includes('suspendu')) {
      return { backgroundColor: '#ff9800', color: 'white' }; // Orange
    }
    if (statut.includes('cours d\'ouverture') || statut.includes('ouverture') || statut.includes('cours')) {
      return { backgroundColor: '#87ceeb', color: 'white' }; // Bleu ciel
    }
    if (statut.includes('fermé') || statut.includes('definitivement')) {
      return { backgroundColor: '#f44336', color: 'white' }; // Rouge
    }
    if (statut.includes('attente') || statut.includes('agrément')) {
      return { backgroundColor: '#9e9e9e', color: 'white' }; // Gris
    }
    
    // Couleur par défaut
    return { backgroundColor: '#757575', color: 'white' }; // Gris foncé
  };

  // Rendu des lignes de chargement
  const renderLoadingRows = () => {
    return Array.from({ length: pagination.pageSize }).map((_, index) => (
      <TableRow key={`loading-${index}`}>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
        <TableCell><Skeleton animation="wave" /></TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header avec titre */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2', mb: 2 }}>
        <Toolbar>
          <CarIcon sx={{ mr: 2 }} />
          <Typography variant="h5" component="h1">
            Centres de Contrôle Technique (CCT)
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3, flex: 1 }}>
        {/* Section Recherche */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <SearchIcon color="primary" />
            RECHERCHE
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SearchableSelect
                label="Région"
                value={filters.regionId}
                onChange={(value) => handleFilterChange('regionId', value)}
                options={dropdowns.regions}
                placeholder="Sélectionnez une région"
                getOptionLabel={(option) => option.libelle}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SearchableSelect
                label="Ville"
                value={filters.villeId}
                onChange={(value) => handleFilterChange('villeId', value)}
                options={dropdowns.villes}
                placeholder="Sélectionnez une ville"
                getOptionLabel={(option) => option.nom}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <SearchableSelect
                label="Réseau de ralliement"
                value={filters.reseauId}
                onChange={(value) => handleFilterChange('reseauId', value)}
                options={dropdowns.reseaux}
                placeholder="Sélectionnez un réseau"
                getOptionLabel={(option) => option.nom}
                margin="dense"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                label="Année de démarrage"
                value={filters.anneeDemarrage}
                onChange={(e) => handleFilterChange('anneeDemarrage', e.target.value)}
                type="number"
                placeholder="Ex: 2019"
              />
            </Grid>
          </Grid>

          {/* Boutons de recherche */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={applyFilters}
              sx={{ 
                minHeight: '40px',
                minWidth: '150px',
                bgcolor: '#1976d2',
                '&:hover': {
                  bgcolor: '#1565c0'
                }
              }}
            >
              Rechercher
            </Button>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              sx={{ 
                minHeight: '40px',
                minWidth: '150px',
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': {
                  borderColor: '#1565c0',
                  bgcolor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              Annuler
            </Button>
          </Box>
        </Paper>

        {/* Section CCTs */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CarIcon color="primary" />
              CCTS
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">Afficher</Typography>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <Select
                    value={pagination.pageSize}
                    onChange={(e) => setPagination(prev => ({ ...prev, pageSize: e.target.value, currentPage: 1 }))}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2">éléments</Typography>
              </Box>
              
              <TextField
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ width: 250 }}
              />
            </Box>
          </Box>

          {/* Bouton Ajouter CCT */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              disabled={loadingDropdowns}
              sx={{ bgcolor: '#1976d2' }}
            >
              Ajouter CCT
            </Button>
          </Box>

          {/* Message d'information si pas de données */}
          {!loading && ccts.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Aucun CCT trouvé. {searchTerm && 'Essayez de modifier vos critères de recherche.'}
            </Alert>
          )}

          {/* Tableau */}
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CCT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Agrément</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Catégorie</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Réseau</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ville</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Statut</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? renderLoadingRows() : (
                filteredCCTs.length > 0 ? (
                  filteredCCTs.map((cct) => (
                    <TableRow key={cct.id} hover>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {cct.nom}
                        </Typography>
                      </TableCell>
                      <TableCell>{cct.agrement}</TableCell>
                      <TableCell>{cct.categorie || '-'}</TableCell>
                      <TableCell>{cct.reseau || '-'}</TableCell>
                      <TableCell>{cct.ville || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={cct.statut || '-'}
                          sx={{
                            ...getStatutStyle(cct.statut),
                            fontWeight: 'bold',
                            '&:hover': {
                              opacity: 0.8
                            }
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Voir les détails">
                            <IconButton
                              color="primary"
                              onClick={() => handleDetails(cct)}
                              size="small"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Modifier">
                            <IconButton
                              color="secondary"
                              onClick={() => handleEdit(cct)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(cct)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WarningIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          Aucun CCT trouvé
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {searchTerm ? 'Aucun CCT ne correspond à votre recherche.' : 'Commencez par ajouter un nouveau CCT.'}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {!loading && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              p: 3, 
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#fafafa'
            }}>
              <Typography variant="body2" color="text.secondary">
                Affichage de l'élément {((pagination.currentPage - 1) * pagination.pageSize) + 1} à {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} sur {pagination.totalCount} éléments
              </Typography>
              
              {pagination.pageCount > 1 && (
                <Pagination
                  count={pagination.pageCount}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="large"
                />
              )}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Modal de formulaire (ajout/modification) */}
      <CCTFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (data) => {
          try {
            console.log('=== SOUMISSION CCT ===');
            console.log('Mode:', editingCCT ? 'Modification' : 'Création');
            console.log('Données du formulaire:', data);
            
            // Vérifier les données avant envoi
            const requiredFields = [
              'nom', 'agrement', 'dateAgrement', 'categorieId', 'statutId', 
              'dateStatut', 'reseauId', 'dateRalliement', 'regionId', 
              'provinceId', 'villeId', 'adresseCCT', 'latitude', 'longitude', 
              'tel', 'cadreAutorisationId', 'typeId', 'quotaVL'
            ];
            
            const missingFields = requiredFields.filter(field => {
              const value = data[field];
              return value === null || value === undefined || value === '';
            });
            
            if (missingFields.length > 0) {
              console.error('❌ Champs obligatoires manquants:', missingFields);
              toast.error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
              return;
            }
            
            if (editingCCT) {
              await cctService.updateCCT(editingCCT.id, data);
              toast.success('CCT modifié avec succès');
            } else {
              await cctService.createCCT(data);
              toast.success('CCT créé avec succès');
            }
            setOpenModal(false);
            loadCCTs();
          } catch (error) {
            console.error('=== ERREUR CCT DÉTAILLÉE ===');
            console.error('Erreur complète:', error);
            console.error('Type d\'erreur:', typeof error);
            console.error('Message d\'erreur:', error.message);
            
            // Afficher le modal de débogage
            setDebugData({
              mode: editingCCT ? 'Modification' : 'Création',
              formData: data,
              error: error,
              timestamp: new Date().toISOString()
            });
            setOpenDebugModal(true);
            
            // Logs détaillés pour le débogage
            if (error.response) {
              console.error('Status:', error.response.status);
              console.error('Headers:', error.response.headers);
              console.error('Data:', error.response.data);
              
              // Affichage des erreurs de validation
              if (error.response.data?.errors) {
                Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                  console.error(`Champ ${field}:`, messages);
                });
              }
            } else if (error.request) {
              console.error('Requête envoyée mais pas de réponse:', error.request);
            } else {
              console.error('Erreur de configuration:', error.message);
            }
            
            // Message d'erreur utilisateur
            let errorMessage = editingCCT ? 'Erreur lors de la modification du CCT' : 'Erreur lors de la création du CCT';
            
            if (error.response?.data?.errors) {
              const errorDetails = Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                .join('; ');
              errorMessage += ` - ${errorDetails}`;
            } else if (error.response?.data?.title) {
              errorMessage += ` - ${error.response.data.title}`;
            } else if (error.message) {
              errorMessage += ` - ${error.message}`;
            }
            
            toast.error(errorMessage);
            console.error('=== FIN ERREUR CCT ===');
          }
        }}
        initialValues={editingCCT}
        dropdowns={dropdowns}
      />

      {/* Modal de débogage */}
      <CCTDebugModal
        open={openDebugModal}
        onClose={() => setOpenDebugModal(false)}
        formData={debugData?.formData}
      />

      {/* Modal de détails */}
      <CCTDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        cct={selectedCCT}
        details={{
          lignes: cctDetails.lignes,
          agents: cctDetails.agents,
          chefsCentres: cctDetails.chefsCentres,
          equipements: cctDetails.equipements,
          historique: historique,
        }}
        tab={detailsTab}
        onTabChange={(e, newValue) => setDetailsTab(newValue)}
        onEdit={() => {
          setOpenDetailsModal(false);
          handleEdit(selectedCCT);
        }}
      />
    </Box>
  );
} 