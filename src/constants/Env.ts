import assert from 'assert';
assert(
  process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  'Missing WalletConnet project ID'
);

export const ENV_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
