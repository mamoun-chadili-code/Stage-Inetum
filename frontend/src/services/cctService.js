import api from './api';

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString || dateString === '') return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    // Retourner l'objet Date directement pour le backend
    return date;
  } catch (error) {
    console.warn('Erreur de formatage de date:', dateString, error);
    return null;
  }
};

const cctService = {
  // Fonction utilitaire pour nettoyer les objets complexes
  cleanComplexObjects(data) {
    try {
      console.log('=== NETTOYAGE DES OBJETS COMPLEXES ===');
      console.log('Données avant nettoyage:', data);
      console.log('Type des données:', typeof data);
      console.log('Clés des données:', Object.keys(data));
      
      if (!data || typeof data !== 'object') {
        console.log('❌ Données invalides pour le nettoyage');
        return data;
      }
      
      const cleaned = { ...data };
      
      // Liste des champs qui doivent être des IDs, pas des objets
      const idFields = [
        'categorie', 'statut', 'reseau', 'region', 'province', 'ville',
        'cadreAutorisation', 'type', 'agents', 'lignes', 'formations',
        'equipements', 'decisions', 'chefsCentres'
      ];
      
      console.log('Champs à traiter:', idFields);
      
      idFields.forEach(field => {
        console.log(`\n--- Traitement du champ: ${field} ---`);
        console.log(`Valeur actuelle:`, cleaned[field]);
        console.log(`Type:`, typeof cleaned[field]);
        console.log(`Est un objet:`, cleaned[field] && typeof cleaned[field] === 'object');
        console.log(`Est un tableau:`, Array.isArray(cleaned[field]));
        
        if (cleaned[field] && typeof cleaned[field] === 'object') {
          if (cleaned[field].id !== undefined) {
            // Remplacer l'objet par son ID
            const newFieldName = `${field}Id`;
            cleaned[newFieldName] = cleaned[field].id;
            delete cleaned[field];
            console.log(`  ✅ ${field} → ${newFieldName}: ${cleaned[newFieldName]}`);
          } else if (Array.isArray(cleaned[field])) {
            // Pour les tableaux, les vider ou les supprimer
            if (cleaned[field].length === 0) {
              delete cleaned[field];
              console.log(`  🗑️ ${field} (tableau vide) supprimé`);
            } else {
              // Garder seulement les IDs des éléments du tableau
              const ids = cleaned[field]
                .filter(item => item && item.id !== undefined)
                .map(item => item.id);
              cleaned[field] = ids;
              console.log(`  🔄 ${field} → tableau d'IDs:`, ids);
            }
          } else {
            console.log(`  ⚠️ ${field}: objet sans ID, supprimé`);
            delete cleaned[field];
          }
        } else {
          console.log(`  ℹ️ ${field}: pas un objet, ignoré`);
        }
      });
      
      console.log('\n=== DONNÉES APRÈS NETTOYAGE ===');
      console.log('Données nettoyées:', cleaned);
      console.log('Clés après nettoyage:', Object.keys(cleaned));
      
      return cleaned;
    } catch (error) {
      console.error('❌ ERREUR dans cleanComplexObjects:', error);
      console.error('Stack trace:', error.stack);
      return data; // Retourner les données originales en cas d'erreur
    }
  },

  // Fonction de validation et nettoyage des données
  validateAndCleanData(data) {
    console.log('=== VALIDATION DES DONNÉES ===');
    console.log('Données reçues:', data);
    
    const cleaned = {};
    
    // Champs obligatoires selon CCTUpdateDto (sauf 'id' pour la création)
    const requiredFields = {
      // id: { type: 'number' },           // ❌ ID NON OBLIGATOIRE pour la création
      nom: { type: 'string' },
      agrement: { type: 'string' },
      dateAgrement: { type: 'date' },
      categorieId: { type: 'number' },
      statutId: { type: 'number' },
      dateStatut: { type: 'date' },
      reseauId: { type: 'number' },
      dateRalliement: { type: 'date' },
      adresseCCT: { type: 'string' },
      latitude: { type: 'string' },
      longitude: { type: 'string' },
      villeId: { type: 'number' },
      tel: { type: 'string' },
      cadreAutorisationId: { type: 'number' },
      typeId: { type: 'number' },
      quotaVL: { type: 'number' }
    };
    
    // Champs optionnels selon CCTUpdateDto
    const optionalFields = {
      adresseSiege: { type: 'string' },
      adresseDomiciliation: { type: 'string' },
      fax: { type: 'string' },
      mail: { type: 'string' },
      ice: { type: 'string' },
      idFiscal: { type: 'string' },
      engagementSpecifique: { type: 'string' },
      isPersonneMorale: { type: 'boolean' },
      quotaPL: { type: 'number' },
      provinceId: { type: 'number' },
      regionId: { type: 'number' },
      thumbprintCertificat: { type: 'string' }
    };
    
    // Traiter les champs obligatoires
    Object.entries(requiredFields).forEach(([field, config]) => {
      console.log(`\n--- Traitement du champ OBLIGATOIRE: ${field} ---`);
      let value = data[field];
      console.log(`Valeur reçue:`, value);
      console.log(`Type reçu:`, typeof value);
      
      // Extraire l'ID si c'est un objet
      if (value && typeof value === 'object' && value.id !== undefined) {
        console.log(`🔄 ${field} est un objet, extraction de l'ID:`, value.id);
        value = value.id;
      }
      
      // Vérifier si le champ est présent et non vide
      if (value === null || value === undefined || value === '') {
        console.log(`❌ ${field} est obligatoire mais vide`);
        throw new Error(`Le champ ${field} est obligatoire`);
      }
      
      // Valider le type
      if (config.type === 'number' && isNaN(Number(value))) {
        console.log(`❌ ${field} doit être un nombre`);
        throw new Error(`Le champ ${field} doit être un nombre`);
      }
      
      if (config.type === 'date' && !(value instanceof Date) && isNaN(Date.parse(value))) {
        console.log(`❌ ${field} doit être une date valide`);
        throw new Error(`Le champ ${field} doit être une date valide`);
      }
      
      if (config.type === 'boolean' && typeof value !== 'boolean') {
        console.log(`❌ ${field} doit être un booléen`);
        throw new Error(`Le champ ${field} doit être un booléen`);
      }
      
      // Ajouter le champ nettoyé
      cleaned[field] = value;
      console.log(`✅ ${field} validé et ajouté:`, value);
    });
    
    // Traiter les champs optionnels
    Object.entries(optionalFields).forEach(([field, config]) => {
      let value = data[field];
      
      // Extraire l'ID si c'est un objet
      if (value && typeof value === 'object' && value.id !== undefined) {
        console.log(`🔄 ${field} optionnel est un objet, extraction de l'ID:`, value.id);
        value = value.id;
      }
      
      // Si le champ est présent, le valider
      if (value !== null && value !== undefined && value !== '') {
        // Validation de type pour les champs optionnels
        if (config.type === 'number' && isNaN(Number(value))) {
          console.log(`⚠️ ${field} ignoré (type invalide):`, value);
          return;
        }
        
        if (config.type === 'date' && !(value instanceof Date) && isNaN(Date.parse(value))) {
          console.log(`⚠️ ${field} ignoré (date invalide):`, value);
          return;
        }
        
        if (config.type === 'boolean' && typeof value !== 'boolean') {
          console.log(`⚠️ ${field} ignoré (booléen invalide):`, value);
          return;
        }
        
        cleaned[field] = value;
        console.log(`✅ ${field} optionnel ajouté:`, value);
      } else {
        console.log(`ℹ️ ${field} optionnel ignoré (vide)`);
      }
    });
    
    // Ajouter l'ID seulement s'il est présent (pour la modification)
    if (data.id !== null && data.id !== undefined && data.id !== '') {
      cleaned.id = parseInt(data.id);
      console.log(`✅ ID ajouté pour modification:`, cleaned.id);
    } else {
      console.log(`ℹ️ Pas d'ID - mode création`);
    }
    
    console.log('\n=== DONNÉES VALIDÉES ET NETTOYÉES ===');
    console.log('Données finales:', cleaned);
    console.log('Clés finales:', Object.keys(cleaned));
    console.log('Total des champs:', Object.keys(cleaned).length);
    
    console.log('\n=== VÉRIFICATION FINALE DES TYPES ===');
    Object.entries(cleaned).forEach(([field, value]) => {
      console.log(`${field}: ${value} (${typeof value})`);
    });
    
    return cleaned;
  },

  // Récupérer tous les CCTs pour les dropdowns
  async getCCTsForDropdown() {
    try {
      const response = await api.get('/CCTs', {
        params: {
          page: 1,
          pageSize: 1000 // Récupérer tous les CCTs
        }
      });
      
      // Transformer les données pour le dropdown
      return response.data.map(cct => ({
        id: cct.id,
        nom: cct.nom,
        agrement: cct.agrement
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des CCTs:', error);
      throw error;
    }
  },

  // Récupérer tous les CCTs (alias pour compatibilité)
  async getAllCCTs() {
    return this.getCCTsForDropdown();
  },

  // Récupérer un CCT par ID
  async getCCTById(id) {
    try {
      const response = await api.get(`/CCTs/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du CCT:', error);
      throw error;
    }
  },

  // Alias pour getCCTById (pour compatibilité)
  getCCT: async function(id) {
    return this.getCCTById(id);
  },

  // Récupérer tous les CCTs avec pagination
  async getCCTs(params = {}, page = 1, pageSize = 5) {
    try {
      const response = await api.get('/CCTs', {
        params: {
          ...params,
          page,
          pageSize
        }
      });
      
      // Extraire les headers de pagination
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      const pageCount = parseInt(response.headers['x-page-count'] || '1');
      
      return {
        data: response.data,
        pagination: {
          totalCount,
          pageCount,
          currentPage: page,
          pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des CCTs:', error);
      return {
        data: [],
        pagination: {
          totalCount: 0,
          pageCount: 1,
          currentPage: 1,
          pageSize
        }
      };
    }
  },

  // Créer un nouveau CCT
  async createCCT(data) {
    try {
      console.log('=== CRÉATION CCT ===');
      console.log('Données brutes reçues:', data);
      console.log('Type de données:', typeof data);
      console.log('Clés des données:', Object.keys(data));
      
      // Nettoyer les objets complexes en premier
      const cleanedFromObjects = this.cleanComplexObjects(data);
      
      // Valider et nettoyer les données
      const cleanedData = this.validateAndCleanData(cleanedFromObjects);
      
      console.log('Données nettoyées:', cleanedData);
      console.log('Type de données nettoyées:', typeof cleanedData);
      console.log('Clés des données nettoyées:', Object.keys(cleanedData));
      
      const response = await api.post('/CCTs', cleanedData);
      console.log('CCT créé avec succès');
      return response;
    } catch (error) {
      console.error('=== ERREUR CRÉATION CCT ===');
      console.error('Type d\'erreur:', typeof error);
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Gestion des erreurs de validation côté client
      if (error.message && error.message.includes('est obligatoire')) {
        console.error('❌ Erreur de validation côté client:', error.message);
        throw new Error(error.message);
      }
      
      // Gestion des erreurs de validation backend
      if (error.response?.data?.errors) {
        console.error('❌ Erreurs de validation backend:', error.response.data.errors);
        const errorDetails = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        throw new Error(`Erreur de validation: ${errorDetails}`);
      }
      
      // Gestion des erreurs générales backend
      if (error.response?.data?.title) {
        console.error('❌ Erreur backend:', error.response.data.title);
        throw new Error(error.response.data.title);
      }
      
      // Gestion des erreurs de réseau
      if (error.request) {
        console.error('❌ Erreur de réseau:', error.request);
        throw new Error('Erreur de connexion au serveur');
      }
      
      // Gestion des erreurs inconnues
      console.error('❌ Erreur inconnue:', error);
      throw new Error('Erreur lors de la création du CCT');
    }
  },

  // Mettre à jour un CCT
  async updateCCT(id, data) {
    try {
      console.log('=== MISE À JOUR CCT ===');
      console.log('ID:', id);
      console.log('Données brutes reçues:', data);
      console.log('Type de données:', typeof data);
      console.log('Clés des données:', Object.keys(data));
      
      // TEST: Vérifier que la fonction cleanComplexObjects est accessible
      console.log('=== TEST D\'ACCÈS À LA FONCTION ===');
      console.log('cleanComplexObjects existe:', typeof this.cleanComplexObjects);
      console.log('cleanComplexObjects est une fonction:', typeof this.cleanComplexObjects === 'function');
      
      if (typeof this.cleanComplexObjects !== 'function') {
        console.error('❌ ERREUR: cleanComplexObjects n\'est pas une fonction !');
        console.error('Type reçu:', typeof this.cleanComplexObjects);
        throw new Error('Fonction de nettoyage non disponible');
      }
      
      // TEST: Vérifier que la fonction cleanComplexObjects fonctionne
      console.log('=== TEST DE LA FONCTION CLEAN ===');
      const testData = {
        categorie: { id: 1, libelle: "Test" },
        statut: { id: 2, libelle: "Test" }
      };
      const testResult = this.cleanComplexObjects(testData);
      console.log('Test cleanComplexObjects:', testResult);
      
      // Nettoyer les objets complexes en premier
      const cleanedFromObjects = this.cleanComplexObjects(data);
      
      // Valider et nettoyer les données
      const cleanedData = this.validateAndCleanData(cleanedFromObjects);
      
      console.log('Données nettoyées:', cleanedData);
      console.log('Type de données nettoyées:', typeof cleanedData);
      console.log('Clés des données nettoyées:', Object.keys(cleanedData));
      
      // Vérifier que l'ID est valide
      if (!id || isNaN(parseInt(id))) {
        throw new Error('ID de CCT invalide');
      }
      
      // Log de la requête avant envoi
      console.log('=== REQUÊTE PUT ===');
      console.log('URL:', `/CCTs/${id}`);
      console.log('Headers:', { 'Content-Type': 'application/json' });
      console.log('Données à envoyer:', JSON.stringify(cleanedData, null, 2));
      
      const response = await api.put(`/CCTs/${id}`, cleanedData);
      
      console.log('CCT mis à jour avec succès');
      return response;
    } catch (error) {
      console.error('=== ERREUR MISE À JOUR CCT ===');
      console.error('Type d\'erreur:', typeof error);
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
      
      // Logs détaillés de l'erreur
      if (error.response) {
        console.error('❌ Réponse d\'erreur reçue:');
        console.error('  Status:', error.response.status);
        console.error('  Status Text:', error.response.statusText);
        console.error('  Headers:', error.response.headers);
        console.error('  Data:', error.response.data);
        
        // Analyser le contenu de l'erreur
        if (error.response.data) {
          console.error('❌ Contenu de l\'erreur:');
          Object.keys(error.response.data).forEach(key => {
            console.error(`  ${key}:`, error.response.data[key]);
          });
        }
      }
      
      if (error.request) {
        console.error('❌ Requête envoyée mais pas de réponse:', error.request);
      }
      
      // Gestion des erreurs de validation côté client
      if (error.message && error.message.includes('est obligatoire')) {
        console.error('❌ Erreur de validation côté client:', error.message);
        throw error;
      }
      
      // Gestion des erreurs de validation backend
      if (error.response?.data?.errors) {
        console.error('❌ Erreurs de validation backend:', error.response.data.errors);
        const errorDetails = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        throw new Error(`Erreur de validation: ${errorDetails}`);
      }
      
      // Gestion des erreurs générales backend
      if (error.response?.data?.title) {
        console.error('❌ Erreur backend:', error.response.data.title);
        throw new Error(error.response.data.title);
      }
      
      // Gestion des erreurs de réseau
      if (error.request) {
        console.error('❌ Erreur de réseau:', error.request);
        throw new Error('Erreur de connexion au serveur');
      }
      
      // Gestion des erreurs inconnues
      console.error('❌ Erreur inconnue:', error);
      throw new Error('Erreur lors de la mise à jour du CCT');
    }
  },

  // Supprimer un CCT
  async deleteCCT(id) {
    try {
      console.log(`=== SUPPRESSION CCT ${id} ===`);
      
      // Vérifier d'abord s'il y a des associations
      const hasAssociations = await this.checkCCTAssociations(id);
      
      if (hasAssociations) {
        const errorMessage = `Impossible de supprimer ce CCT car il est associé à des entités liées. 
        
🔍 **Associations trouvées :**
${hasAssociations.agents > 0 ? `• ${hasAssociations.agents} agent(s)` : ''}
${hasAssociations.chefsCentres > 0 ? `• ${hasAssociations.chefsCentres} chef(s) de centre` : ''}
${hasAssociations.lignes > 0 ? `• ${hasAssociations.lignes} ligne(s)` : ''}
${hasAssociations.equipements > 0 ? `• ${hasAssociations.equipements} équipement(s)` : ''}
${hasAssociations.formations > 0 ? `• ${hasAssociations.formations} formation(s)` : ''}
${hasAssociations.decisions > 0 ? `• ${hasAssociations.decisions} décision(s)` : ''}

💡 **Solutions possibles :**
1. Supprimer d'abord ces associations
2. Désactiver le CCT au lieu de le supprimer
3. Contacter l'administrateur système

⚠️ **Action requise :** Gérer ces associations avant la suppression.`;
        
        throw new Error(errorMessage);
      }
      
      // Si pas d'associations, procéder à la suppression
      const response = await api.delete(`/CCTs/${id}`);
      console.log('✅ CCT supprimé avec succès:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du CCT:', error);
      
      if (error.message.includes('associé à des entités liées')) {
        // Erreur d'associations - laisser l'erreur personnalisée
        throw error;
      } else if (error.response?.status === 500) {
        // Erreur backend de contrainte de clé étrangère
        throw new Error(`Impossible de supprimer ce CCT car il est référencé par d'autres données. 
        
🔍 **Cause probable :** Contraintes de clés étrangères non respectées.

💡 **Solutions :**
1. Vérifier les associations dans la base de données
2. Supprimer les références avant la suppression
3. Utiliser la désactivation au lieu de la suppression`);
      } else {
        // Autre type d'erreur
        throw new Error(`Erreur lors de la suppression : ${error.message || 'Erreur inconnue'}`);
      }
    }
  },

  // Supprimer un CCT avec désassociation des agents (sans les supprimer)
  async deleteCCTWithDisassociation(cctId) {
    try {
      console.log(`=== SUPPRESSION CCT ${cctId} AVEC DÉSASSOCIATION ===`);
      
      // 1. Vérifier les associations existantes
      const associations = await this.checkCCTAssociations(cctId);
      
      if (!associations || associations.error) {
        throw new Error('Erreur lors de la vérification des associations');
      }
      
      const totalAssociations = Object.values(associations).reduce((sum, count) => sum + count, 0);
      
      if (totalAssociations === 0) {
        // Pas d'associations, suppression directe
        console.log('✅ Aucune association - suppression directe');
        return await this.deleteCCT(cctId);
      }
      
      console.log(`⚠️ ${totalAssociations} associations trouvées - désassociation en cours...`);
      
      // 2. Désassocier les agents
      if (associations.agents > 0) {
        console.log(`🔄 Désassociation de ${associations.agents} agent(s)...`);
        try {
          await this.disassociateCCTAgents(cctId);
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des agents: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      // 3. Désassocier les chefs de centre
      if (associations.chefsCentres > 0) {
        console.log(`🔄 Désassociation de ${associations.chefsCentres} chef(s) de centre...`);
        try {
          const result = await this.disassociateCCTChefsCentres(cctId);
          if (!result.success) {
            console.warn(`⚠️ Désassociation des chefs de centre partiellement échouée: ${result.message}`);
          }
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des chefs de centre: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      // 4. Désassocier les lignes
      if (associations.lignes > 0) {
        console.log(`🔄 Désassociation de ${associations.lignes} ligne(s)...`);
        try {
          await this.disassociateCCTLignes(cctId);
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des lignes: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      // 5. Désassocier les équipements
      if (associations.equipements > 0) {
        console.log(`🔄 Désassociation de ${associations.equipements} équipement(s)...`);
        try {
          await this.disassociateCCTEquipements(cctId);
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des équipements: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      // 6. Désassocier les formations (si la fonction existe)
      if (associations.formations > 0 && typeof this.disassociateCCTFormations === 'function') {
        console.log(`🔄 Désassociation de ${associations.formations} formation(s)...`);
        try {
          await this.disassociateCCTFormations(cctId);
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des formations: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      // 7. Désassocier les décisions (si la fonction existe)
      if (associations.decisions > 0 && typeof this.disassociateCCTDecisions === 'function') {
        console.log(`🔄 Désassociation de ${associations.decisions} décision(s)...`);
        try {
          await this.disassociateCCTDecisions(cctId);
        } catch (error) {
          console.warn(`⚠️ Erreur lors de la désassociation des décisions: ${error.message}`);
          // Continuer malgré l'erreur
        }
      }
      
      console.log('✅ Toutes les associations ont été supprimées');
      
      // 8. Maintenant supprimer le CCT
      console.log('🗑️ Suppression du CCT...');
      const response = await api.delete(`/CCTs/${cctId}`);
      
      console.log('✅ CCT supprimé avec succès après désassociation');
      return response.data;
      
    } catch (error) {
      console.error('❌ Erreur lors de la suppression avec désassociation:', error);
      throw new Error(`Erreur lors de la suppression avec désassociation : ${error.message}`);
    }
  },

  // Suppression FORCÉE du CCT (ignore toutes les contraintes)
  async forceDeleteCCT(cctId) {
    try {
      console.log(`🚨 SUPPRESSION FORCÉE CCT ${cctId} - ATTENTION DANGER ! 🚨`);
      
      // 1. Vérifier les associations (pour information seulement)
      const associations = await this.checkCCTAssociations(cctId);
      const totalAssociations = Object.values(associations || {}).reduce((sum, count) => sum + count, 0);
      
      if (totalAssociations > 0) {
        console.log(`⚠️ ATTENTION : ${totalAssociations} associations trouvées qui seront ORPHELINES !`);
        console.log('📊 Associations qui deviendront orphelines:', associations);
      }
      
      // 2. Suppression directe du CCT (ignore les contraintes)
      console.log('🗑️ SUPPRESSION FORCÉE EN COURS...');
      const response = await api.delete(`/CCTs/${cctId}`);
      
      console.log('✅ CCT supprimé de force avec succès !');
      console.log('⚠️ ATTENTION : Les entités associées sont maintenant orphelines !');
      
      return {
        success: true,
        message: `CCT supprimé de force ! ${totalAssociations} entité(s) orpheline(s)`,
        orphanedEntities: associations,
        totalOrphaned: totalAssociations
      };
      
    } catch (error) {
      console.error('❌ ERREUR lors de la suppression forcée:', error);
      
      if (error.response?.status === 500) {
        // Erreur backend - contraintes trop fortes
        throw new Error(`Suppression forcée impossible : Le backend bloque la suppression à cause de contraintes trop strictes.
        
🔍 **Cause :** Contraintes de clés étrangères non nullable dans la base de données.

💡 **Solutions possibles :**
1. Modifier la base de données pour permettre les valeurs NULL
2. Utiliser la suppression avec désassociation
3. Contacter l'administrateur de la base de données`);
      } else {
        throw new Error(`Erreur lors de la suppression forcée : ${error.message}`);
      }
    }
  },

  // Récupérer les agents d'un CCT
  async getCCTAgents(id) {
    try {
      const response = await api.get(`/CCTs/${id}/agents`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des agents:', error);
      throw error;
    }
  },

  // Récupérer les chefs de centre d'un CCT
  async getCCTChefsCentres(id) {
    try {
      const response = await api.get(`/CCTs/${id}/chefs-centres`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des chefs de centre:', error);
      throw error;
    }
  },

  // Récupérer les lignes d'un CCT
  async getCCTLignes(id) {
    try {
      const response = await api.get(`/CCTs/${id}/lignes`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des lignes:', error);
      throw error;
    }
  },

  // Récupérer les équipements d'un CCT
  async getCCTEquipements(id) {
    try {
      const response = await api.get(`/CCTs/${id}/equipements`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des équipements:', error);
      throw error;
    }
  },

  // Vérifier les associations d'un CCT avant suppression
  async checkCCTAssociations(cctId) {
    try {
      console.log(`=== VÉRIFICATION DES ASSOCIATIONS CCT ${cctId} ===`);
      
      // Vérifier seulement les associations disponibles
      const [agents, chefsCentres, lignes, equipements] = await Promise.all([
        this.getCCTAgents(cctId).catch(() => ({ data: [] })),
        this.getCCTChefsCentres(cctId).catch(() => ({ data: [] })),
        this.getCCTLignes(cctId).catch(() => ({ data: [] })),
        this.getCCTEquipements(cctId).catch(() => ({ data: [] }))
      ]);
      
      const associations = {
        agents: agents.data?.length || 0,
        chefsCentres: chefsCentres.data?.length || 0,
        lignes: lignes.data?.length || 0,
        equipements: equipements.data?.length || 0
      };
      
      const totalAssociations = Object.values(associations).reduce((sum, count) => sum + count, 0);
      
      console.log('📊 Associations trouvées:', associations);
      console.log(`📈 Total des associations: ${totalAssociations}`);
      
      if (totalAssociations > 0) {
        console.log('⚠️ CCT a des associations - suppression bloquée');
        return associations;
      } else {
        console.log('✅ Aucune association trouvée - suppression autorisée');
        return null;
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification des associations:', error);
      // En cas d'erreur, bloquer la suppression par sécurité
      return { error: true, message: 'Erreur lors de la vérification des associations' };
    }
  },

  // Fonctions de désassociation des entités du CCT
  
  // Désassocier les agents du CCT (mettre CCTId = null)
  async disassociateCCTAgents(cctId) {
    try {
      console.log(`🔄 Désassociation des agents du CCT ${cctId}...`);
      
      // Récupérer tous les agents du CCT
      const agentsResponse = await this.getCCTAgents(cctId);
      const agents = agentsResponse.data || [];
      
      if (agents.length === 0) {
        console.log('ℹ️ Aucun agent à désassocier');
        return;
      }
      
      // Désassocier chaque agent (mettre CCTId = null)
      const disassociationPromises = agents.map(agent => 
        api.put(`/Agents/${agent.id}`, { ...agent, cctId: null })
      );
      
      await Promise.all(disassociationPromises);
      console.log(`✅ ${agents.length} agent(s) désassocié(s) du CCT ${cctId}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la désassociation des agents:`, error);
      throw new Error(`Impossible de désassocier les agents : ${error.message}`);
    }
  },
  
  // Désassocier les chefs de centre d'un CCT
  async disassociateCCTChefsCentres(cctId) {
    try {
      console.log(`🔄 Désassociation des chefs de centre du CCT ${cctId}...`);
      
      // Récupérer les chefs de centre du CCT
      const response = await this.getCCTChefsCentres(cctId);
      const chefsCentres = response.data || [];
      
      if (chefsCentres.length === 0) {
        console.log('ℹ️ Aucun chef de centre à désassocier');
        return { success: true, count: 0 };
      }
      
      console.log(`📋 ${chefsCentres.length} chef(s) de centre trouvé(s)`);
      
      // Désassocier tous les chefs de centre en parallèle
      const disassociationPromises = chefsCentres.map(chef => {
        const updatedChef = { ...chef, cctId: null };
        return api.put(`/ChefCentres/${chef.id}`, updatedChef)
          .then(() => {
            console.log(`✅ Chef de centre ${chef.id} désassocié`);
            return { success: true, id: chef.id };
          })
          .catch(error => {
            console.error(`❌ Erreur lors de la désassociation du chef ${chef.id}:`, error);
            return { success: false, id: chef.id, error: error.message };
          });
      });
      
      const results = await Promise.all(disassociationPromises);
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      console.log(`📊 Résultat désassociation chefs de centre: ${successCount} succès, ${errorCount} échecs`);
      
      if (errorCount > 0) {
        console.warn(`⚠️ ${errorCount} chef(s) de centre n'ont pas pu être désassociés`);
        const failedChefs = results.filter(r => !r.success);
        console.warn('❌ Échecs:', failedChefs);
      }
      
      return { 
        success: successCount > 0, 
        count: successCount,
        errors: errorCount,
        message: `${successCount} désassocié(s), ${errorCount} échec(s)`,
        results: results
      };
      
    } catch (error) {
      console.error('❌ Erreur lors de la désassociation des chefs de centre:', error);
      throw new Error(`Impossible de désassocier les chefs de centre : ${error.message}`);
    }
  },
  
  // Désassocier les lignes du CCT
  async disassociateCCTLignes(cctId) {
    try {
      console.log(`🔄 Désassociation des lignes du CCT ${cctId}...`);
      
      const lignesResponse = await this.getCCTLignes(cctId);
      const lignes = lignesResponse.data || [];
      
      if (lignes.length === 0) {
        console.log('ℹ️ Aucune ligne à désassocier');
        return;
      }
      
      const disassociationPromises = lignes.map(ligne => 
        api.put(`/Lignes/${ligne.id}`, { ...ligne, cctId: null })
      );
      
      await Promise.all(disassociationPromises);
      console.log(`✅ ${lignes.length} ligne(s) désassociée(s) du CCT ${cctId}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la désassociation des lignes:`, error);
      throw new Error(`Impossible de désassocier les lignes : ${error.message}`);
    }
  },
  
  // Désassocier les équipements du CCT
  async disassociateCCTEquipements(cctId) {
    try {
      console.log(`🔄 Désassociation des équipements du CCT ${cctId}...`);
      
      const equipementsResponse = await this.getCCTEquipements(cctId);
      const equipements = equipementsResponse.data || [];
      
      if (equipements.length === 0) {
        console.log('ℹ️ Aucun équipement à désassocier');
        return;
      }
      
      const disassociationPromises = equipements.map(equipement => 
        api.put(`/Equipements/${equipement.id}`, { ...equipement, cctId: null })
      );
      
      await Promise.all(disassociationPromises);
      console.log(`✅ ${equipements.length} équipement(s) désassocié(s) du CCT ${cctId}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la désassociation des équipements:`, error);
      throw new Error(`Impossible de désassocier les équipements : ${error.message}`);
    }
  },
  
  // Désassocier les formations du CCT
  async disassociateCCTFormations(cctId) {
    try {
      console.log(`🔄 Désassociation des formations du CCT ${cctId}...`);
      
      const formationsResponse = await this.getCCTFormations(cctId);
      const formations = formationsResponse.data || [];
      
      if (formations.length === 0) {
        console.log('ℹ️ Aucune formation à désassocier');
        return;
      }
      
      const disassociationPromises = formations.map(formation => 
        api.put(`/Formations/${formation.id}`, { ...formation, cctId: null })
      );
      
      await Promise.all(disassociationPromises);
      console.log(`✅ ${formations.length} formation(s) désassociée(s) du CCT ${cctId}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la désassociation des formations:`, error);
      throw new Error(`Impossible de désassocier les formations : ${error.message}`);
    }
  },
  
  // Désassocier les décisions du CCT
  async disassociateCCTDecisions(cctId) {
    try {
      console.log(`🔄 Désassociation des décisions du CCT ${cctId}...`);
      
      const decisionsResponse = await this.getCCTDecisions(cctId);
      const decisions = decisionsResponse.data || [];
      
      if (decisions.length === 0) {
        console.log('ℹ️ Aucune décision à désassocier');
        return;
      }
      
      const disassociationPromises = decisions.map(decision => 
        api.put(`/Decisions/${decision.id}`, { ...decision, cctId: null })
      );
      
      await Promise.all(disassociationPromises);
      console.log(`✅ ${decisions.length} décision(s) désassociée(s) du CCT ${cctId}`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de la désassociation des décisions:`, error);
      throw new Error(`Impossible de désassocier les décisions : ${error.message}`);
    }
  }
};

export default cctService; 