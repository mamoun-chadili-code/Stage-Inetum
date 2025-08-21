import api from './api';

// Service pour les dropdowns dynamiques
export const dropdownsService = {
  // Données mockées en fallback si l'API n'existe pas
  MOCK_STATUTS: [
    { id: 1, nom: 'En exploitation', description: 'Ligne en exploitation normale' },
    { id: 2, nom: 'En construction', description: 'Ligne en cours de construction' },
    { id: 3, nom: 'Hors service', description: 'Ligne hors service' },
    { id: 4, nom: 'En maintenance', description: 'Ligne en maintenance' }
  ],
  
  MOCK_VILLES: [
    { id: 1, nom: 'AGADIR' },
    { id: 2, nom: 'AL HAOUZ' },
    { id: 3, nom: 'AZILAL' },
    { id: 4, nom: 'BENI MELLAL' },
    { id: 5, nom: 'BOULEMANE' },
    { id: 6, nom: 'CASABLANCA' },
    { id: 7, nom: 'CHEFCHAOUEN' },
    { id: 8, nom: 'EL HAJEB' },
    { id: 9, nom: 'EL JADIDA' },
    { id: 10, nom: 'ESSAOUIRA' },
    { id: 11, nom: 'FÈS' },
    { id: 12, nom: 'GUELMIM' },
    { id: 13, nom: 'IFRANE' },
    { id: 14, nom: 'INEZGANE' },
    { id: 15, nom: 'KENITRA' },
    { id: 16, nom: 'KHEMISSET' },
    { id: 17, nom: 'KHOURIBGA' },
    { id: 18, nom: 'LARACHE' },
    { id: 19, nom: 'MARRAKECH' },
    { id: 20, nom: 'MEKNÈS' },
    { id: 21, nom: 'MEDIOUNA' },
    { id: 22, nom: 'NADOR' },
    { id: 23, nom: 'OUARZAZATE' },
    { id: 24, nom: 'OUJDA' },
    { id: 25, nom: 'RABAT' },
    { id: 26, nom: 'SAFI' },
    { id: 27, nom: 'SALE' },
    { id: 28, nom: 'TANGER' },
    { id: 29, nom: 'TAROUDANT' },
    { id: 30, nom: 'TATA' },
    { id: 31, nom: 'TÉTOUAN' },
    { id: 32, nom: 'TIZNIT' },
    { id: 33, nom: 'ZAGORA' }
  ],
  
  MOCK_CADRES: [
    { id: 1, libelle: 'Avant 2012' },
    { id: 2, libelle: 'Après 2012' }
  ],

  MOCK_REGIONS: [
    { id: 1, libelle: 'AGADIR IDA-OUTANANE', code: 'AGD' },
    { id: 2, libelle: 'AL HAOUZ', code: 'ALH' },
    { id: 3, libelle: 'AZILAL', code: 'AZL' },
    { id: 4, libelle: 'BENI MELLAL-KHENIFRA', code: 'BMK' },
    { id: 5, libelle: 'BOULEMANE', code: 'BLM' },
    { id: 6, libelle: 'CASABLANCA-SETTAT', code: 'CS' },
    { id: 7, libelle: 'CHEFCHAOUEN', code: 'CHF' },
    { id: 8, libelle: 'EL HAJEB', code: 'ELH' },
    { id: 9, libelle: 'EL JADIDA', code: 'ELJ' },
    { id: 10, libelle: 'ESSAOUIRA', code: 'ESS' },
    { id: 11, libelle: 'FÈS-MEKNÈS', code: 'FES' },
    { id: 12, libelle: 'GUELMIM', code: 'GLM' },
    { id: 13, libelle: 'IFRANE', code: 'IFR' },
    { id: 14, libelle: 'INEZGANE-AIT MELLOUL', code: 'INZ' },
    { id: 15, libelle: 'KENITRA', code: 'KNT' },
    { id: 16, libelle: 'KHEMISSET', code: 'KHM' },
    { id: 17, libelle: 'KHOURIBGA', code: 'KHR' },
    { id: 18, libelle: 'LARACHE', code: 'LAR' },
    { id: 19, libelle: 'MARRAKECH-SAFI', code: 'MRK' },
    { id: 20, libelle: 'MEDIOUNA', code: 'MDN' },
    { id: 21, libelle: 'NADOR', code: 'NDR' },
    { id: 22, libelle: 'OUARZAZATE', code: 'OUZ' },
    { id: 23, libelle: 'OUJDA-ANGAD', code: 'OUJ' },
    { id: 24, libelle: 'RABAT-SALÉ-KÉNITRA', code: 'RSK' },
    { id: 25, libelle: 'SAFI', code: 'SAF' },
    { id: 26, libelle: 'SALE', code: 'SAL' },
    { id: 27, libelle: 'TANGER-TÉTOUAN-AL HOCEIMA', code: 'TNG' },
    { id: 28, libelle: 'TAROUDANT', code: 'TRD' },
    { id: 29, libelle: 'TATA', code: 'TAT' },
    { id: 30, libelle: 'TÉTOUAN', code: 'TET' },
    { id: 31, libelle: 'TIZNIT', code: 'TIZ' },
    { id: 32, libelle: 'ZAGORA', code: 'ZAG' }
  ],

  // MOCK_CATEGORIES supprimées - utilisation exclusive de l'API

  MOCK_STATUTS_RC: [
    { id: 1, libelle: 'En activité', code: 'ACT' },
    { id: 2, libelle: 'Suspendu', code: 'SUS' }
  ],

  // MOCK_STATUTS_CCT supprimées - utilisation exclusive de l'API

  // MOCK_TYPES_CTT supprimées - utilisation exclusive de l'API

  MOCK_PROVINCES: [
    { id: 1, libelle: 'AGADIR', code: 'AGD' },
    { id: 2, libelle: 'AL HAOUZ', code: 'ALH' },
    { id: 3, libelle: 'AZILAL', code: 'AZL' },
    { id: 4, libelle: 'BENI MELLAL', code: 'BML' },
    { id: 5, libelle: 'BOULEMANE', code: 'BLM' },
    { id: 6, libelle: 'CASABLANCA', code: 'CASA' },
    { id: 7, libelle: 'CHEFCHAOUEN', code: 'CHF' },
    { id: 8, libelle: 'EL HAJEB', code: 'ELH' },
    { id: 9, libelle: 'EL JADIDA', code: 'ELJ' },
    { id: 10, libelle: 'ESSAOUIRA', code: 'ESS' },
    { id: 11, libelle: 'FÈS', code: 'FES' },
    { id: 12, libelle: 'GUELMIM', code: 'GLM' },
    { id: 13, libelle: 'IFRANE', code: 'IFR' },
    { id: 14, libelle: 'INEZGANE', code: 'INZ' },
    { id: 15, libelle: 'KENITRA', code: 'KNT' },
    { id: 16, libelle: 'KHEMISSET', code: 'KHM' },
    { id: 17, libelle: 'KHOURIBGA', code: 'KHR' },
    { id: 18, libelle: 'LARACHE', code: 'LAR' },
    { id: 19, libelle: 'MARRAKECH', code: 'MRK' },
    { id: 20, libelle: 'MEKNÈS', code: 'MKN' },
    { id: 21, libelle: 'MEDIOUNA', code: 'MDN' },
    { id: 22, libelle: 'NADOR', code: 'NDR' },
    { id: 23, libelle: 'OUARZAZATE', code: 'OUZ' },
    { id: 24, libelle: 'OUJDA', code: 'OUJ' },
    { id: 25, libelle: 'RABAT', code: 'RAB' },
    { id: 26, libelle: 'SAFI', code: 'SAF' },
    { id: 27, libelle: 'SALE', code: 'SAL' },
    { id: 28, libelle: 'TANGER', code: 'TNG' },
    { id: 29, libelle: 'TAROUDANT', code: 'TRD' },
    { id: 30, libelle: 'TATA', code: 'TAT' },
    { id: 31, libelle: 'TÉTOUAN', code: 'TET' },
    { id: 32, libelle: 'TIZNIT', code: 'TIZ' },
    { id: 33, libelle: 'ZAGORA', code: 'ZAG' }
  ],

  MOCK_STATUTS_LIGNE: [
    { id: 1, libelle: 'En activité', code: 'ACT' },
    { id: 2, libelle: 'Suspendu', code: 'SUS' },
    { id: 3, libelle: 'Fermé', code: 'FER' }
  ],

  MOCK_NIVEAUX_FORMATION: [
    { id: 1, libelle: 'Technicien en mécanique automobile' },
    { id: 2, libelle: 'Licence technique en mécanique' },
    { id: 3, libelle: 'Ingénieur en mécanique automobile' },
    { id: 4, libelle: 'Master en génie mécanique' },
    { id: 5, libelle: 'Doctorat en mécanique' },
    { id: 6, libelle: 'Formation continue - Diagnostic électronique' },
    { id: 7, libelle: 'Formation continue - Systèmes de sécurité' },
    { id: 8, libelle: 'Formation continue - Véhicules hybrides' }
  ],

  MOCK_CCTS: [
    { id: 17, nom: 'A.A VISITES' },
    { id: 19, nom: 'AZZ BASSOU (VISITE TECH)' },
    { id: 20, nom: 'ARBOUW VISITE TECHNIQUE' },
    { id: 21, nom: 'ADITARA SERVICES' },
    { id: 22, nom: 'B.B CONTROLE' }
  ],

  MOCK_STATUTS_ADMINISTRATIFS: [
    { id: 1, libelle: 'CAP VALIDE', description: 'Certificat d\'Aptitude Professionnelle obtenu' },
    { id: 2, libelle: 'CAP EN COURS', description: 'Formation en cours, évaluation finale non encore passée' },
    { id: 3, libelle: 'CAP EN ATTENTE', description: 'Attente des résultats officiels ou validation administrative' },
    { id: 4, libelle: 'CAP NON VALIDE', description: 'Échec à l\'examen ou validation refusée' },
    { id: 5, libelle: 'CAP EXPIRÉ', description: 'Certificat arrivé à échéance (si une reconduction est nécessaire)' },
    { id: 6, libelle: 'CAP RENOUVELÉ', description: 'Certificat reconduit après formation ou mise à niveau' },
    { id: 7, libelle: 'CAP SUSPENDU', description: 'Statut temporaire en cas de problème administratif ou disciplinaire' },
    { id: 8, libelle: 'CAP ANNULÉ', description: 'Certificat invalidé pour raison réglementaire' }
  ],

  MOCK_CHEFS_CENTRE: [
    { id: 1, nom: 'ALAMI', prenom: 'MOHAMED' },
    { id: 2, nom: 'BENNANI', prenom: 'FATIMA' },
    { id: 3, nom: 'DAOUDI', prenom: 'KHADIJA' },
    { id: 4, nom: 'CHAIBI', prenom: 'AHMED' },
    { id: 5, nom: 'RESOUANY', prenom: 'MUSTAPHA' }
  ],

  MOCK_AGENTS: [
    { 
      id: 1, 
      nom: 'AADNAN', 
      prenom: 'MY SMAIL',
      cct: 'A.A VISITE',
      statutAdministratif: 'CAP VALIDE',
      numeroCAP: 'CAP001',
      dateCAP: '2023-01-15',
      anneeAutorisation: '2023',
      dateAffectationCCT: '2023-01-20'
    },
    { 
      id: 2, 
      nom: 'AADNANE', 
      prenom: 'NACIRI',
      cct: 'SOBVITA CENTRE',
      statutAdministratif: 'CAP EN COURS',
      numeroCAP: 'CAP002',
      dateCAP: '2023-02-10',
      anneeAutorisation: '2023',
      dateAffectationCCT: '2023-02-15'
    },
    { 
      id: 3, 
      nom: 'AALAE', 
      prenom: 'KASMI',
      cct: 'A.A VISITE',
      statutAdministratif: 'CAP EN ATTENTE',
      numeroCAP: 'CAP003',
      dateCAP: '2023-03-05',
      anneeAutorisation: '2023',
      dateAffectationCCT: '2023-03-10'
    },
    { 
      id: 4, 
      nom: 'AAMOUMOUR', 
      prenom: 'OTMANE',
      cct: 'SOBVITA CENTRE',
      statutAdministratif: 'CAP RENOUVELÉ',
      numeroCAP: 'CAP004',
      dateCAP: '2022-12-20',
      anneeAutorisation: '2022',
      dateAffectationCCT: '2022-12-25'
    },
    { 
      id: 5, 
      nom: 'AARAB', 
      prenom: 'MOHAMED',
      cct: 'A.A VISITE',
      statutAdministratif: 'CAP EXPIRÉ',
      numeroCAP: 'CAP005',
      dateCAP: '2020-06-15',
      anneeAutorisation: '2020',
      dateAffectationCCT: '2020-06-20'
    },
    { 
      id: 6, 
      nom: 'BENNANI', 
      prenom: 'FATIMA',
      cct: 'SOBVITA CENTRE',
      statutAdministratif: 'CAP SUSPENDU',
      numeroCAP: 'CAP006',
      dateCAP: '2022-08-10',
      anneeAutorisation: '2022',
      dateAffectationCCT: '2022-08-15'
    },
    { 
      id: 7, 
      nom: 'CHAIBI', 
      prenom: 'AHMED',
      cct: 'A.A VISITE',
      statutAdministratif: 'CAP NON VALIDE',
      numeroCAP: 'CAP007',
      dateCAP: '2023-04-01',
      anneeAutorisation: '2023',
      dateAffectationCCT: '2023-04-05'
    },
    { 
      id: 8, 
      nom: 'DAOUDI', 
      prenom: 'KHADIJA',
      cct: 'SOBVITA CENTRE',
      statutAdministratif: 'CAP ANNULÉ',
      numeroCAP: 'CAP008',
      dateCAP: '2022-11-15',
      anneeAutorisation: '2022',
      dateAffectationCCT: '2022-11-20'
    }
  ],

  MOCK_TYPES_FORMATION: [
    { id: 1, libelle: 'Formation de maintien de qualification des agents visiteurs par année calendaire' },
    { id: 2, libelle: 'Formation initiale des agents visiteurs' },
    { id: 3, libelle: 'Formation continue - Diagnostic électronique' },
    { id: 4, libelle: 'Formation continue - Systèmes de sécurité' },
    { id: 5, libelle: 'Formation continue - Véhicules hybrides' },
    { id: 6, libelle: 'Formation continue - Normes environnementales' },
    { id: 7, libelle: 'Formation continue - Technologies avancées' },
    { id: 8, libelle: 'Formation continue - Sécurité routière' }
  ],

  // Récupérer les statuts
  async getStatuts() {
    try {
      const response = await api.get('/Statuts');
      return response.data;
    } catch (error) {
      console.warn('API Statuts non disponible, utilisation des données mockées');
      return this.MOCK_STATUTS;
    }
  },

  // Récupérer les villes
  async getVilles() {
    try {
      console.log('Tentative de récupération des villes depuis l\'API...');
      const response = await api.get('/Villes');
      console.log('Villes récupérées depuis l\'API:', response.data);
      // Trier les villes par ordre alphabétique
      const sortedVilles = response.data.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      return sortedVilles;
    } catch (error) {
      console.warn('API Villes non disponible, utilisation des données mockées');
      console.log('Utilisation des villes mockées:', this.MOCK_VILLES);
      return this.MOCK_VILLES;
    }
  },

  // Récupérer les cadres d'autorisation
  async getCadresAutorisation() {
    try {
      const response = await api.get('/CadresAutorisation');
      return response.data;
    } catch (error) {
      console.warn('API CadresAutorisation non disponible, utilisation des données mockées');
      return this.MOCK_CADRES;
    }
  },

  // Récupérer les régions
  async getRegions() {
    try {
      console.log('Tentative de récupération des régions depuis l\'API...');
      const response = await api.get('/Regions');
      console.log('Régions récupérées depuis l\'API:', response.data);
      // Trier les régions par ordre alphabétique
      const sortedRegions = response.data.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      return sortedRegions;
    } catch (error) {
      console.warn('API Regions non disponible, utilisation des données mockées');
      console.log('Utilisation des régions mockées:', this.MOCK_REGIONS);
      return this.MOCK_REGIONS;
    }
  },

  // Récupérer les réseaux
  async getReseaux() {
    try {
      console.log('Tentative de récupération des réseaux depuis l\'API...');
      const response = await api.get('/Reseaux');
      console.log('Réseaux récupérés depuis l\'API:', response.data);
      // Trier les réseaux par ordre alphabétique
      const sortedReseaux = response.data.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      return sortedReseaux;
    } catch (error) {
      console.warn('API Reseaux non disponible, utilisation des données mockées');
      console.log('Utilisation des réseaux mockés: []');
      return [];
    }
  },

  // Récupérer les catégories CCT
  async getCategoriesCCT() {
    try {
      const response = await api.get('/CategorieCCTs');
      console.log('✅ Catégories CCT récupérées depuis l\'API:', response.data);
      // Trier les catégories par ordre alphabétique
      const sortedCategories = response.data.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      return sortedCategories;
    } catch (error) {
      console.error('❌ ERREUR: API CategorieCCTs non disponible. Aucune donnée mockée configurée.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table CategorieCCTs contient des données.');
      throw new Error('API CategorieCCTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les statuts des réseaux
  async getStatutsRC() {
    try {
      const response = await api.get('/Statuts'); // Changé de /StatutRCs à /Statuts
      return response.data;
    } catch (error) {
      console.warn('API Statuts non disponible, utilisation des données mockées');
      return this.MOCK_STATUTS_RC;
    }
  },

  // Récupérer les types CTT
  async getTypesCTT() {
    try {
      const response = await api.get('/TypeCTTs');
      console.log('✅ Types CTT récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API TypeCTTs non disponible. Aucune donnée mockée configurée.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table TypeCTTs contient des données.');
      throw new Error('API TypeCTTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les statuts CCT
  async getStatutsCCT() {
    try {
      const response = await api.get('/StatutCCTs');
      console.log('✅ Statuts CCT récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API StatutCCTs non disponible. Aucune donnée mockée configurée.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table StatutCCTs contient des données.');
      console.error('Si la table n\'existe pas, exécutez d\'abord le script SQL de création.');
      throw new Error('API StatutCCTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les provinces
  async getProvinces() {
    try {
      const response = await api.get('/Provinces');
      
      // Déduplication des provinces pour éviter les doublons
      const uniqueProvinces = response.data.reduce((acc, current) => {
        const x = acc.find(item => 
          item.libelle?.toLowerCase() === current.libelle?.toLowerCase() ||
          item.code?.toLowerCase() === current.code?.toLowerCase()
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      
      // Trier les provinces par ordre alphabétique
      const sortedProvinces = uniqueProvinces.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      
      console.log(`Provinces récupérées: ${response.data.length}, après déduplication: ${sortedProvinces.length}`);
      
      return sortedProvinces;
    } catch (error) {
      console.warn('API Provinces non disponible, utilisation des données mockées');
      return this.MOCK_PROVINCES;
    }
  },

  // Récupérer les statuts de ligne
  async getStatutsLigne() {
    try {
      const response = await api.get('/Statuts'); // Changé de /StatutLignes à /Statuts
      return response.data;
    } catch (error) {
      console.warn('API Statuts non disponible, utilisation des données mockées:', error.message);
      return this.MOCK_STATUTS_LIGNE;
    }
  },

  // Récupérer les niveaux de formation
  async getNiveauxFormation() {
    try {
      console.log('Tentative de récupération des niveaux de formation depuis l\'API...');
      const response = await api.get('/NiveauxFormation');
      console.log('Niveaux de formation récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.warn('API NiveauxFormation non disponible, utilisation des données mockées:', error.message);
      console.log('Utilisation des niveaux de formation mockés:', this.MOCK_NIVEAUX_FORMATION);
      return this.MOCK_NIVEAUX_FORMATION;
    }
  },

  // Récupérer les statuts administratifs
  async getStatutsAdministratifs() {
    // Temporairement forcer l'utilisation des nouveaux statuts CAP jusqu'à ce que l'API soit mise à jour
    console.log('Utilisation des nouveaux statuts CAP:', this.MOCK_STATUTS_ADMINISTRATIFS);
    return this.MOCK_STATUTS_ADMINISTRATIFS;
  },

  // Récupérer les catégories (pour compatibilité)
  async getCategories() {
    return this.getCategoriesLignes();
  },

  // Récupérer les catégories de lignes
  async getCategoriesLignes() {
    try {
      const response = await api.get('/Categories');
      console.log('✅ Catégories de lignes récupérées depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.warn('API Categories non disponible, utilisation des données mockées:', error.message);
      console.log('Utilisation des catégories mockées:', this.MOCK_CATEGORIES);
      return this.MOCK_CATEGORIES;
    }
  },

  // Récupérer les CCTs
  async getCCTs() {
    try {
      console.log('Tentative de récupération des CCTs depuis l\'API...');
      const response = await api.get('/CCTs');
      console.log('CCTs récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      const result = response.data.data || response.data;
      console.log('CCTs traités:', result);
      return result;
    } catch (error) {
      console.warn('API CCTs non disponible, utilisation des données mockées:', error.message);
      console.log('Utilisation des CCTs mockés:', this.MOCK_CCTS);
      return this.MOCK_CCTS;
    }
  },

  // Récupérer les chefs de centre
  async getChefsCentre() {
    try {
      console.log('Tentative de récupération des chefs de centre depuis l\'API...');
      const response = await api.get('/ChefsCentre');
      console.log('Chefs de centre récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      return response.data.data || response.data;
    } catch (error) {
      console.warn('API ChefsCentre non disponible, utilisation des données mockées:', error.message);
      console.log('Utilisation des chefs de centre mockés:', this.MOCK_CHEFS_CENTRE);
      return this.MOCK_CHEFS_CENTRE;
    }
  },

  // Récupérer les agents
  async getAgents() {
    try {
      console.log('Tentative de récupération des agents depuis l\'API...');
      const response = await api.get('/Agents');
      console.log('Agents récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      return response.data.data || response.data;
    } catch (error) {
      console.warn('API Agents non disponible, utilisation des données mockées:', error.message);
      console.log('Utilisation des agents mockés:', this.MOCK_AGENTS);
      return this.MOCK_AGENTS;
    }
  },

  // Récupérer les types de formation
  async getTypesFormation() {
    try {
      const response = await api.get('/Formations/types');
      return response.data;
    } catch (error) {
      console.warn('API TypesFormation non disponible, utilisation des données mockées');
      return this.MOCK_TYPES_FORMATION;
    }
  },

  // Récupérer les catégories CAP
  async getCategoriesCAP() {
    try {
      console.log('Tentative de récupération des catégories CAP depuis l\'API...');
      const response = await api.get('/CategorieCAPs');
      console.log('Catégories CAP récupérées depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.warn('API CategorieCAPs non disponible, utilisation des données mockées');
      console.log('Utilisation des catégories CAP mockées:', this.MOCK_CATEGORIES);
      return this.MOCK_CATEGORIES;
    }
  },

         // Fonction pour charger les vraies catégories depuis la base de données
       async loadCategoriesFromDB() {
         try {
           const response = await api.get('/CategorieLignes');
           console.log('🚨 Catégories chargées depuis la DB:', response.data);
           return response.data;
         } catch (error) {
           console.error('🚨 Erreur lors du chargement des catégories depuis la DB:', error);
           console.log('🚨 Utilisation des données mock en fallback');
           return this.MOCK_CATEGORIES;
         }
       },

         // Fonction pour charger les vraies catégories depuis la base de données
       async loadStatutsFromDB() {
         try {
           const response = await api.get('/StatutLignes');
           console.log('🚨 Statuts chargés depuis la DB:', response.data);
           return response.data;
         } catch (error) {
           console.error('🚨 Erreur lors du chargement des statuts depuis la DB:', error);
           console.log('🚨 Utilisation des données mock en fallback');
           return this.MOCK_STATUTS;
         }
       },

  // Récupérer les décisions
  async getDecisions() {
    try {
      const response = await api.get('/Decisions');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des décisions:', error);
      // Retourner des données mockées en cas d'erreur
      return [
        { id: 1, nom: 'Approbation', description: 'Décision d\'approbation' },
        { id: 2, nom: 'Rejet', description: 'Décision de rejet' },
        { id: 3, nom: 'Suspension', description: 'Décision de suspension' },
        { id: 4, nom: 'En attente', description: 'Décision en attente' }
      ];
    }
  },

  // Récupérer toutes les données des dropdowns en une fois
  async getAllDropdowns() {
    const [regions, provinces, villes, reseaux, categories, statuts, types, cadresAutorisation, statutsAdministratifs, ccts] = await Promise.all([
      this.getRegions(),
      this.getProvinces(),
      this.getVilles(),
      this.getReseaux(),
      this.getCategoriesCCT(),
      this.getStatuts(), // Changé de getStatutsRC() à getStatuts()
      this.getTypesCTT(),
      this.getCadresAutorisation(),
      this.getStatutsAdministratifs(),
      this.getCCTs()
    ]);

    return { regions, provinces, villes, reseaux, categories, statuts, types, cadresAutorisation, statutsAdministratifs, ccts };
  }
};

export default dropdownsService; 