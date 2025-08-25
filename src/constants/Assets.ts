import { numbroFormat } from '@/utils/format';
import { Address, formatUnits, Hex, zeroAddress } from 'viem';

export enum EAsset {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  FART = 'FART',
  PUMP = 'PUMP',
  BONK = 'BONK',
  SPX = 'SPX',
  HYPE = 'HYPE',
  wHYPE = 'wHYPE',
}

export type TNetwork = 'bitcoin' | 'ethereum' | 'solana' | 'spl';
export type TBalanceNetwork = 'evm' | 'core' | 'native';
export type TAssetAction = 'deposit' | 'withdraw' | 'bridge';

export type THyperCoreTokenId = `${string}:${Hex}`;

export interface IAssetBalance {
  raw: bigint;
  decimals: number;
  formatted: string;
}

export type IAssetBalances = Record<EAsset, IAssetBalance>;

export const DEFAULT_ASSET_BALANCE: IAssetBalance = {
  raw: 0n,
  decimals: 18,
  formatted: '0',
};
export const DEFAULT_ASSET_BALANCES: IAssetBalances = {
  [EAsset.BTC]: DEFAULT_ASSET_BALANCE,
  [EAsset.ETH]: DEFAULT_ASSET_BALANCE,
  [EAsset.SOL]: DEFAULT_ASSET_BALANCE,
  [EAsset.FART]: DEFAULT_ASSET_BALANCE,
  [EAsset.PUMP]: DEFAULT_ASSET_BALANCE,
  [EAsset.BONK]: DEFAULT_ASSET_BALANCE,
  [EAsset.SPX]: DEFAULT_ASSET_BALANCE,
  [EAsset.HYPE]: DEFAULT_ASSET_BALANCE,
  [EAsset.wHYPE]: DEFAULT_ASSET_BALANCE,
};

export type AssetPrices = Record<EAsset, number>;
export const DEFAULT_ASSET_PRICES: AssetPrices = {
  [EAsset.BTC]: 0,
  [EAsset.ETH]: 0,
  [EAsset.SOL]: 0,
  [EAsset.FART]: 0,
  [EAsset.PUMP]: 0,
  [EAsset.BONK]: 0,
  [EAsset.SPX]: 0,
  [EAsset.HYPE]: 0,
  [EAsset.wHYPE]: 0,
};

export type TAsset = {
  decimals: number;
  icon: string;
  symbol: string;
  isWalletDepositDisabled?: boolean;
  network: TNetwork;
  minAmount: number;
  hyperEvmAddress: Address | null;
  bridgeAddress: Address | null;
  hyperCoreAssetId?: THyperCoreTokenId;
  disabledActions?: TAssetAction[];
};

