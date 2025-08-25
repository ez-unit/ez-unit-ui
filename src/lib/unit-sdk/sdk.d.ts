import { HyperUnitConfig, GenerateAddressParams, GenerateAddressResponse, GetOperationsResponse, EstimateFeesResponse, WithdrawalQueueResponse, ApiResponse } from "./types";
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
/**
 * HyperUnit SDK - Maps API endpoints to typed TypeScript functions with signature verification
 */
export declare class HyperUnitSDK {
    private client;
    private config;
    constructor(config: HyperUnitConfig);
    /**
     * Generate an address for deposit/withdrawal
     * Maps to: GET /gen/:src_chain/:dst_chain/:asset/:dst_addr
     * @returns Generated address
     */
    generateAddress(params: GenerateAddressParams): Promise<ApiResponse<GenerateAddressResponse>>;
    /**
     * Get operations for an address
     * Maps to: GET /operations/:address
     * @returns Operations for an address
     */
    getOperations(address: string): Promise<ApiResponse<GetOperationsResponse>>;
    /**
     * Get current fee rate and processing time estimates for each network
     * Maps to: GET /v2/estimate-fees
     * @returns Fee rate and processing time estimates for each network
     */
    estimateFees(): Promise<ApiResponse<EstimateFeesResponse>>;
    /**
     * Get withdrawal queue information for Bitcoin and Ethereum
     * Maps to: GET /withdrawal-queue
     * @returns Withdrawal queue information for Bitcoin and Ethereum
     */
    getWithdrawalQueue(): Promise<ApiResponse<WithdrawalQueueResponse>>;
    /**
     * Generate an address and verify its signatures
     * @param params - The parameters for generating the address
     * @returns Generated address with signature verification
     */
    generateAddressWithVerification(params: GenerateAddressParams): Promise<ApiResponse<VerifiedAddressResponse>>;
    /**
     * Generates Bitcoin deposit address
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Bitcoin deposit address
     */
    generateBitcoinDepositAddress(dst_addr: string): Promise<ApiResponse<GenerateAddressResponse>>;
    /**
     * Generates Bitcoin deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Bitcoin deposit address with signature verification
     */
    generateBitcoinDepositAddressWithVerification(dst_addr: string): Promise<ApiResponse<VerifiedAddressResponse>>;
    /**
     * Generates Ethereum deposit address
     */
    generateEthereumDepositAddress(dst_addr: string): Promise<ApiResponse<GenerateAddressResponse>>;
    /**
     * Generates Ethereum deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Ethereum deposit address with signature verification
     */
    generateEthereumDepositAddressWithVerification(dst_addr: string): Promise<ApiResponse<VerifiedAddressResponse>>;
    /**
     * Generates Solana deposit address
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Solana deposit address with signature verification
     */
    generateSolanaDepositAddress(dst_addr: string): Promise<ApiResponse<GenerateAddressResponse>>;
    /**
     * Generates Solana deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Solana deposit address with signature verification
     */
    generateSolanaDepositAddressWithVerification(dst_addr: string): Promise<ApiResponse<VerifiedAddressResponse>>;
    /**
     * Verify signatures for an existing address response
     */
    verifyAddressSignatures(response: GenerateAddressResponse, params: GenerateAddressParams): Promise<VerifiedAddressResponse>;
    /**
     * Helper method to determine coin type from asset
     */
    private getCoinType;
}
/**
 * Factory function to create a new HyperUnit SDK instance
 */
export declare function createHyperUnitSDK(config: HyperUnitConfig): HyperUnitSDK;
//# sourceMappingURL=sdk.d.ts.map