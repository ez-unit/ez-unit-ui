import { toaster } from '@/components/ui/toaster';

export const handleContractError = (error: Error) => {
  const message = error.message.toLowerCase();

  switch (true) {
    case message.includes('rejected'): // User rejected
      return;

    case message.includes('insufficient balance'):
      return handleError(error, 'Insufficient balance');

    case message.includes('insufficient allowance'):
      return handleError(error, 'Insufficient allowance');

    case message.includes('transfer amount exceeds allowance'):
      return handleError(error, 'Transfer amount exceeds allowance');

    case message.includes('poollimitexceeded'):
      return handleError(error, 'Pool limit exceeded');

    case message.includes('invalidoriginationpool'): // Mortgage Creation wrong OPool
      return handleError(error, 'Invalid origination pool');

    case message.includes('0xfb8f41b2'): // Insufficient allowance
      return handleError(error, 'Insufficient allowance');

    case message.includes('0xbdb8eb5d'): // Oracle Price outdated
      return handleError(error, 'Oracle Price outdated');

    case message.includes('0xe450d38c'): // Insufficient allowance
      return handleError(error, 'Insufficient Balance');

    case message.includes('cannotoverpay'): // Cannot overpay mortgage
      return handleError(error, 'Cannot overpay mortgage');

    default:
      return handleError(error, 'Transaction failed');
  }
};

const handleError = (error: Error, message: string) => {
  console.error(error);
  toaster.create({
    title: 'Error',
    description: message,
    type: 'error',
  });
  return message;
};
