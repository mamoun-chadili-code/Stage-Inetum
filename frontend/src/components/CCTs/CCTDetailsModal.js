import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  DirectionsCar as CarIcon,
  Settings as SettingsIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

export default function CCTDetailsModal({ open, onClose, cct, details, tab = 0, onTabChange, onEdit }) {
  if (!cct) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR');
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return '#757575';
    const statut = status.toLowerCase();
    if (statut.includes('activité') || statut.includes('active')) return '#4caf50';
    if (statut.includes('inactif')) return '#f44336';
    if (statut.includes('suspendu')) return '#ff9800';
    if (statut.includes('fermer') || statut.includes('fermé')) return '#9e9e9e';
    return '#757575';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: '#1976d2', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon />
          <Typography variant="h6">Détails du Centre de Contrôle Technique</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            GESTION DES CCTS
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* En-tête avec nom du CCT */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {cct.nom}
            </Typography>
            <Chip 
              label={cct.statut || 'Statut non défini'} 
              sx={{
                backgroundColor: getStatusColor(cct.statut),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 2,
                '&:hover': {
                  opacity: 0.8
                }
              }}
            />
          </Box>

          {/* Onglets */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tab} onChange={onTabChange} aria-label="Détails du CCT">
              <Tab label="DETAILS DE CCT" icon={<BusinessIcon />} iconPosition="start" />
              <Tab label="LIGNES / AGENTS CCT" icon={<PersonIcon />} iconPosition="start" />
              <Tab label="HISTORIQUE CCT" icon={<HistoryIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Contenu des onglets */}
          {tab === 0 && (
            <Box>
              {/* Section 1: Informations principales (2 colonnes équilibrées) */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Colonne gauche: Informations d'identification */}
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <AssignmentIcon />
                        Informations d'identification
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>CCT</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.nom || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Agrément</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.agrement || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Date agrément</Typography>
                          <Typography variant="body1">{formatDate(cct.dateAgrement) || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Statut</Typography>
                          <Typography variant="body1">{cct.statut || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Catégorie</Typography>
                          <Typography variant="body1">{cct.categorie || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Type</Typography>
                          <Typography variant="body1">{cct.type || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Réseau</Typography>
                          <Typography variant="body1">{cct.reseau || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Cadre d'autorisation</Typography>
                          <Typography variant="body1">{cct.cadreAutorisation || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Colonne droite: Informations de contact */}
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <PhoneIcon />
                        Informations de contact
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Adresse siège</Typography>
                          <Typography variant="body1">{cct.adresseSiege || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Téléphone</Typography>
                          <Typography variant="body1">{cct.tel || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Fax</Typography>
                          <Typography variant="body1">{cct.fax || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Email</Typography>
                          <Typography variant="body1">{cct.mail || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>ICE</Typography>
                          <Typography variant="body1">{cct.ice || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Id. Fiscal</Typography>
                          <Typography variant="body1">{cct.idFiscal || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Section 2: Informations géographiques (pleine largeur) */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Card elevation={2}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationIcon />
                        Informations géographiques
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Région</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.region || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Province</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.province || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Ville</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.ville || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Adresse domiciliation</Typography>
                          <Typography variant="body1">{cct.adresseDomiciliation || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Adresse CCT</Typography>
                          <Typography variant="body1" fontWeight="bold">{cct.adresseCCT || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Coordonnées GPS</Typography>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Latitude</Typography>
                              <Typography variant="body2" fontWeight="bold">{cct.latitude || '-'}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Longitude</Typography>
                              <Typography variant="body2" fontWeight="bold">{cct.longitude || '-'}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Section 3: Informations complémentaires et dates (2 colonnes équilibrées) */}
              <Grid container spacing={3}>
                {/* Colonne gauche: Informations complémentaires */}
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <SettingsIcon />
                        Informations complémentaires
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Personne morale</Typography>
                          <Box>
                            {cct.isPersonneMorale ? (
                              <Chip label="Oui" color="success" size="small" icon={<CheckCircleIcon />} />
                            ) : (
                              <Chip label="Non" color="default" size="small" />
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Engagements spécifiques</Typography>
                          <Typography variant="body1">{cct.engagementSpecifique || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Quota VL</Typography>
                          <Typography variant="body1" fontWeight="bold" color="primary">{cct.quotaVL || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Quota PL</Typography>
                          <Typography variant="body1" fontWeight="bold" color="primary">{cct.quotaPL || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Colonne droite: Dates importantes */}
                <Grid item xs={12} md={6}>
                  <Card elevation={2} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <CalendarIcon />
                        Dates importantes
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Date statut</Typography>
                          <Typography variant="body1" fontWeight="bold">{formatDate(cct.dateStatut) || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Date ralliement</Typography>
                          <Typography variant="body1" fontWeight="bold">{formatDate(cct.dateRalliement) || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Thumbprint certificat</Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}>
                            {cct.thumbprintCertificat || '-'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Onglet Lignes/Agents CCT */}
          {tab === 1 && (
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <PersonIcon />
                  LIGNES / AGENTS CCT
                </Typography>
                
                {details.lignes && details.lignes.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Num ligne</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Catégorie</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nom Agent</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>CIN</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>CAP</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details.lignes.map((ligne, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{ligne.numeroLigne || index + 1}</TableCell>
                          <TableCell>
                            <Chip 
                              label={ligne.categorie || 'N/A'} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{ligne.nomAgent || '-'}</TableCell>
                          <TableCell>{ligne.cin || '-'}</TableCell>
                          <TableCell>{ligne.cap || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <PersonIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Aucune ligne/agent trouvé
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ce CCT n'a pas encore de lignes ou d'agents associés.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}

          {/* Onglet Historique CCT */}
          {tab === 2 && (
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <HistoryIcon />
                  HISTORIQUE CCT
                </Typography>
                
                {details.historique && details.historique.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Réseau</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date ralliement</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date fin ralliement</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {details.historique.map((hist, index) => (
                        <TableRow key={index} hover>
                          <TableCell>{hist.cct || cct.nom}</TableCell>
                          <TableCell>{hist.reseau || '-'}</TableCell>
                          <TableCell>{formatDate(hist.dateRalliement) || '-'}</TableCell>
                          <TableCell>{formatDate(hist.dateFinRalliement) || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <HistoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Aucun historique trouvé
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ce CCT n'a pas encore d'historique de ralliement.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Button
          onClick={onEdit}
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ 
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0'
            }
          }}
        >
          Saisir
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 