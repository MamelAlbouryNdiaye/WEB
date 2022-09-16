import { render, screen } from '@testing-library/react';
import Saisie from '../Saisie';

describe("test Saisie",()=>{
  test('Url dans screen', () => {
    render(<Saisie />);
    const urlElement = screen.getByText(/URL/i);
    expect(urlElement).toBeInTheDocument();
  });
  
  test('render Saisie node', () => {
    render(<Saisie />);
    const textbox=screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();  
  });
});