// Helper function to safely get asset address with fallback
const getAssetHyperEvmAddress = (
  asset:
    | EAsset.wHYPE
    | EAsset.SOL
    | EAsset.ETH
    | EAsset.BTC
    | EAsset.FART
    | EAsset.PUMP
): Address => {
  try {
    switch (asset) {
      case EAsset.wHYPE:
        return '0x5555555555555555555555555555555555555555';
      case EAsset.BTC:
        return '0x9fdbda0a5e284c32744d2f17ee5c74b284993463';
      case EAsset.SOL:
        return '0x068f321fa8fb9f0d135f290ef6a3e2813e1c8a29';
      case EAsset.ETH:
        return '0xbe6727b535545c67d5caa73dea54865b92cf7907';
      case EAsset.FART:
        return '0x3b4575e689ded21caad31d64c4df1f10f3b2cedf';
      case EAsset.PUMP:
        return '0x27ec642013bcb3d80ca3706599d3cda04f6f4452';
      default:
        return zeroAddress;
    }
  } catch (error) {
    return zeroAddress as Address;
  }
};
// Returns the HyperCore <> HyperEVM bridge address for the asset
const getAssetBridgeAddress = (
  asset:
    | EAsset.HYPE
    | EAsset.SOL
    | EAsset.ETH
    | EAsset.BTC
    | EAsset.FART
    | EAsset.PUMP
): Address | null => {
  try {
    switch (asset) {
      case EAsset.HYPE:
        return '0x2222222222222222222222222222222222222222';
      case EAsset.BTC:
        return '0x20000000000000000000000000000000000000c5';
      case EAsset.ETH:
        return '0x20000000000000000000000000000000000000dd';
      case EAsset.SOL:
        return '0x20000000000000000000000000000000000000fe';
      case EAsset.PUMP:
        return '0x200000000000000000000000000000000000012b';
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};

const getL1AssetId = (asset: EAsset) => {
  switch (asset) {
    case EAsset.BTC:
      return 'UBTC:0x8f254b963e8468305d409b33aa137c67';
    case EAsset.ETH:
      return 'UETH:0xe1edd30daaf5caac3fe63569e24748da';
    case EAsset.SOL:
      return 'USOL:0x49b67c39f5566535de22b29b0e51e685';
    case EAsset.FART:
      return 'UFART:0x7650808198966e4285687d3deb556ccc';
    case EAsset.PUMP:
      return 'UPUMP:0x544e60f98a36d7b22c0fb5824b84f795';
    case EAsset.BONK:
      return 'UBONK:0xb113d34e351cf195733c98442530c099';
    case EAsset.SPX:
      return 'USPX:0x0000000000000000000000000000000000000000';
    case EAsset.HYPE:
      return 'UHYPE:0x0000000000000000000000000000000000000000';
  }
};

export const ASSETS: Record<EAsset, TAsset> = {
  [EAsset.BTC]: {
    symbol: 'BTC',
    network: 'bitcoin',
    minAmount: 0.002,
    decimals: 8,
    icon: "url('/assets/ubtc.svg')",
    isWalletDepositDisabled: true,
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.BTC),
    bridgeAddress: getAssetBridgeAddress(EAsset.BTC),
    hyperCoreAssetId: getL1AssetId(EAsset.BTC),
  },
  [EAsset.ETH]: {
    symbol: 'ETH',
    network: 'ethereum',
    minAmount: 0.05,
    decimals: 18,
    icon: "url('/assets/eth.png')",
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.ETH),
    bridgeAddress: getAssetBridgeAddress(EAsset.ETH),
    hyperCoreAssetId: getL1AssetId(EAsset.ETH),
  },
  [EAsset.SOL]: {
    symbol: 'SOL',
    network: 'solana',
    minAmount: 0.2,
    decimals: 9,
    icon: "url('/assets/sol.png')",
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.SOL),
    bridgeAddress: getAssetBridgeAddress(EAsset.SOL),
    hyperCoreAssetId: getL1AssetId(EAsset.SOL),
  },
  [EAsset.FART]: {
    symbol: 'FART',
    network: 'spl',
    minAmount: 20,
    decimals: 6,
    icon: "url('/assets/fart.png')",
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.FART),
    bridgeAddress: getAssetBridgeAddress(EAsset.FART),
    hyperCoreAssetId: getL1AssetId(EAsset.FART),
  },
  [EAsset.PUMP]: {
    symbol: 'PUMP',
    network: 'spl',
    minAmount: 8000,
    decimals: 6,
    icon: "url('/assets/pump.png')",
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.PUMP),
    bridgeAddress: getAssetBridgeAddress(EAsset.PUMP),
    hyperCoreAssetId: getL1AssetId(EAsset.PUMP),
  },
  [EAsset.BONK]: {
    symbol: 'BONK',
    network: 'spl',
    minAmount: 1000000,
    decimals: 6,
    icon: "url('/assets/bonk.png')",
    hyperEvmAddress: null,
    bridgeAddress: null, // not supported
  },
  [EAsset.SPX]: {
    symbol: 'SPX',
    network: 'spl',
    minAmount: 0.05,
    decimals: 6,
    icon: "url('/assets/spx6900.png')",
    hyperEvmAddress: null,
    bridgeAddress: null, // not supported
    hyperCoreAssetId: getL1AssetId(EAsset.SPX),
  },
  [EAsset.HYPE]: {
    symbol: 'HYPE',
    network: 'ethereum',
    minAmount: 0.05,
    decimals: 18,
    icon: "url('/assets/hype.svg')",
    hyperEvmAddress: null,
    bridgeAddress: getAssetBridgeAddress(EAsset.HYPE),
    hyperCoreAssetId: getL1AssetId(EAsset.HYPE),
  },
  [EAsset.wHYPE]: {
    symbol: 'wHYPE',
    network: 'ethereum',
    minAmount: 0.05,
    decimals: 18,
    icon: "url('/assets/hype.svg')",
    hyperEvmAddress: getAssetHyperEvmAddress(EAsset.wHYPE),
    bridgeAddress: null, // not supported
  },
};

// todo: remove this if not needed
export const getAssetByAddress = (address: Address) => {
  return Object.values(ASSETS).find(
    (asset) => asset.hyperEvmAddress?.toLowerCase() === address.toLowerCase()
  );
};
export const getEAssetByAddress = (address: Address): EAsset | null => {
  return Object.keys(ASSETS).find(
    (asset) =>
      ASSETS[asset as EAsset].hyperEvmAddress?.toLowerCase() ===
      address.toLowerCase()
  ) as EAsset | null;
};

export const formatAssetBalance = (
  raw: bigint,
  decimals: number,
  precision?: number
): IAssetBalance => {
  const decimalsValue = Number(formatUnits(raw, decimals));
  return {
    raw,
    decimals: decimalsValue,
    formatted: numbroFormat(decimalsValue, {
      mantissa: precision ?? decimals,
    }),
  };
};
