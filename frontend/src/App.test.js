import { render, screen } from '@testing-library/react';
import App from './App';

test('renders transaction form', () => {
  render(<App />);
  const heading = screen.getByText(/new transaction/i);
  expect(heading).toBeInTheDocument();
});
