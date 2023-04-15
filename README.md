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
- we implemented Google Oauth to sign and create safes! Instead of having to pull out your ledger you can simply sign with your google ID. 
- Relevant aspects are https://github.com/taetaehoho/tokyo-frontend/blob/main/src/auth-kit/LitSafeAuthKit.ts where we made the safe auth sdk work with LitPKPs and https://github.com/taetaehoho/tokyo-frontend/blob/main/src/auth-kit/packs/web3auth/LitAuthAdapter.ts where we created a custom wallet adapter for LitPkps 

Polygon
- Deployment address: https://mumbai.polygonscan.com/address/0x7d94744acd2f133b3a097c12f1944f0c96f98b90#code
- Twitter: https://twitter.com/0xtaetaehoho/status/1647379544406626304?s=20

Gnosis
- Deployment address: https://gnosisscan.io/tx/0x3d7149f48357e55517fc11a415e91f6fbf7f88a7bb7fa3478b7068ab5d9c970d

