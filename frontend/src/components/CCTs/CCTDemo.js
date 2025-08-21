import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  DirectionsCar as CarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import CCTs from './CCTs';

export default function CCTDemo() {
  const [showModule, setShowModule] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      {!showModule ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CarIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom color="primary">
            Démonstration du Module CCT
          </Typography>
          <Typography variant="h6" gutterBottom>
            Centres de Contrôle Technique
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="body1" gutterBottom>
              <strong>Fonctionnalités disponibles :</strong>
            </Typography>
            <ul>
              <li>✅ Recherche et filtrage avancés</li>
              <li>✅ Ajout de nouveaux CCTs</li>
              <li>✅ Modification des CCTs existants</li>
              <li>✅ Suppression sécurisée</li>
              <li>✅ Consultation détaillée avec onglets</li>
              <li>✅ Gestion des lignes et agents</li>
              <li>✅ Historique des ralliements</li>
              <li>✅ Pagination et navigation</li>
              <li>✅ Interface moderne et responsive</li>
            </ul>
          </Alert>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <Card sx={{ minWidth: 200, textAlign: 'center' }}>
                <CardContent>
                  <AddIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h6" color="success.main">Ajouter</Typography>
                  <Typography variant="body2">Créer un nouveau CCT</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item>
              <Card sx={{ minWidth: 200, textAlign: 'center' }}>
                <CardContent>
                  <EditIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                  <Typography variant="h6" color="info.main">Modifier</Typography>
                  <Typography variant="body2">Éditer un CCT existant</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item>
              <Card sx={{ minWidth: 200, textAlign: 'center' }}>
                <CardContent>
                  <InfoIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6" color="primary.main">Consulter</Typography>
                  <Typography variant="body2">Voir les détails complets</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item>
              <Card sx={{ minWidth: 200, textAlign: 'center' }}>
                <CardContent>
                  <DeleteIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                  <Typography variant="h6" color="error.main">Supprimer</Typography>
                  <Typography variant="body2">Supprimer un CCT</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>Le module CCT est entièrement fonctionnel !</strong>
              <br />
              Cliquez sur le bouton ci-dessous pour lancer la démonstration.
            </Typography>
          </Alert>

          <Button
            variant="contained"
            size="large"
            startIcon={<CarIcon />}
            onClick={() => setShowModule(true)}
            sx={{ 
              bgcolor: '#1976d2',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Lancer le Module CCT
          </Button>

          <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Instructions de test :
            </Typography>
            <ol style={{ textAlign: 'left' }}>
              <li>Cliquez sur "Lancer le Module CCT"</li>
              <li>Testez les filtres de recherche (Région, Ville, Réseau, Année)</li>
              <li>Essayez d'ajouter un nouveau CCT avec le bouton "+ Ajouter CCT"</li>
              <li>Testez la modification d'un CCT existant</li>
              <li>Explorez les détails avec les différents onglets</li>
              <li>Testez la pagination et la recherche</li>
            </ol>
          </Box>
        </Paper>
      ) : (
        <Box>
          <Button
            variant="outlined"
            onClick={() => setShowModule(false)}
            sx={{ mb: 2 }}
          >
            ← Retour à la démonstration
          </Button>
          <CCTs />
        </Box>
      )}
    </Box>
  );
}
