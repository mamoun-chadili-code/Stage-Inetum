import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  PrivacyTip as PrivacyTipIcon
} from '@mui/icons-material';
import cctService from '../../services/cctService';

const CCTDebugModal = ({ open, onClose, formData }) => {
  const [debugResults, setDebugResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runDebug = async () => {
    setIsLoading(true);
    setDebugResults(null);

    try {
      console.log('🔍 === DÉBUT DU DEBUG CCT ===');
      
      const results = {
        serviceAccessibility: {},
        functionTests: {},
        dataTransformation: {},
        recommendations: []
      };

      // Test 1: Accessibilité du service
      console.log('\n🧪 TEST 1: Accessibilité du service');
      results.serviceAccessibility = {
        serviceExists: typeof cctService !== 'undefined',
        serviceType: typeof cctService,
        serviceKeys: cctService ? Object.keys(cctService) : [],
        cleanComplexObjectsExists: cctService && typeof cctService.cleanComplexObjects === 'function',
        validateAndCleanDataExists: cctService && typeof cctService.validateAndCleanData === 'function'
      };

      console.log('Service existe:', results.serviceAccessibility.serviceExists);
      console.log('Type du service:', results.serviceAccessibility.serviceType);
      console.log('Clés du service:', results.serviceAccessibility.serviceKeys);
      console.log('cleanComplexObjects existe:', results.serviceAccessibility.cleanComplexObjectsExists);
      console.log('validateAndCleanData existe:', results.serviceAccessibility.validateAndCleanDataExists);

      // Test 2: Test des fonctions
      if (results.serviceAccessibility.cleanComplexObjectsExists) {
        console.log('\n🧪 TEST 2: Test de cleanComplexObjects');
        const testData = {
          categorie: { id: 1, libelle: "Test" },
          statut: { id: 2, libelle: "Test" }
        };
        
        try {
          const result = cctService.cleanComplexObjects(testData);
          results.functionTests.cleanComplexObjects = {
            success: true,
            input: testData,
            output: result,
            expectedFields: ['categorieId', 'statutId'],
            actualFields: Object.keys(result),
            missingFields: ['categorieId', 'statutId'].filter(field => !(field in result))
          };
          console.log('✅ cleanComplexObjects fonctionne:', result);
        } catch (error) {
          results.functionTests.cleanComplexObjects = {
            success: false,
            error: error.message,
            stack: error.stack
          };
          console.error('❌ cleanComplexObjects échoue:', error);
        }
      }

      if (results.serviceAccessibility.validateAndCleanDataExists) {
        console.log('\n🧪 TEST 3: Test de validateAndCleanData');
        const testData = {
          nom: "Test",
          agrement: "TEST001",
          categorieId: 1,
          statutId: 1,
          reseauId: 1,
          regionId: 1,
          provinceId: 1,
          villeId: 1,
          adresseCCT: "Test",
          latitude: "0",
          longitude: "0",
          tel: "0123456789",
          cadreAutorisationId: 1,
          typeId: 1,
          quotaVL: 100,
          dateAgrement: "2024-01-01",
          dateStatut: "2024-01-01",
          dateRalliement: "2024-01-01"
        };
        
        try {
          const result = cctService.validateAndCleanData(testData);
          results.functionTests.validateAndCleanData = {
            success: true,
            input: testData,
            output: result,
            expectedFields: Object.keys(testData),
            actualFields: Object.keys(result),
            missingFields: Object.keys(testData).filter(field => !(field in result))
          };
          console.log('✅ validateAndCleanData fonctionne:', result);
        } catch (error) {
          results.functionTests.validateAndCleanData = {
            success: false,
            error: error.message,
            stack: error.stack
          };
          console.error('❌ validateAndCleanData échoue:', error);
        }
      }

      // Test 3: Transformation des données du formulaire
      if (formData && results.serviceAccessibility.cleanComplexObjectsExists) {
        console.log('\n🧪 TEST 4: Transformation des données du formulaire');
        try {
          const cleanedData = cctService.cleanComplexObjects(formData);
          results.dataTransformation = {
            originalData: formData,
            cleanedData: cleanedData,
            originalKeys: Object.keys(formData),
            cleanedKeys: Object.keys(cleanedData),
            complexObjectsFound: Object.keys(formData).filter(key => 
              formData[key] && typeof formData[key] === 'object' && formData[key].id !== undefined
            ),
            idFieldsCreated: Object.keys(cleanedData).filter(key => key.endsWith('Id')),
            transformationSuccess: true
          };
          console.log('✅ Transformation réussie:', cleanedData);
        } catch (error) {
          results.dataTransformation = {
            transformationSuccess: false,
            error: error.message,
            stack: error.stack
          };
          console.error('❌ Transformation échoue:', error);
        }
      }

      // Générer des recommandations
      if (!results.serviceAccessibility.serviceExists) {
        results.recommendations.push({
          type: 'error',
          message: 'Le service cctService n\'existe pas. Vérifiez l\'import.',
          priority: 'high'
        });
      }

      if (!results.serviceAccessibility.cleanComplexObjectsExists) {
        results.recommendations.push({
          type: 'error',
          message: 'La fonction cleanComplexObjects n\'est pas accessible.',
          priority: 'high'
        });
      }

      if (!results.serviceAccessibility.validateAndCleanDataExists) {
        results.recommendations.push({
          type: 'error',
          message: 'La fonction validateAndCleanData n\'est pas accessible.',
          priority: 'high'
        });
      }

      if (results.functionTests.cleanComplexObjects && !results.functionTests.cleanComplexObjects.success) {
        results.recommendations.push({
          type: 'error',
          message: 'La fonction cleanComplexObjects échoue lors de l\'exécution.',
          priority: 'high'
        });
      }

      if (results.dataTransformation && !results.dataTransformation.transformationSuccess) {
        results.recommendations.push({
          type: 'error',
          message: 'La transformation des données échoue.',
          priority: 'high'
        });
      }

      if (results.dataTransformation && results.dataTransformation.transformationSuccess) {
        const missingFields = results.dataTransformation.originalKeys.filter(key => 
          !results.dataTransformation.cleanedKeys.includes(key) && 
          !results.dataTransformation.cleanedKeys.includes(key + 'Id')
        );
        
        if (missingFields.length > 0) {
          results.recommendations.push({
            type: 'warning',
            message: `Certains champs n'ont pas été transformés: ${missingFields.join(', ')}`,
            priority: 'medium'
          });
        }
      }

      setDebugResults(results);
      console.log('🔍 === FIN DU DEBUG CCT ===');
      console.log('Résultats:', results);

    } catch (error) {
      console.error('❌ ERREUR LORS DU DEBUG:', error);
      setDebugResults({
        error: error.message,
        stack: error.stack
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'error': return <ErrorIcon color="error" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'success': return <CheckIcon color="success" />;
      default: return <PrivacyTipIcon color="info" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error.main';
      case 'medium': return 'warning.main';
      case 'low': return 'info.main';
      default: return 'text.primary';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          🔍 Debug CCT - Diagnostic Complet
          {isLoading && <CircularProgress size={20} />}
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            Diagnostic de la modification CCT
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ce diagnostic va vérifier l'accessibilité des fonctions et tester la transformation des données.
          </Typography>
        </Box>

        <Box mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={runDebug}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Diagnostic en cours...' : '🔍 Lancer le diagnostic complet'}
          </Button>
        </Box>

        {debugResults && (
          <>
            {/* Accessibilité du service */}
            {debugResults.serviceAccessibility && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  📦 Accessibilité du Service
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      {debugResults.serviceAccessibility.serviceExists ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Service cctService existe" 
                      secondary={debugResults.serviceAccessibility.serviceExists ? '✅' : '❌'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {debugResults.serviceAccessibility.cleanComplexObjectsExists ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Fonction cleanComplexObjects accessible" 
                      secondary={debugResults.serviceAccessibility.cleanComplexObjectsExists ? '✅' : '❌'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {debugResults.serviceAccessibility.validateAndCleanDataExists ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Fonction validateAndCleanData accessible" 
                      secondary={debugResults.serviceAccessibility.validateAndCleanDataExists ? '✅' : '❌'}
                    />
                  </ListItem>
                </List>
              </Paper>
            )}

            {/* Tests des fonctions */}
            {debugResults.functionTests && Object.keys(debugResults.functionTests).length > 0 && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  🧪 Tests des Fonctions
                </Typography>
                {Object.entries(debugResults.functionTests).map(([functionName, testResult]) => (
                  <Box key={functionName} mb={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      {functionName}
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          {testResult.success ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText 
                          primary={testResult.success ? 'Fonctionne' : 'Échoue'} 
                          secondary={testResult.success ? '✅' : `❌ ${testResult.error}`}
                        />
                      </ListItem>
                      {testResult.success && testResult.missingFields && testResult.missingFields.length > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Champs manquants" 
                            secondary={testResult.missingFields.join(', ')}
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                ))}
              </Paper>
            )}

            {/* Transformation des données */}
            {debugResults.dataTransformation && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  🔄 Transformation des Données
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      {debugResults.dataTransformation.transformationSuccess ? <CheckIcon color="success" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Transformation réussie" 
                      secondary={debugResults.dataTransformation.transformationSuccess ? '✅' : '❌'}
                    />
                  </ListItem>
                  {debugResults.dataTransformation.transformationSuccess && (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <PrivacyTipIcon color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Objets complexes trouvés" 
                          secondary={debugResults.dataTransformation.complexObjectsFound.join(', ') || 'Aucun'}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PrivacyTipIcon color="info" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Champs ID créés" 
                          secondary={debugResults.dataTransformation.idFieldsCreated.join(', ') || 'Aucun'}
                        />
                      </ListItem>
                    </>
                  )}
                </List>
              </Paper>
            )}

            {/* Recommandations */}
            {debugResults.recommendations && debugResults.recommendations.length > 0 && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  💡 Recommandations
                </Typography>
                <List dense>
                  {debugResults.recommendations.map((rec, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {getIcon(rec.type)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={rec.message}
                        primaryTypographyProps={{
                          sx: { color: getPriorityColor(rec.priority) }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Erreur générale */}
            {debugResults.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography variant="h6">❌ Erreur lors du diagnostic</Typography>
                <Typography variant="body2">
                  <strong>Message:</strong> {debugResults.error}
                </Typography>
                {debugResults.stack && (
                  <Box component="pre" sx={{ mt: 1, fontSize: '0.75rem' }}>
                    {debugResults.stack}
                  </Box>
                )}
              </Alert>
            )}
          </>
        )}

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body2" component="div">
            1. Cliquez sur "Lancer le diagnostic complet"<br/>
            2. Observez la console pour les logs détaillés<br/>
            3. Vérifiez les résultats ci-dessus<br/>
            4. Suivez les recommandations pour corriger les problèmes
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CCTDebugModal;
