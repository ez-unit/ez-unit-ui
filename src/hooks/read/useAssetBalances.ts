import { infoClient } from '@/clients/hlClient';
import { getSolanaBalance } from '@/clients/solanaClient';
import { viemEthClient, viemHyperEvmClient } from '@/clients/viemClients';
import { wagmiConfig } from '@/config/wagmiConfig';
import {
  ASSETS,
  DEFAULT_ASSET_BALANCE,
  DEFAULT_ASSET_BALANCES,
  EAsset,
  formatAssetBalance,
  IAssetBalances,
} from '@/constants/Assets';
import { SpotBalance } from '@nktkas/hyperliquid';
import { ConnectedSolanaWallet, useSolanaWallets } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import { Address, erc20Abi, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { getBalance } from 'wagmi/actions';

export const useHyperEvmBalances = () => {
  const { address } = useAccount();
  const { data, refetch } = useQuery({
    queryKey: ['hyper-evm-balances', address],
    queryFn: () => getHyperEvmBalances(address),
    enabled: !!address,
    initialData: DEFAULT_ASSET_BALANCES,
    refetchInterval: 5000,
  });
  return { data, refetch };
};

const getHyperEvmBalances = async (address: Address | undefined) => {
  if (!address) return DEFAULT_ASSET_BALANCES;
  try {
    // Native HYPE
    const hypeBalanceRaw = await getBalance(wagmiConfig, { address });

    // wHYPE
    const wHypeBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.wHYPE].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    // uBTC
    const uBtcBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.BTC].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    // uETH
    const uEthBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.ETH].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    // uSOL
    const uSolBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.SOL].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    // uFART
    const uFartBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.FART].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    // uPUMP
    const uPumpBalanceRaw = await viemHyperEvmClient.readContract({
      abi: erc20Abi,
      address: ASSETS[EAsset.PUMP].hyperEvmAddress!,
      functionName: 'balanceOf',
      args: [address],
    });

    const value = {
      [EAsset.wHYPE]: formatAssetBalance(
        wHypeBalanceRaw,
        ASSETS[EAsset.wHYPE].decimals,
        5
      ),
      [EAsset.HYPE]: formatAssetBalance(
        hypeBalanceRaw.value,
        ASSETS[EAsset.HYPE].decimals,
        5
      ),
      [EAsset.BTC]: formatAssetBalance(
        uBtcBalanceRaw,
        ASSETS[EAsset.BTC].decimals,
        6
      ),
      [EAsset.ETH]: formatAssetBalance(
        uEthBalanceRaw,
        ASSETS[EAsset.ETH].decimals,
        5
      ),
      [EAsset.SOL]: formatAssetBalance(
        uSolBalanceRaw,
        ASSETS[EAsset.SOL].decimals,
        5
      ),
      [EAsset.FART]: formatAssetBalance(
        uFartBalanceRaw,
        ASSETS[EAsset.FART].decimals,
        2
      ),
      [EAsset.PUMP]: formatAssetBalance(
        uPumpBalanceRaw,
        ASSETS[EAsset.PUMP].decimals,
        2
      ),
      [EAsset.BONK]: formatAssetBalance(
        BigInt(0),
        ASSETS[EAsset.BONK].decimals,
        2
      ),
      [EAsset.SPX]: formatAssetBalance(
        BigInt(0),
        ASSETS[EAsset.SPX].decimals,
        2
      ),
    };
    return value;
  } catch (error) {
    console.log(error);
    return DEFAULT_ASSET_BALANCES;
  }
};

export const useGetEthMainnetBalance = () => {
  const { address } = useAccount();
  const { data, refetch } = useQuery({
    queryKey: ['eth-mainnet-balance', address],
    queryFn: () => getEthMainnetBalance(address),
    enabled: !!address,
    initialData: DEFAULT_ASSET_BALANCE,
  });
  return { data, refetch };
};

const getEthMainnetBalance = async (address: Address | undefined) => {
  if (!address) return DEFAULT_ASSET_BALANCE;
  const balance = await viemEthClient.getBalance({ address });
  return formatAssetBalance(balance, ASSETS[EAsset.ETH].decimals);
};

// Helper function to map portfolio coin names to EAsset enum
const mapPortfolioCoinToEAsset = (coin: string): EAsset | null => {
  switch (coin) {
    case 'UBTC':
      return EAsset.BTC;
    case 'UETH':
      return EAsset.ETH;
    case 'USOL':
      return EAsset.SOL;
    case 'UFART':
      return EAsset.FART;
    case 'UPUMP':
      return EAsset.PUMP;
    case 'UBONK':
      return EAsset.BONK;
    case 'UUUSPX':
      return EAsset.SPX;
    case 'HYPE':
      return EAsset.HYPE;
    case 'wHYPE':
      return EAsset.wHYPE;
    default:
      return null; // Return null for unmapped assets
  }
};

// Helper function to map portfolio balances to EAsset format
const mapPortfolioBalancesToEAssets = (portfolioBalances: SpotBalance[]) => {
  const eAssetBalances: IAssetBalances = {
    ...DEFAULT_ASSET_BALANCES,
  };

  portfolioBalances.forEach((balance) => {
    const eAsset = mapPortfolioCoinToEAsset(balance.coin);
    if (eAsset) {
      eAssetBalances[eAsset] = formatAssetBalance(
        parseUnits(balance.total, ASSETS[eAsset].decimals),
        ASSETS[eAsset].decimals,
        4
      );
    }
  });

  return eAssetBalances;
};

export const useGetHyperCoreBalances = () => {
  const { address } = useAccount();
  const { data, error, refetch } = useQuery({
    queryKey: ['hyper-core-balances', address],
    queryFn: () => getHyperCoreBalances(address),
    enabled: !!address,
    initialData: DEFAULT_ASSET_BALANCES,
    refetchInterval: 5000,
  });

  return { data, error, refetch };
};

const getHyperCoreBalances = async (address: Address | undefined) => {
  if (!address) return DEFAULT_ASSET_BALANCES;
  const portfolio = await infoClient.spotClearinghouseState({
    user: address,
  });

  // Map portfolio balances to EAsset format
  const eAssetBalances = mapPortfolioBalancesToEAssets(portfolio.balances);

  return eAssetBalances;
};

export const useGetNativeBalances = () => {
  const { wallets } = useSolanaWallets();
  const solanaWallet = wallets.find(
    (wallet) => wallet.connectorType === 'solana_adapter'
  );
  const { address } = useAccount();
  const { data, refetch } = useQuery({
    queryKey: ['native-balances', address],
    queryFn: () => getNativeBalances(address, solanaWallet),
    enabled: !!address,
    refetchInterval: 5000,
    initialData: DEFAULT_ASSET_BALANCES,
  });
  return { data, refetch };
};

const getNativeBalances = async (
  address: Address | undefined,
  solanaWallet: ConnectedSolanaWallet | undefined
) => {
  const ethBalance =
    (address && (await viemEthClient.getBalance({ address }))) || BigInt(0);

  // Get Solana balance if there's a connected Solana wallet

  const solBalance = solanaWallet
    ? await getSolanaBalance(solanaWallet.address)
    : BigInt(0);

  console.log('solBalance', solBalance);

  return {
    ...DEFAULT_ASSET_BALANCES,
    [EAsset.ETH]: formatAssetBalance(
      ethBalance,
      ASSETS[EAsset.ETH].decimals,
      4
    ),
    [EAsset.SOL]: formatAssetBalance(
      solBalance,
      ASSETS[EAsset.SOL].decimals,
      4
    ),
  };
};
