"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperUnitSDK = void 0;
exports.createHyperUnitSDK = createHyperUnitSDK;
const client_1 = require("./client");
const verifySignatures_1 = require("./actions/verifySignatures");
/**
 * HyperUnit SDK - Maps API endpoints to typed TypeScript functions with signature verification
 */
class HyperUnitSDK {
    constructor(config) {
        this.config = config;
        this.client = new client_1.HyperUnitClient(config);
    }
    /**
     * Generate an address for deposit/withdrawal
     * Maps to: GET /gen/:src_chain/:dst_chain/:asset/:dst_addr
     * @returns Generated address
     */
    async generateAddress(params) {
        const { src_chain, dst_chain, asset, dst_addr } = params;
        const url = `/gen/${src_chain}/${dst_chain}/${asset}/${dst_addr}`;
        return this.client.get(url);
    }
    /**
     * Get operations for an address
     * Maps to: GET /operations/:address
     * @returns Operations for an address
     */
    async getOperations(address) {
        const url = `/operations/${address}`;
        return this.client.get(url);
    }
    /**
     * Get current fee rate and processing time estimates for each network
     * Maps to: GET /v2/estimate-fees
     * @returns Fee rate and processing time estimates for each network
     */
    async estimateFees() {
        const url = `/v2/estimate-fees`;
        return this.client.get(url);
    }
    /**
     * Get withdrawal queue information for Bitcoin and Ethereum
     * Maps to: GET /withdrawal-queue
     * @returns Withdrawal queue information for Bitcoin and Ethereum
     */
    async getWithdrawalQueue() {
        const url = `/withdrawal-queue`;
        return this.client.get(url);
    }
    /**
     * Generate an address and verify its signatures
     * @param params - The parameters for generating the address
     * @returns Generated address with signature verification
     */
    async generateAddressWithVerification(params) {
        const response = await this.generateAddress(params);
        // Create proposal for signature verification
        const proposal = {
            destinationAddress: params.dst_addr,
            destinationChain: params.dst_chain,
            asset: params.asset,
            address: response.data.address,
            sourceChain: params.src_chain,
            coinType: this.getCoinType(params.asset),
        };
        // Verify signatures using the correct environment
        const verification = await (0, verifySignatures_1.verifyDepositAddressSignatures)(response.data.signatures, proposal);
        // Return extended response with verification
        return {
            ...response,
            data: {
                ...response.data,
                verification,
            },
        };
    }
    /**
     * Generates Bitcoin deposit address
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Bitcoin deposit address
     */
    async generateBitcoinDepositAddress(dst_addr) {
        return this.generateAddress({
            src_chain: "bitcoin",
            dst_chain: "hyperliquid",
            asset: "btc",
            dst_addr,
        });
    }
    /**
     * Generates Bitcoin deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Bitcoin deposit address with signature verification
     */
    async generateBitcoinDepositAddressWithVerification(dst_addr) {
        return this.generateAddressWithVerification({
            src_chain: "bitcoin",
            dst_chain: "hyperliquid",
            asset: "btc",
            dst_addr,
        });
    }
    /**
     * Generates Ethereum deposit address
     */
    async generateEthereumDepositAddress(dst_addr) {
        return this.generateAddress({
            src_chain: "ethereum",
            dst_chain: "hyperliquid",
            asset: "eth",
            dst_addr,
        });
    }
    /**
     * Generates Ethereum deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Ethereum deposit address with signature verification
     */
    async generateEthereumDepositAddressWithVerification(dst_addr) {
        return this.generateAddressWithVerification({
            src_chain: "ethereum",
            dst_chain: "hyperliquid",
            asset: "eth",
            dst_addr,
        });
    }
    /**
     * Generates Solana deposit address
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Solana deposit address with signature verification
     */
    async generateSolanaDepositAddress(dst_addr) {
        return this.generateAddress({
            src_chain: "solana",
            dst_chain: "hyperliquid",
            asset: "sol",
            dst_addr,
        });
    }
    /**
     * Generates Solana deposit address with signature verification
     * @param dst_addr - The destination HyperCore address
     * @returns Generated Solana deposit address with signature verification
     */
    async generateSolanaDepositAddressWithVerification(dst_addr) {
        return this.generateAddressWithVerification({
            src_chain: "solana",
            dst_chain: "hyperliquid",
            asset: "sol",
            dst_addr,
        });
    }
    /**
     * Verify signatures for an existing address response
     */
    async verifyAddressSignatures(response, params) {
        const proposal = {
            destinationAddress: params.dst_addr,
            destinationChain: params.dst_chain,
            asset: params.asset,
            address: response.address,
            sourceChain: params.src_chain,
            coinType: this.getCoinType(params.asset),
        };
        const verification = await (0, verifySignatures_1.verifyDepositAddressSignatures)(response.signatures, proposal);
        return {
            ...response,
            verification,
        };
    }
    /**
     * Helper method to determine coin type from asset
     */
    getCoinType(asset) {
        switch (asset) {
            case "btc":
                return "bitcoin";
            case "eth":
                return "ethereum";
            case "sol":
                return "solana";
            default:
                return asset;
        }
    }
}
exports.HyperUnitSDK = HyperUnitSDK;
/**
 * Factory function to create a new HyperUnit SDK instance
 */
function createHyperUnitSDK(config) {
    return new HyperUnitSDK(config);
}
//# sourceMappingURL=sdk.js.map