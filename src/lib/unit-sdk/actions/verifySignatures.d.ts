export declare const TESTNET_GUARDIAN_NODES: {
    nodeId: string;
    publicKey: string;
}[];
export declare const MAINNET_GUARDIAN_NODES: {
    nodeId: string;
    publicKey: string;
}[];
interface Proposal {
    destinationAddress: string;
    destinationChain: string;
    asset: string;
    address: string;
    sourceChain: string;
    coinType?: string;
    keyType?: string;
}
interface VerificationResult {
    success: boolean;
    verifiedCount: number;
    errors?: string[];
    verificationDetails?: {
        [nodeId: string]: boolean;
    };
}
export declare function verifyDepositAddressSignatures(signatures: {
    [nodeId: string]: string;
}, proposal: Proposal): Promise<VerificationResult>;
export {};
//# sourceMappingURL=verifySignatures.d.ts.map