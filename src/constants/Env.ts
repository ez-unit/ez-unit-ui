import assert from 'assert';
assert(
  process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  'Missing WalletConnet project ID'
);
assert(process.env.NEXT_PUBLIC_PRIVY_APP_ID, 'Missing Privy app ID');

export const ENV_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
export const ENV_PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
