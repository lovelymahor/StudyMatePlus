import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Syllabus from './Syllabus';

jest.mock('framer-motion', () => {
  const React = require('react');

  const stripMotionProps = ({
    animate,
    exit,
    initial,
    layout,
    transition,
    variants,
    viewport,
    whileHover,
    whileInView,
    whileTap,
    ...props
  }) => props;

  return {
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: new Proxy({}, {
      get: (_target, element) => React.forwardRef((props, ref) =>
        React.createElement(element, { ref, ...stripMotionProps(props) })
      ),
    }),
  };
});

test('opens the selected syllabus preview after filters are applied', async () => {
  const openSpy = jest.spyOn(window, 'open').mockImplementation(() => ({}));

  render(<Syllabus />);

  const [universitySelect, departmentSelect, semesterSelect] = screen.getAllByRole('combobox');
  fireEvent.change(universitySelect, { target: { value: 'Delhi University' } });
  fireEvent.change(departmentSelect, { target: { value: 'Computer Science' } });
  fireEvent.change(semesterSelect, { target: { value: '1' } });

  const selectedCard = screen
    .getByText('Computer Science Engineering - Semester 1')
    .closest('.syllabus-card');

  await userEvent.click(within(selectedCard).getByRole('button', { name: /preview/i }));

  expect(openSpy).toHaveBeenCalledWith(
    '/pdf/WebDevelopment.pdf',
    '_blank',
    'noopener,noreferrer'
  );

  openSpy.mockRestore();
});
