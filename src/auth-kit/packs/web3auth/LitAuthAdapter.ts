import { IAdapter } from '@web3auth/base'
import { ModalConfig } from '@web3auth/modal'

import { PKPEthersWallet } from "@lit-protocol/pkp-ethers"
import { PKPClient } from '@lit-protocol/pkp-client';
import { AuthSig, SafeAuthAdapter, SessionSigs } from '../../types'
import { LitAuthEvent, LitAuthEventListener } from './types'


/**
 * Web3AuthAdapter implements the SafeAuthClient interface for adapting the Web3Auth service provider
 * @class
 */
export class LitAuthAdapter implements SafeAuthAdapter<LitAuthAdapter> {
  provider: PKPEthersWallet | null
  pkpPubKey: string
  authSig: SessionSigs
  authType: number
  #adapters?: IAdapter<unknown>[]
  #modalConfig?: Record<string, ModalConfig>

  /**
   *
   * @param modalConfig The modal configuration {@link https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization}
   */
  constructor(
    {
      pkpPubKey,
      authSig,
    }: {
      pkpPubKey: string,
      authSig: SessionSigs,
    },
    adapters?: IAdapter<unknown>[],
    modalConfig?: Record<string, ModalConfig>
  ) {
    this.provider = null
    this.authSig = authSig
    this.#adapters = adapters
    this.#modalConfig = modalConfig
    this.pkpPubKey = pkpPubKey
  }

  async init() {

    try {
      console.log('start init')
      console.log('init a lit pkp')
      console.log('this.authSig', this.authSig)
      const authSig = { "sig": "0x2e4611feacd8bb74f2aaad7aecae5dbc01380b8ccf14054ad14e065eab836410419194b0d896133e30f6780f2bbb28e3ae1618771cc2f6bc6f4bda9cf53d2d3f1c", "derivedVia": "web3.eth.personal.sign", "signedMessage": "demo-encrypt-decrypt-react.vercel.app wants you to sign in with your Ethereum account:\n0x6F9DE51F2fD0e8Ee1B3E55182b0C601f0636c250\n\n\nURI: https://demo-encrypt-decrypt-react.vercel.app/\nVersion: 1\nChain ID: 1\nNonce: Ct2sJKohbVHGiI8oR\nIssued At: 2023-04-15T13:43:42.366Z\nExpiration Time: 2023-04-22T13:43:34.131Z", "address": "0x6f9de51f2fd0e8ee1b3e55182b0c601f0636c250" }
      const wallet = new PKPClient({
        pkpPubKey: this.pkpPubKey,
        // pkpPubKey: '0x045003082571d49181c9e8d4fa1eae1def5c235452f30b9bec3a986924f7cbd73c65488ff6b067aa89247912d389f6a294539c97216392bd3a3e8cf3f8a5f2b3f1',
        // controllerSessionSigs: this.authSig,
        controllerAuthSig: Object.values(this.authSig)[0],
        // controllerAuthSig: authSig,
        rpc: "https://eth-goerli.g.alchemy.com/v2/SKIuCInnDuvAmdTn6j-WCkiSAGZAiNUr",
      });
      await wallet.connect();
      const etherWallet = wallet.getEthWallet()
      this.provider = etherWallet;
      console.log('end init')

    } catch (e) {
      console.log('[ERROR] error while init lit wallet', e)
    }
  }

  /**
   * Connect to the Web3Auth service providerauthSig
   * @returns
   */
  //@ts-ignore
  async signIn(): Promise<void> {
    if (!this.provider) return
    console.log('this.provider', this.provider)

    // console.log(this.provider.privateKey)
  }
  /**
   * Disconnect from the Web3Auth service provider
   */
  async signOut(): Promise<void> {
    this.provider = null;
  }

  /**
   * Allow to subscribe to the Web3Auth events
   * @param event The event you want to susbscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  subscribe(event: LitAuthEvent, handler: LitAuthEventListener): void {
    console.log("gm")
  }

  /**
   * Allow to unsubscribe to the Web3Auth events
   * @param event The event you want to unsubscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  unsubscribe(event: LitAuthEvent, handler: LitAuthEventListener): void {
    console.log("gm")
  }
}

