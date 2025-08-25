export type Chain = 'bitcoin' | 'solana' | 'ethereum' | 'hyperliquid';
export type Asset = 'btc' | 'eth' | 'sol' | 'fart' | 'pump' | 'bonk' | 'spx';
export type Environment = 'testnet' | 'mainnet';
export declare enum OperationState {
  SrcTxDiscovered = 'sourceTxDiscovered',
  WaitForSrcTxFinalization = 'waitForSrcTxFinalization',
  BuildingDstTx = 'buildingDstTx',
  SignTx = 'signTx',
  BroadcastTx = 'broadcastTx',
  WaitForDstTxFinalization = 'waitForDstTxFinalization',
  ReadyForWithdrawQueue = 'readyForWithdrawQueue',
  QueuedForWithdraw = 'queuedForWithdraw',
  Done = 'done',
  Failure = 'failure',
}
export interface Address {
  sourceCoinType: string;
  destinationChain: string;
  address: string;
  signatures: {
    'field-node': string;
    'hl-node'?: string;
    'hl-node-testnet'?: string;
    'unit-node'?: string;
    'node-1'?: string;
  };
}
export interface Operation {
  opCreatedAt: string;
  operationId: string;
  protocolAddress: string;
  sourceAddress: string;
  destinationAddress: string;
  sourceChain: Chain;
  destinationChain: Chain;
  sourceAmount: string;
  destinationFeeAmount: string;
  sweepFeeAmount: string;
  stateStartedAt: string;
  stateUpdatedAt: string;
  stateNextAttemptAt: string;
  sourceTxHash: string;
  sourceTxConfirmations?: number;
  destinationTxHash: string;
  destinationTxConfirmations?: number;
  broadcastAt?: string;
  asset: Asset;
  state: OperationState;
  positionInWithdrawQueue?: number;
}
export interface GetOperationsResponse {
  addresses: Address[];
  operations: Operation[];
}
export interface GenerateAddressParams {
  src_chain: Chain;
  dst_chain: Chain;
  asset: Asset;
  dst_addr: string;
}
export interface GenerateAddressResponse {
  address: string;
  signatures: {
    'field-node': string;
    'hl-node': string;
    'unit-node': string;
  };
  status: 'OK';
}
export interface VerifiedAddressResponse extends GenerateAddressResponse {
  verification: {
    success: boolean;
    verifiedCount: number;
    errors?: string[];
    verificationDetails?: {
      [nodeId: string]: boolean;
    };
  };
}
export interface ApiErrorResponse {
  error: string;
}
export interface HyperUnitConfig {
  environment?: Environment;
  timeout?: number;
  headers?: Record<string, string>;
}
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
export declare class HyperUnitError extends Error {
  status?: number | undefined;
  code?: string | undefined;
  details?: any | undefined;
  constructor(
    message: string,
    status?: number | undefined,
    code?: string | undefined,
    details?: any | undefined
  );
}
export interface BitcoinFeeEstimate {
  'deposit-fee-rate-sats-per-vb': number;
  'deposit-size-v-bytes': number;
  depositEta: string;
  depositFee: number;
  'withdrawal-fee-rate-sats-per-vb': number;
  'withdrawal-size-v-bytes': number;
  withdrawalEta: string;
  withdrawalFee: number;
}
export interface EthereumFeeEstimate {
  'base-fee': number;
  depositEta: string;
  depositFee: number;
  'eth-deposit-gas': number;
  'eth-withdrawal-gas': number;
  'priority-fee': number;
  withdrawalEta: string;
  withdrawalFee: number;
}
export interface SolanaFeeEstimate {
  depositEta: string;
  depositFee: number;
  withdrawalEta: string;
  withdrawalFee: number;
}
export interface SPLFeeEstimate {
  depositEta: string;
  depositFee: number;
  withdrawalEta: string;
  withdrawalFee: number;
}
export interface EstimateFeesResponse {
  bitcoin: BitcoinFeeEstimate;
  ethereum: EthereumFeeEstimate;
  solana: SolanaFeeEstimate;
  spl: SPLFeeEstimate;
}
export interface WithdrawalQueueInfo {
  lastWithdrawQueueOperationTxID: string;
  withdrawalQueueLength: number;
}
export interface WithdrawalQueueResponse {
  bitcoin: WithdrawalQueueInfo;
  ethereum: WithdrawalQueueInfo;
}
//# sourceMappingURL=types.d.ts.map
