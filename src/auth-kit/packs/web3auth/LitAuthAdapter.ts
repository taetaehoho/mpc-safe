import { IAdapter } from '@web3auth/base'
import { ModalConfig } from '@web3auth/modal'

import { PKPWallet } from "@lit-protocol/pkp-ethers"
import { AuthSig, SafeAuthAdapter } from '../../types'
import { LitAuthEvent, LitAuthEventListener } from './types'
import { LitPKP } from 'lit-pkp-sdk'


/**
 * Web3AuthAdapter implements the SafeAuthClient interface for adapting the Web3Auth service provider
 * @class
 */
export class LitAuthAdapter implements SafeAuthAdapter<LitAuthAdapter> {
  provider: PKPWallet | null
  pkpPubKey: string
  authSig: AuthSig
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
      authSig: AuthSig,
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
      const wallet = new PKPWallet({
        pkpPubKey: this.pkpPubKey,
        controllerAuthSig: this.authSig,
        provider: "https://polygon-mumbai.g.alchemy.com/v2/CqeGcxivEEmE_xvbnbvE3bRIYCigwHIm",
      });
      await wallet.init();
      this.provider = wallet;
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

