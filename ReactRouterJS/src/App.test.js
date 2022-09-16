
import { render, screen } from '@testing-library/react';
import App from './App';
import AffichageCapteur from './AffichageCapteur';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<AffichageCapteur />);
});



