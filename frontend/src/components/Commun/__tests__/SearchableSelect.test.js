import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchableSelect from '../SearchableSelect';

describe('SearchableSelect Component', () => {
  const mockOptions = [
    { id: 1, libelle: 'Option 1' },
    { id: 2, libelle: 'Option 2' },
    { id: 3, libelle: 'Option 3' }
  ];

  const defaultProps = {
    label: 'Test Select',
    value: '',
    onChange: jest.fn(),
    options: mockOptions
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with label', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  test('renders select input', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('opens dropdown when clicked', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    // Vérifier que les options sont affichées
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('calls onChange when option is selected', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  test('displays selected value', () => {
    render(<SearchableSelect {...defaultProps} value={2} />);
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('handles custom option label function', () => {
    const customOptions = [
      { id: 1, name: 'Custom Option 1' },
      { id: 2, name: 'Custom Option 2' }
    ];
    
    render(
      <SearchableSelect
        {...defaultProps}
        options={customOptions}
        getOptionLabel={(option) => option.name}
      />
    );
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    expect(screen.getByText('Custom Option 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Option 2')).toBeInTheDocument();
  });

  test('handles custom option value function', () => {
    const customOptions = [
      { id: 1, libelle: 'Option 1' },
      { id: 2, libelle: 'Option 2' }
    ];
    
    render(
      <SearchableSelect
        {...defaultProps}
        options={customOptions}
        getOptionValue={(option) => option.id * 10}
      />
    );
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith(10);
  });

  test('handles required prop', () => {
    render(<SearchableSelect {...defaultProps} required={true} />);
    
    const select = screen.getByRole('button');
    expect(select).toBeRequired();
  });

  test('handles disabled prop', () => {
    render(<SearchableSelect {...defaultProps} disabled={true} />);
    
    const select = screen.getByRole('button');
    expect(select).toBeDisabled();
  });

  test('handles fullWidth prop', () => {
    render(<SearchableSelect {...defaultProps} fullWidth={false} />);
    
    const formControl = screen.getByRole('button').closest('.MuiFormControl-root');
    expect(formControl).not.toHaveClass('MuiFormControl-fullWidth');
  });

  test('handles margin prop', () => {
    render(<SearchableSelect {...defaultProps} margin="normal" />);
    
    const formControl = screen.getByRole('button').closest('.MuiFormControl-root');
    expect(formControl).toHaveClass('MuiFormControl-marginNormal');
  });

  test('handles status field with colors', () => {
    const statusOptions = [
      { id: 1, libelle: 'En activité' },
      { id: 2, libelle: 'Suspendu' },
      { id: 3, libelle: 'Fermé' }
    ];
    
    render(
      <SearchableSelect
        {...defaultProps}
        options={statusOptions}
        isStatusField={true}
        value={1}
      />
    );
    
    // Vérifier que la valeur sélectionnée est affichée avec une couleur
    const selectedValue = screen.getByText('En activité');
    expect(selectedValue).toBeInTheDocument();
    
    // Vérifier que l'indicateur de couleur est présent
    const colorIndicator = selectedValue.parentElement.querySelector('div[style*="background-color"]');
    expect(colorIndicator).toBeInTheDocument();
  });

  test('handles empty options array', () => {
    render(<SearchableSelect {...defaultProps} options={[]} />);
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    // Aucune option ne devrait être affichée
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('closes dropdown after selection', () => {
    render(<SearchableSelect {...defaultProps} />);
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    // Vérifier que les options sont affichées
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    // Sélectionner une option
    fireEvent.click(screen.getByText('Option 1'));
    
    // Vérifier que le dropdown est fermé
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  test('handles string options', () => {
    const stringOptions = ['Option A', 'Option B', 'Option C'];
    
    render(
      <SearchableSelect
        {...defaultProps}
        options={stringOptions}
        getOptionLabel={(option) => option}
        getOptionValue={(option) => option}
      />
    );
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  test('handles numeric options', () => {
    const numericOptions = [1, 2, 3];
    
    render(
      <SearchableSelect
        {...defaultProps}
        options={numericOptions}
        getOptionLabel={(option) => `Option ${option}`}
        getOptionValue={(option) => option}
      />
    );
    
    const selectButton = screen.getByRole('button');
    fireEvent.mouseDown(selectButton);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});
