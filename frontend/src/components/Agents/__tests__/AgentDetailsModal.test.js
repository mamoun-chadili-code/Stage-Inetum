import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgentDetailsModal from '../AgentDetailsModal';

describe('AgentDetailsModal Component', () => {
  const mockAgent = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    cin: 'AB123456'
  };

  const mockDetails = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    cin: 'AB123456',
    tel: '0612345678',
    mail: 'jean.dupont@example.com',
    cnss: 'CN123456',
    cct: 'CCT Test',
    numeroCAP: 'CAP001',
    dateCAP: '2023-01-01',
    dateExpirationCAP: '2024-01-01',
    categorieCAP: 'Véhicules toute catégorie',
    statutAdministratif: 'En activité',
    anneeAutorisation: 2023,
    dateAffectationCCT: '2023-01-01',
    numDecisionRenouv: 'DEC001',
    dateDecisionRenouv: '2023-01-01',
    adresse: '123 Rue Test',
    historique: [
      {
        cct: 'CCT Ancien',
        dateDebutAffectation: '2022-01-01',
        dateFinAffectation: '2022-12-31',
        dateMiseAJour: '2022-01-01'
      }
    ]
  };

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    agent: mockAgent,
    details: mockDetails,
    onEdit: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with title', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Détails de l\'Agent')).toBeInTheDocument();
  });

  test('displays agent name in header', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
  });

  test('displays action buttons', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Saisir')).toBeInTheDocument();
    expect(screen.getByText('Fermer')).toBeInTheDocument();
  });

  test('displays tab buttons', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    expect(screen.getByText('Informations')).toBeInTheDocument();
    expect(screen.getByText('Historique')).toBeInTheDocument();
  });

  test('displays personal information in first tab', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    // Vérifier que l'onglet Informations est actif par défaut
    expect(screen.getByText('Informations personnelles')).toBeInTheDocument();
    expect(screen.getByText('Informations professionnelles')).toBeInTheDocument();
    
    // Vérifier les informations personnelles
    expect(screen.getByText('Nom agent')).toBeInTheDocument();
    expect(screen.getByText('Dupont')).toBeInTheDocument();
    expect(screen.getByText('Prénom agent')).toBeInTheDocument();
    expect(screen.getByText('Jean')).toBeInTheDocument();
    expect(screen.getByText('CIN')).toBeInTheDocument();
    expect(screen.getByText('AB123456')).toBeInTheDocument();
    expect(screen.getByText('CNSS')).toBeInTheDocument();
    expect(screen.getByText('CN123456')).toBeInTheDocument();
    expect(screen.getByText('Tel')).toBeInTheDocument();
    expect(screen.getByText('0612345678')).toBeInTheDocument();
    expect(screen.getByText('Mail')).toBeInTheDocument();
    expect(screen.getByText('jean.dupont@example.com')).toBeInTheDocument();
    expect(screen.getByText('Adresse')).toBeInTheDocument();
    expect(screen.getByText('123 Rue Test')).toBeInTheDocument();
  });

  test('displays professional information in first tab', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    // Vérifier les informations professionnelles
    expect(screen.getByText('CCT')).toBeInTheDocument();
    expect(screen.getByText('CCT Test')).toBeInTheDocument();
    expect(screen.getByText('Date affectation')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByText('Statut Administratif')).toBeInTheDocument();
    expect(screen.getByText('En activité')).toBeInTheDocument();
    expect(screen.getByText('Année Autorisation')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('CAP')).toBeInTheDocument();
    expect(screen.getByText('CAP001')).toBeInTheDocument();
    expect(screen.getByText('Date CAP')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
    expect(screen.getByText('Date Expiration CAP')).toBeInTheDocument();
    expect(screen.getByText('01/01/2024')).toBeInTheDocument();
    expect(screen.getByText('Catégorie')).toBeInTheDocument();
    expect(screen.getByText('Véhicules toute catégorie')).toBeInTheDocument();
    expect(screen.getByText('N° renouvellement CAP')).toBeInTheDocument();
    expect(screen.getByText('DEC001')).toBeInTheDocument();
    expect(screen.getByText('Date renouvellement CAP')).toBeInTheDocument();
    expect(screen.getByText('01/01/2023')).toBeInTheDocument();
  });

  test('switches to history tab when clicked', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    const historyTab = screen.getByText('Historique');
    fireEvent.click(historyTab);
    
    expect(screen.getByText('Historique Agent [Jean Dupont]')).toBeInTheDocument();
  });

  test('displays history data when history tab is active', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    // Cliquer sur l'onglet Historique
    const historyTab = screen.getByText('Historique');
    fireEvent.click(historyTab);
    
    // Vérifier les en-têtes du tableau
    expect(screen.getByText('CCT')).toBeInTheDocument();
    expect(screen.getByText('Date Début Affectation')).toBeInTheDocument();
    expect(screen.getByText('Date Fin Affectation')).toBeInTheDocument();
    expect(screen.getByText('Date Mise à Jour')).toBeInTheDocument();
    
    // Vérifier les données de l'historique
    expect(screen.getByText('CCT Ancien')).toBeInTheDocument();
    expect(screen.getByText('01/01/2022')).toBeInTheDocument(); // dateDebutAffectation
    expect(screen.getByText('31/12/2022')).toBeInTheDocument(); // dateFinAffectation
    expect(screen.getByText('01/01/2022')).toBeInTheDocument(); // dateMiseAJour
  });

  test('displays no history message when no history data', () => {
    const detailsWithoutHistory = { ...mockDetails, historique: [] };
    
    render(<AgentDetailsModal {...defaultProps} details={detailsWithoutHistory} />);
    
    // Cliquer sur l'onglet Historique
    const historyTab = screen.getByText('Historique');
    fireEvent.click(historyTab);
    
    expect(screen.getByText('Aucun historique disponible pour cet agent.')).toBeInTheDocument();
  });

  test('handles edit button click', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    const editButton = screen.getByText('Saisir');
    fireEvent.click(editButton);
    
    expect(defaultProps.onEdit).toHaveBeenCalled();
  });

  test('handles close button click', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    const closeButton = screen.getByText('Fermer');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('formats dates correctly', () => {
    render(<AgentDetailsModal {...defaultProps} />);
    
    // Vérifier que les dates sont formatées en français
    expect(screen.getByText('01/01/2023')).toBeInTheDocument(); // dateCAP
    expect(screen.getByText('01/01/2024')).toBeInTheDocument(); // dateExpirationCAP
    expect(screen.getByText('01/01/2023')).toBeInTheDocument(); // dateAffectationCCT
    expect(screen.getByText('01/01/2023')).toBeInTheDocument(); // dateDecisionRenouv
  });

  test('handles missing data gracefully', () => {
    const detailsWithMissingData = {
      ...mockDetails,
      cnss: null,
      mail: null,
      adresse: null,
      categorieCAP: null,
      numDecisionRenouv: null,
      dateDecisionRenouv: null
    };
    
    render(<AgentDetailsModal {...defaultProps} details={detailsWithMissingData} />);
    
    // Vérifier que les valeurs manquantes affichent '-'
    expect(screen.getAllByText('-')).toHaveLength(4);
  });

  test('does not render when details are not provided', () => {
    render(<AgentDetailsModal {...defaultProps} details={null} />);
    
    // Le composant ne devrait rien afficher
    expect(screen.queryByText('Détails de l\'Agent')).not.toBeInTheDocument();
  });
});
