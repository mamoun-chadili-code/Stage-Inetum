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
  Skeleton
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
  Warning as WarningIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import cctService from '../../services/cctService';
import { dropdownsService } from '../../services/dropdownsService';
import CCTFormModal from './CCTFormModal';
import CCTDetailsModal from './CCTDetailsModal';
import historiqueCCTService from '../../services/historiqueCCTService';
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
  const [editingCCT, setEditingCCT] = useState(null);
  const [selectedCCT, setSelectedCCT] = useState(null);

  // États des filtres
  const [filters, setFilters] = useState({
    regionId: '',
    villeId: '',
    reseauId: '',
    statutId: '',
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

  // Fonction pour nettoyer les données des provinces (supprimer les doublons)
  const cleanProvincesData = (provinces) => {
    if (!Array.isArray(provinces)) return [];
    
    const uniqueProvinces = provinces.reduce((acc, current) => {
      const existingProvince = acc.find(item => 
        item.id === current.id ||
        item.libelle?.toLowerCase() === current.libelle?.toLowerCase() ||
        item.code?.toLowerCase() === current.code?.toLowerCase()
      );
      
      if (!existingProvince) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    
    // Trier par ordre alphabétique
    return uniqueProvinces.sort((a, b) => 
      (a.libelle || '').localeCompare(b.libelle || '', 'fr')
    );
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
        dropdownsService.getStatuts(),
        dropdownsService.getTypesCTT(),
        dropdownsService.getCadresAutorisation()
      ]);

      // Nettoyer les données des provinces pour supprimer les doublons
      const cleanedProvinces = cleanProvincesData(provinces);
      
      if (cleanedProvinces.length !== provinces.length) {
        console.log(`Provinces nettoyées: ${provinces.length} → ${cleanedProvinces.length} (doublons supprimés)`);
      }

      setDropdowns({
        regions,
        provinces: cleanedProvinces,
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
      regionId: '',
      villeId: '',
      reseauId: '',
      statutId: '',
      anneeDemarrage: ''
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadCCTs();
  };

  // Ouvrir modal d'ajout
  const handleAdd = () => {
    if (!dropdowns.categories || !dropdowns.statuts || !dropdowns.types) {
      toast.error('Veuillez attendre le chargement des données');
      return;
    }
    setEditingCCT(null);
    setOpenModal(true);
  };

  // Ouvrir modal de modification
  const handleEdit = async (cct) => {
    if (!dropdowns.categories || !dropdowns.statuts || !dropdowns.types) {
      toast.error('Veuillez attendre le chargement des données');
      return;
    }
    try {
      // Récupérer les données complètes du CCT avec les IDs
      const cctResponse = await cctService.getCCT(cct.id);
      const cctComplet = cctResponse.data;
      
      setEditingCCT(cctComplet);
      setOpenModal(true);
    } catch (error) {
      console.error('Erreur lors du chargement des données du CCT:', error);
      toast.error('Erreur lors du chargement des données du CCT');
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
        const historiqueResponse = await historiqueCCTService.getHistoriqueCCT(cct.id);
        setHistorique(historiqueResponse.data || []);
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
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le CCT "${cct.nom}" ?`)) {
      try {
        await cctService.deleteCCT(cct.id);
        toast.success('CCT supprimé avec succès');
        loadCCTs();
      } catch (error) {
        toast.error('Erreur lors de la suppression du CCT');
        console.error('Erreur handleDelete:', error);
      }
    }
  };

  // Filtrer les CCTs par terme de recherche
  const filteredCCTs = ccts.filter(cct =>
    cct.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cct.agrement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cct.adresseCCT?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <TableCell><Skeleton animation="wave" /></TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <BusinessIcon color="primary" />
        Gestion des Centres de Contrôle Technique (CCT)
      </Typography>

      {/* Filtres */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Région"
              value={filters.regionId}
              onChange={(value) => handleFilterChange('regionId', value)}
              options={[{ id: '', libelle: 'Toutes' }, ...dropdowns.regions]}
              placeholder="Rechercher une région..."
              getOptionLabel={(option) => option.libelle}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Ville"
              value={filters.villeId}
              onChange={(value) => handleFilterChange('villeId', value)}
              options={[{ id: '', nom: 'Toutes' }, ...dropdowns.villes]}
              placeholder="Rechercher une ville..."
              getOptionLabel={(option) => option.nom}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Réseau"
              value={filters.reseauId}
              onChange={(value) => handleFilterChange('reseauId', value)}
              options={[{ id: '', nom: 'Tous' }, ...dropdowns.reseaux]}
              placeholder="Rechercher un réseau..."
              getOptionLabel={(option) => option.nom}
              margin="dense"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <SearchableSelect
              label="Statut"
              value={filters.statutId || ''}
              onChange={(value) => handleFilterChange('statutId', value)}
              options={[{ id: '', libelle: 'Tous' }, ...dropdowns.statuts]}
              placeholder="Rechercher un statut..."
              getOptionLabel={(option) => option.libelle}
              margin="dense"
              isStatusField={true}
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <TextField
              fullWidth
              size="small"
              label="Année de démarrage"
              value={filters.anneeDemarrage}
              onChange={(e) => handleFilterChange('anneeDemarrage', e.target.value)}
              type="number"
            />
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <Button
              variant="contained"
              startIcon={<FilterIcon />}
              onClick={applyFilters}
              fullWidth
            >
              Filtrer
            </Button>
          </Grid>
          <Grid sx={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              fullWidth
            >
              Réinitialiser
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Barre d'actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          placeholder="Rechercher par nom, agrément ou adresse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={loadingDropdowns}
        >
          Nouveau CCT
        </Button>
      </Box>

      {/* Message d'information si pas de données */}
      {!loading && ccts.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Aucun CCT trouvé. {searchTerm && 'Essayez de modifier vos critères de recherche.'}
        </Alert>
      )}

      {/* Tableau */}
      <Paper>
        {/* En-tête avec informations de pagination */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid #e0e0e0', 
          backgroundColor: '#f8f9fa',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" color="primary">
            Liste des CCTs
          </Typography>
          {!loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`${pagination.totalCount} CCTs au total`}
                color="primary"
                variant="outlined"
                size="small"
              />
              {pagination.pageCount > 1 && (
                <Chip 
                  label={`Page ${pagination.currentPage}/${pagination.pageCount}`}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
          )}
        </Box>
        
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Agrément</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Province</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ville</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Réseau</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Statut</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Téléphone</TableCell>
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
                    <TableCell>{cct.province || '-'}</TableCell>
                    <TableCell>{cct.ville || '-'}</TableCell>
                    <TableCell>{cct.reseau || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={cct.statut || '-'}
                        sx={{
                          backgroundColor: (() => {
                            const statut = cct.statut?.toLowerCase();
                            if (statut?.includes('activité') || statut?.includes('active')) return '#4caf50';
                            if (statut?.includes('inactif')) return '#f44336';
                            if (statut?.includes('suspendu')) return '#ff9800';
                            if (statut?.includes('fermer') || statut?.includes('fermé')) return '#9e9e9e';
                            return '#757575';
                          })(),
                          color: 'white',
                          fontWeight: 'bold',
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{cct.tel || '-'}</TableCell>
                    <TableCell>
                      <Tooltip title="Voir les détails">
                        <IconButton
                          color="primary"
                          onClick={() => handleDetails(cct)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton
                          color="secondary"
                          onClick={() => handleEdit(cct)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(cct)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Affichage de
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  {((pagination.currentPage - 1) * pagination.pageSize) + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  à
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  sur
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  {pagination.totalCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  CCTs
                </Typography>
              </Box>
              
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Éléments par page</InputLabel>
                <Select
                  value={pagination.pageSize}
                  onChange={(e) => setPagination(prev => ({ ...prev, pageSize: e.target.value, currentPage: 1 }))}
                  label="Éléments par page"
                >
                  <MenuItem value={5}>5 par page</MenuItem>
                  <MenuItem value={10}>10 par page</MenuItem>
                  <MenuItem value={20}>20 par page</MenuItem>
                  <MenuItem value={50}>50 par page</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            {pagination.pageCount > 1 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Page {pagination.currentPage} sur {pagination.pageCount}
                </Typography>
                <Pagination
                  count={pagination.pageCount}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size="large"
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label="Pagination active" 
                  color="success" 
                  size="small" 
                  icon={<FilterIcon />}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Tous les résultats affichés sur cette page
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* Modal de formulaire (ajout/modification) */}
      <CCTFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (data) => {
          try {
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
            
            if (error.response) {
              console.error('Status:', error.response.status);
              console.error('Headers:', error.response.headers);
              console.error('Data:', error.response.data);
              
              // Afficher les erreurs de validation de manière plus claire
              if (error.response.data) {
                if (error.response.data.errors) {
                  console.error('Erreurs de validation détaillées:', error.response.data.errors);
                  // Afficher chaque erreur individuellement
                  Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                    console.error(`Champ ${field}:`, messages);
                  });
                }
                
                if (error.response.data.title) {
                  console.error('Titre de l\'erreur:', error.response.data.title);
                }
                
                if (error.response.data.traceId) {
                  console.error('Trace ID:', error.response.data.traceId);
                }
              }
            } else if (error.request) {
              console.error('Requête envoyée mais pas de réponse:', error.request);
            } else {
              console.error('Erreur de configuration:', error.message);
            }
            
            console.error('=== FIN ERREUR CCT ===');
            
            // Message d'erreur utilisateur
            let errorMessage = editingCCT ? 'Erreur lors de la modification du CCT' : 'Erreur lors de la création du CCT';
            
            if (error.response?.data?.errors) {
              const errorDetails = Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                .join('; ');
              errorMessage += ` - ${errorDetails}`;
            } else if (error.response?.data?.title) {
              errorMessage += ` - ${error.response.data.title}`;
            }
            
            toast.error(errorMessage);
          }
        }}
        initialValues={editingCCT}
        dropdowns={dropdowns}
      />

      {/* Modal de détails */}
      <CCTDetailsModal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        cct={selectedCCT}
        details={{
          lignes: cctDetails.lignes,
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