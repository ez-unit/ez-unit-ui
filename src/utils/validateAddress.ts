import { TNetwork } from '@/constants/Assets';
import { validate } from 'multicoin-address-validator';

export const validateAddress = (address: string, network: TNetwork) => {
  switch (network) {
    case 'solana':
    case 'spl':
      return validate(address, 'SOL');
    case 'ethereum':
      return validate(address, 'ETH');
    case 'bitcoin':
      return validate(address, 'BTC');
  }
};
