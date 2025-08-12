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
  Paper
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
  Close as CloseIcon
} from '@mui/icons-material';

export default function CCTDetailsModal({ open, onClose, cct, details, tab = 0, onTabChange, onEdit }) {
  if (!cct) return null;

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
          <BusinessIcon />
          <Typography variant="h6">Détails du Centre de Contrôle Technique</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* En-tête avec nom du CCT */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            {cct.nom}
          </Typography>
          <Chip 
            label={cct.statut || 'Statut non défini'} 
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
              fontSize: '1rem',
              px: 2,
              '&:hover': {
                opacity: 0.8
              }
            }}
          />
        </Box>

        {/* Informations principales */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Informations d'identification */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentIcon />
                  Informations d'identification
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Agrément</Typography>
                    <Typography variant="body1" fontWeight="bold">{cct.agrement || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Date agrément</Typography>
                    <Typography variant="body1">{cct.dateAgrement || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Cadre d'autorisation</Typography>
                    <Typography variant="body1">{cct.cadreAutorisation || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Catégorie</Typography>
                    <Typography variant="body1">{cct.categorie || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Type</Typography>
                    <Typography variant="body1">{cct.type || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Date statut</Typography>
                    <Typography variant="body1">{cct.dateStatut || '-'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations de localisation */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon />
                  Localisation
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Région</Typography>
                    <Typography variant="body1">{cct.region || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Province</Typography>
                    <Typography variant="body1">{cct.province || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Ville</Typography>
                    <Typography variant="body1">{cct.ville || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Réseau</Typography>
                    <Typography variant="body1">{cct.reseau || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Adresse</Typography>
                    <Typography variant="body1">{cct.adresseCCT || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Latitude</Typography>
                    <Typography variant="body1">{cct.latitude || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Longitude</Typography>
                    <Typography variant="body1">{cct.longitude || '-'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations de contact */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon />
                  Contact
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Téléphone</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      {cct.tel || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Fax</Typography>
                    <Typography variant="body1">{cct.fax || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      {cct.mail || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">ICE</Typography>
                    <Typography variant="body1">{cct.ice || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Id. Fiscal</Typography>
                    <Typography variant="body1">{cct.idFiscal || '-'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations supplémentaires */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon />
                  Informations supplémentaires
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Date ralliement</Typography>
                    <Typography variant="body1">{cct.dateRalliement || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Personne morale</Typography>
                    <Chip 
                      label={cct.personneMorale ? 'Oui' : 'Non'} 
                      color={cct.personneMorale ? 'success' : 'default'}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Quota VL</Typography>
                    <Typography variant="body1">{cct.quotaVL || '-'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Quota PL</Typography>
                    <Typography variant="body1">{cct.quotaPL || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Engagements spécifiques</Typography>
                    <Typography variant="body1">{cct.engagementsSpecifiques || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Adresse siège</Typography>
                    <Typography variant="body1">{cct.adresseSiege || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Adresse domiciliation</Typography>
                    <Typography variant="body1">{cct.adresseDomiciliation || '-'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Onglets */}
        <Paper elevation={1} sx={{ mb: 2 }}>
          <Tabs 
            value={tab} 
            onChange={onTabChange}
            sx={{ 
              '& .MuiTab-root': { 
                minHeight: 48,
                fontSize: '1rem',
                fontWeight: 'bold'
              }
            }}
          >
            <Tab 
              label="Lignes / Agents CCT" 
              icon={<PersonIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Historique CCT" 
              icon={<HistoryIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Contenu des onglets */}
        {tab === 0 && (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon />
                Lignes / Agents CCT
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Num ligne</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Catégorie</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nom Agent</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>CIN</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>CAP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(details?.lignes) && details.lignes.length > 0 ? (
                    details.lignes.map((ligne, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell>{ligne.numero}</TableCell>
                        <TableCell>{ligne.categorie}</TableCell>
                        <TableCell>{ligne.agentNom}</TableCell>
                        <TableCell>{ligne.agentCIN}</TableCell>
                        <TableCell>{ligne.agentCAP}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          Aucune ligne trouvée
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {tab === 1 && (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon />
                Historique CCT
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>CCT</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Réseau</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date ralliement</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date fin ralliement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(details?.historique) && details.historique.length > 0 ? (
                    details.historique.map((h, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell>{h.cctNom}</TableCell>
                        <TableCell>{h.reseauNom}</TableCell>
                        <TableCell>{h.dateRalliement}</TableCell>
                        <TableCell>{h.dateFinRalliement}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
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
          Modifier
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