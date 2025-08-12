import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgentFormModal from '../AgentFormModal';

describe('AgentFormModal Component', () => {
  const mockDropdowns = {
    ccts: [
      { id: 1, nom: 'CCT Test 1' },
      { id: 2, nom: 'CCT Test 2' }
    ],
    statutsAdministratifs: [
      { id: 1, libelle: 'En activité' },
      { id: 2, libelle: 'Suspendu' }
    ]
  };

  const mockInitialValues = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    cin: 'AB123456',
    tel: '0612345678',
    mail: 'jean.dupont@example.com',
    cnss: 'CN123456',
    cctId: 1,
    numeroCAP: 'CAP001',
    dateCAP: '2023-01-01',
    dateExpirationCAP: '2024-01-01',
    categorieCAPId: 1,
    statutAdministratifId: 1,
    anneeAutorisation: 2023,
    dateAffectationCCT: '2023-01-01',
    numDecisionRenouv: 'DEC001',
    dateDecisionRenouv: '2023-01-01',
    adresse: '123 Rue Test'
  };

  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    dropdowns: mockDropdowns
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with title for new agent', () => {
    render(<AgentFormModal {...defaultProps} />);
    
    expect(screen.getByText('Ajouter Agent')).toBeInTheDocument();
  });

  test('renders modal with title for editing agent', () => {
    render(<AgentFormModal {...defaultProps} initialValues={mockInitialValues} />);
    
    expect(screen.getByText('Modifier Agent')).toBeInTheDocument();
  });

  test('displays all form fields', () => {
    render(<AgentFormModal {...defaultProps} />);
    
    // Informations personnelles
    expect(screen.getByLabelText('Nom *')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom *')).toBeInTheDocument();
    expect(screen.getByLabelText('CIN *')).toBeInTheDocument();
    expect(screen.getByLabelText('Téléphone')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('CNSS')).toBeInTheDocument();
    
    // Affectation et CAP
    expect(screen.getByLabelText('CCT *')).toBeInTheDocument();
    expect(screen.getByLabelText('Numéro CAP')).toBeInTheDocument();
    expect(screen.getByLabelText('Date CAP')).toBeInTheDocument();
    expect(screen.getByLabelText('Date Expiration CAP')).toBeInTheDocument();
    expect(screen.getByLabelText('Numéro décision renouvellement')).toBeInTheDocument();
    expect(screen.getByLabelText('Date décision renouvellement')).toBeInTheDocument();
    
    // Statut et autorisation
    expect(screen.getByLabelText('Statut administratif *')).toBeInTheDocument();
    expect(screen.getByLabelText('Année autorisation')).toBeInTheDocument();
    expect(screen.getByLabelText('Date affectation CCT')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse')).toBeInTheDocument();
  });

  test('populates form with initial values when editing', () => {
    render(<AgentFormModal {...defaultProps} initialValues={mockInitialValues} />);
    
    expect(screen.getByDisplayValue('Dupont')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Jean')).toBeInTheDocument();
    expect(screen.getByDisplayValue('AB123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0612345678')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jean.dupont@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CN123456')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CAP001')).toBeInTheDocument();
    expect(screen.getByDisplayValue('DEC001')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Rue Test')).toBeInTheDocument();
  });

  test('handles form field changes', async () => {
    render(<AgentFormModal {...defaultProps} />);
    
    const nomField = screen.getByLabelText('Nom *');
    fireEvent.change(nomField, { target: { value: 'Nouveau Nom' } });
    
    expect(nomField.value).toBe('Nouveau Nom');
  });

  test('handles form submission', async () => {
    render(<AgentFormModal {...defaultProps} />);
    
    // Remplir les champs requis
    fireEvent.change(screen.getByLabelText('Nom *'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Prénom *'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('CIN *'), { target: { value: 'TEST123' } });
    fireEvent.change(screen.getByLabelText('Téléphone'), { target: { value: '0612345678' } });
    fireEvent.change(screen.getByLabelText('Numéro CAP'), { target: { value: 'CAP001' } });
    fireEvent.change(screen.getByLabelText('Année autorisation'), { target: { value: '2023' } });
    
    // Sélectionner le statut administratif
    const statutField = screen.getByLabelText('Statut administratif *');
    fireEvent.mouseDown(statutField);
    await waitFor(() => {
      fireEvent.click(screen.getByText('En activité'));
    });
    
    // Sélectionner le CCT
    const cctField = screen.getByLabelText('CCT *');
    fireEvent.mouseDown(cctField);
    await waitFor(() => {
      fireEvent.click(screen.getByText('CCT Test 1'));
    });
    
    // Soumettre le formulaire
    const submitButton = screen.getByText('Enregistrer');
    fireEvent.click(submitButton);
    
    expect(defaultProps.onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      nom: 'Test',
      prenom: 'Test',
      cin: 'TEST123',
      tel: '0612345678',
      numeroCAP: 'CAP001',
      statutAdministratifId: 1,
      cctId: 1,
      anneeAutorisation: '2023'
    }));
  });

  test('handles close button click', () => {
    render(<AgentFormModal {...defaultProps} />);
    
    const closeButton = screen.getByText('Annuler');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('handles close icon click', () => {
    render(<AgentFormModal {...defaultProps} />);
    
    const closeIcon = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeIcon);
    
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('shows loading state when dropdowns are not loaded', () => {
    render(<AgentFormModal {...defaultProps} dropdowns={{}} />);
    
    expect(screen.getByText('Chargement des données...')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<AgentFormModal {...defaultProps} />);
    
    // Essayer de soumettre sans remplir les champs requis
    const submitButton = screen.getByText('Enregistrer');
    fireEvent.click(submitButton);
    
    // Le formulaire ne devrait pas être soumis
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });
});
