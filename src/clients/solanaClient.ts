import { ENV_SOLANA_RPC_URL } from '@/constants/Env';
import { Connection, PublicKey } from '@solana/web3.js';

// Create a Solana connection to mainnet
export const solanaClient = new Connection(ENV_SOLANA_RPC_URL, 'confirmed');

// Helper function to get SOL balance
export const getSolanaBalance = async (address: string): Promise<bigint> => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await solanaClient.getBalance(publicKey);
    return BigInt(balance);
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
    return BigInt(0);
  }
};
