import { createHyperUnitSDK } from '@/lib/unit-sdk';

export const unitSdkClient = createHyperUnitSDK({
  environment: 'mainnet',
  timeout: 30000,
});
