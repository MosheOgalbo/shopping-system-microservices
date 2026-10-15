import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import OrderForm from './OrderForm';

describe('OrderForm', () => {
  it('requires name, address, and email before submit', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OrderForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.click(screen.getByRole('button', { name: 'אשר הזמנה' }));

    expect(screen.getByText('שם פרטי הוא שדה חובה')).toBeInTheDocument();
    expect(screen.getByText('שם משפחה הוא שדה חובה')).toBeInTheDocument();
    expect(screen.getByText('כתובת היא שדה חובה')).toBeInTheDocument();
    expect(screen.getByText('מייל הוא שדה חובה')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the required customer fields', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OrderForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/שם פרטי/), 'דנה');
    await user.type(screen.getByLabelText(/שם משפחה/), 'כהן');
    await user.type(screen.getByLabelText(/כתובת משלוח/), 'הרצל 10 תל אביב');
    await user.type(screen.getByLabelText(/כתובת מייל/), 'dana@example.com');
    await user.click(screen.getByRole('button', { name: 'אשר הזמנה' }));

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'דנה',
      lastName: 'כהן',
      address: 'הרצל 10 תל אביב',
      email: 'dana@example.com',
    });
  });

  it('rejects digits in a name, markup in an address, and a malformed email', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OrderForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/שם פרטי/), 'דנה1');
    await user.type(screen.getByLabelText(/שם משפחה/), 'כהן');
    await user.type(screen.getByLabelText(/כתובת משלוח/), '<script>');
    await user.type(screen.getByLabelText(/כתובת מייל/), 'dana@');
    await user.click(screen.getByRole('button', { name: 'אשר הזמנה' }));

    expect(screen.getByText('השם יכול להכיל אותיות, רווח, מקף או גרש בלבד')).toBeInTheDocument();
    expect(screen.getByText('הכתובת יכולה להכיל אותיות, ספרות וסימני כתובת בלבד')).toBeInTheDocument();
    expect(screen.getByText('מייל לא תקין')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed names and a lowercase email', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<OrderForm onSubmit={onSubmit} isSubmitting={false} />);

    await user.type(screen.getByLabelText(/שם פרטי/), '  דנה  ');
    await user.type(screen.getByLabelText(/שם משפחה/), 'כהן');
    await user.type(screen.getByLabelText(/כתובת משלוח/), '  הרצל 10, תל אביב  ');
    await user.type(screen.getByLabelText(/כתובת מייל/), 'Dana@Example.com');
    await user.click(screen.getByRole('button', { name: 'אשר הזמנה' }));

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'דנה',
      lastName: 'כהן',
      address: 'הרצל 10, תל אביב',
      email: 'dana@example.com',
    });
  });
});
