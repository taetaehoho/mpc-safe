import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { LitAuthEvent, LitAuthEventListener } from './packs/web3auth/types'
import { LitAuthAdapter } from './packs/web3auth/LitAuthAdapter'
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers"
import { EthersAdapter } from '@safe-global/protocol-kit'
import { LitPKP } from 'lit-pkp-sdk'
import { PKPClient } from '@lit-protocol/pkp-client';

export interface SafeAuthSignInData {
  eoa: string
  safes?: string[]
}

export interface SafeAuthAdapter<TAdapter> {
  provider: PKPEthersWallet | null
  pkpPubKey: string
  authSig: any
  init(): Promise<void>
  signIn(): Promise<SafeSignInResponse<TAdapter>>
  signOut(): Promise<void>
  subscribe(event: SafeAuthEvent<TAdapter>, handler: SafeAuthEventListener<TAdapter>): void
  unsubscribe(event: SafeAuthEvent<TAdapter>, handler: SafeAuthEventListener<TAdapter>): void
}

export interface ISafeAuthKit<TAdapter> {
  signIn(): Promise<SafeAuthSignInData>
  signOut(): Promise<void>
  getProvider(): PKPEthersWallet | null
  subscribe(event: SafeAuthEvent<TAdapter>, listener: SafeAuthEventListener<TAdapter>): void
  unsubscribe(event: SafeAuthEvent<TAdapter>, listener: SafeAuthEventListener<TAdapter>): void
}


export type SafeAuthEvent<T> = T extends LitAuthAdapter ? LitAuthEvent : never
export type SafeAuthEventListener<T> = T extends LitAuthAdapter ? LitAuthEventListener : never
export type SafeSignInResponse<T> = T extends LitAuthAdapter ? void : never

export interface SafeAuthConfig {
  txServiceUrl?: string
}

export type SessionSigs = {
  [key: string]: AuthSig
}
export type AuthSig = {
  sig: string
  address: string
  algo?: []
  derivedVia: string
  signedMessage: string
  capabilities?: [];
}

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
export type SafeTransaction = {
  safeTxGas: string | number;
  baseGas: string | number;
  gasPrice: string | number;
  gasToken: string;
  refundReceiver: string;
  nonce: string | number;
}