import { ExternalProvider, JsonRpcProvider } from '@ethersproject/providers'
import { LitAuthEvent, LitAuthEventListener } from './packs/web3auth/types'
import { LitAuthAdapter } from './packs/web3auth/LitAuthAdapter'
import { PKPWallet } from "@lit-protocol/pkp-ethers"
import { EthersAdapter } from '@safe-global/protocol-kit'
import { LitPKP } from 'lit-pkp-sdk'

export interface SafeAuthSignInData {
  eoa: string
  safes?: string[]
}

export interface SafeAuthAdapter<TAdapter> {
  provider: PKPWallet | null
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
  getProvider(): PKPWallet | null
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
  address: string
  algo: string
  derivedVia: string
  signedMessage: string
}