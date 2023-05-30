# PKP x Google x Safe 🪢

This is an example web app that shows how you can mint and use programmable key pairs (PKPs) with just Google account. Furthermore, you can use this PKP with our customize wallet adater to connect with safe. With all these connectivity, you can create a Safe with PKP wallet and Sign a Safe transaction. In the future, we will even support the PKP wallet created by WebAuthn so anyone can use FaceID to create a Safe.

Check out the [live demo](https://eth-tokyo-0414.vercel.app/).

## 💻 Getting Started

1. Clone this repo and install dependencies:

```bash
yarn install
```

2. Start your development server:

```bash
yarn dev
```

3. Visit [http://localhost:3000](http://localhost:3000) to start playing with the app.

Ux optimization strategies
- use Google Oauth to sign and create safes! 
- This works via controlling a LitPKP via your Google Oauth (webauthn is supported as well). The Oauth key becomes a signer in an MPC network, the aggregate key shares of which can create an ECDSA signature (EIP712 signature that feeds into SAFE signing) 
- There is also compatibility between the SAFE Auth SDK and this repo such that people using Safe Auth can use this RELATIVELY out of the box! 

Gnosis
- Deployment address: https://gnosisscan.io/tx/0x3d7149f48357e55517fc11a415e91f6fbf7f88a7bb7fa3478b7068ab5d9c970d

