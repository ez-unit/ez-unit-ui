import { AssetPrices, DEFAULT_ASSET_PRICES, EAsset } from '@/constants/Assets';
import { scaleBigIntToNumber } from '@/utils/format';
import { HermesClient } from '@pythnetwork/hermes-client';
import { useQuery } from '@tanstack/react-query';

// Pricefeed list:  https://pyth.network/developers/price-feed-ids

export const fetchAssetPrices = async (): Promise<AssetPrices> => {
  const pythConnection = new HermesClient('https://hermes.pyth.network', {});
  const priceIds = [
    '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', // BTC/USD
    '0x4279e31cc369bbcc2faf022b382b080e32a8e689ff20fbc530d2a603eb6cd98b', // HYPE/USD
    '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d', // SOL/USD
    '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace', // ETH/USD
    '0x58cd29ef0e714c5affc44f269b2c1899a52da4169d7acc147b9da692e6953608', // FARTCOIN/USD
    '0x8414cfadf82f6bed644d2e399c11df21ec0131aa574c56030b132113dbbf3a0a', // SPX6900/USD
    '0x7a01fca212788bba7c5bf8c9efd576a8a722f070d2c17596ff7bb609b8d5c3b9', // PUMP/USD
    '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419', // BONK/USD
  ];
  try {
    // Latest price updates
    const priceUpdates = await pythConnection.getLatestPriceUpdates(priceIds);

    // BTC/USD
    const btcPrice =
      priceUpdates.parsed && priceUpdates.parsed[0]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[0].ema_price.price), 8)
        : 0;

    // HYPE/USD
    const hypePrice =
      priceUpdates.parsed && priceUpdates.parsed[1]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[1].ema_price.price), 8)
        : 0;

    // SOL/USD
    const solPrice =
      priceUpdates.parsed && priceUpdates.parsed[2]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[2].ema_price.price), 8)
        : 0;

    // ETH/USD
    const ethPrice =
      priceUpdates.parsed && priceUpdates.parsed[3]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[3].ema_price.price), 8)
        : 0;

    // FARTCOIN/USD
    const fartPrice =
      priceUpdates.parsed && priceUpdates.parsed[4]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[4].ema_price.price), 8)
        : 0;

    // SPX6900/USD
    const spx6900Price =
      priceUpdates.parsed && priceUpdates.parsed[5]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[5].ema_price.price), 8)
        : 0;

    // PUMP/USD
    const pumpPrice =
      priceUpdates.parsed && priceUpdates.parsed[6]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[6].ema_price.price), 8)
        : 0;

    // BONK/USD
    const bonkPrice =
      priceUpdates.parsed && priceUpdates.parsed[7]
        ? scaleBigIntToNumber(BigInt(priceUpdates.parsed[7].ema_price.price), 8)
        : 0;

    return {
      [EAsset.wHYPE]: hypePrice,
      [EAsset.BTC]: btcPrice,
      [EAsset.ETH]: ethPrice,
      [EAsset.HYPE]: hypePrice,
      [EAsset.SOL]: solPrice,
      [EAsset.FART]: fartPrice,
      [EAsset.SPX]: spx6900Price,
      [EAsset.PUMP]: pumpPrice,
      [EAsset.BONK]: bonkPrice,
    };
  } catch (error) {
    return DEFAULT_ASSET_PRICES;
  }
};

export const useAssetPrices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['assetPrices'],
    queryFn: fetchAssetPrices,
    refetchInterval: 10000,
    initialData: DEFAULT_ASSET_PRICES,
  });
  return { data, isLoading, error };
};
