import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the StudyMatePlus navbar logo', () => {
  render(<App />);
         const logo = screen.getByAltText(/studymateplus logo/i);
         expect(logo).toBeInTheDocument();
});
