import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Divider,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box,
  Chip,
  Avatar,
  IconButton,
  Paper,
  Button
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

export default function ChefCentreDetailsModal({ open, onClose, chefCentre, details, tab = 0, onTabChange, onEdit }) {
  if (!chefCentre) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon />
          <Typography variant="h6">Détails du Chef de Centre</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* En-tête avec nom du chef de centre */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {chefCentre.nom} {chefCentre.prenom}
          </Typography>
          <Chip 
            label={chefCentre.sexe ? 'Féminin' : 'Masculin'} 
            color="success" 
            variant="outlined"
            sx={{ fontSize: '1rem', px: 2 }}
          />
        </Box>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={onTabChange}>
            <Tab label="Informations" icon={<PersonIcon />} />
            <Tab label="Historique" icon={<HistoryIcon />} />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        {tab === 0 && (
          <Grid container spacing={3}>
            {/* Informations personnelles */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    Informations personnelles
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Nom</Typography>
                      <Typography variant="body1" fontWeight="bold">{chefCentre.nom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Prénom</Typography>
                      <Typography variant="body1" fontWeight="bold">{chefCentre.prenom}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">CIN</Typography>
                      <Typography variant="body1">{chefCentre.cin}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Date de naissance</Typography>
                      <Typography variant="body1">
                        {chefCentre.dateNaissance ? new Date(chefCentre.dateNaissance).toLocaleDateString() : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Sexe</Typography>
                      <Typography variant="body1">{chefCentre.sexe ? 'Féminin' : 'Masculin'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">CNSS</Typography>
                      <Typography variant="body1">{chefCentre.cnss}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Informations professionnelles */}
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon />
                    Informations professionnelles
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">CCT</Typography>
                      <Typography variant="body1">{chefCentre.cct || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Date affectation</Typography>
                      <Typography variant="body1">
                        {chefCentre.dateAffectationCCT ? new Date(chefCentre.dateAffectationCCT).toLocaleDateString() : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Année Autorisation</Typography>
                      <Typography variant="body1">{chefCentre.anneeAutorisation}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Référence approbation</Typography>
                      <Typography variant="body1">{chefCentre.referenceApprobationCNEH || '-'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Date approbation</Typography>
                      <Typography variant="body1">
                        {chefCentre.dateApprobationCNEH ? new Date(chefCentre.dateApprobationCNEH).toLocaleDateString() : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">Niveau de formation</Typography>
                      <Typography variant="body1">{chefCentre.niveauFormation || '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Informations de contact */}
            <Grid item xs={12}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneIcon />
                    Informations de contact
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Téléphone</Typography>
                      <Typography variant="body1" fontWeight="bold">{chefCentre.tel}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{chefCentre.mail || '-'}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon />
                Historique du Chef de Centre [ {chefCentre.prenom} {chefCentre.nom} ]
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nom</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date Début Affectation</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date Fin Affectation</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date Mise à jour</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(details?.historique) && details.historique.length > 0 ? (
                    details.historique.map((item, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell>{item.cct}</TableCell>
                        <TableCell>{item.nom}</TableCell>
                        <TableCell>
                          {item.dateDebutAffectation ? new Date(item.dateDebutAffectation).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell>
                          {item.dateFinAffectation ? new Date(item.dateFinAffectation).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell>
                          {item.dateMiseAJour ? new Date(item.dateMiseAJour).toLocaleDateString() : '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Aucun historique trouvé
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Button 
          onClick={onEdit} 
          variant="contained" 
          color="primary"
          startIcon={<EditIcon />}
          sx={{ px: 3 }}
        >
          Saisir
        </Button>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="secondary"
          sx={{ px: 3 }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 