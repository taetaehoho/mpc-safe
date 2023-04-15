export type SafeDomainData = {
    verifyingContract: string // safe address
    chainId: number
}

export const EIP712_SAFE_TX_TYPE = {
    // "SafeTx(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,uint256 nonce)"
    SafeTx: [
        { type: "address", name: "to" },
        { type: "uint256", name: "value" },
        { type: "bytes", name: "data" },
        { type: "uint8", name: "operation" },
        { type: "uint256", name: "safeTxGas" },
        { type: "uint256", name: "baseGas" },
        { type: "uint256", name: "gasPrice" },
        { type: "address", name: "gasToken" },
        { type: "address", name: "refundReceiver" },
        { type: "uint256", name: "nonce" },
    ],
};
export enum OperationType {
    Call, // 0
    DelegateCall // 1
}
export type SafeTransaction = {
    to: string
    value: string
    data: string
    operation: OperationType
    safeTxGas: number
    baseGas: number
    gasPrice: number
    gasToken: string
    refundReceiver: string
    nonce: number
}