import { useEffect, useState } from "react";
import React from "react";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";
import { EthHashInfo } from "@safe-global/safe-react-components";
import {
  SafeAuthKit,
  SafeAuthSignInData,
  Web3AuthEventListener,
  Web3AuthAdapter,
} from "@safe-global/auth-kit";
const connectedHandler = (data) => console.log("CONNECTED", data);
const disconnectedHandler = (data) => console.log("DISCONNECTED", data);
import { Grid, GridItem, Text, Divider, Box, Button } from "@chakra-ui/react";
function App() {
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null);
  const [safeAuth, setSafeAuth] = useState();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const options = {
        clientId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          rpcTarget: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            name: "Safe",
          },
        },
      });

      const adapter = new Web3AuthAdapter(
        options,
        [openloginAdapter],
        modalConfig
      );

      const safeAuthKit = await SafeAuthKit.init(adapter, {
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      });

      safeAuthKit.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      safeAuthKit.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);

      setSafeAuth(safeAuthKit);

      return () => {
        safeAuthKit.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
        safeAuthKit.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, []);

  const login = async () => {
    if (!safeAuth) return;

    const response = await safeAuth.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setSafeAuthSignInResponse(response);
    setProvider(safeAuth.getProvider());
  };

  const logout = async () => {
    if (!safeAuth) return;

    await safeAuth.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  console.log("YOLO");

  return (
    <>
      <AppBar onLogin={login} onLogout={logout} isLoggedIn={!!provider} />

      {safeAuthSignInResponse?.eoa && (
        <Grid>
          <GridItem colSpan={4} p={4}>
            <Text variant="h3" fontWeight={700} color="white">
              Owner account
            </Text>
            <Divider sx={{ my: 3 }} />
            {/* <EthHashInfo
              address={safeAuthSignInResponse.eoa}
              showCopyButton
              showPrefix
              prefix={getPrefix("0x5")}
            /> */}
            <Text>{safeAuthSignInResponse.eoa}</Text>
          </GridItem>
          <GridItem colSpan={8} p={4}>
            <>
              <Text variant="h3" color="secondary" fontWeight={700}>
                Available Safes
              </Text>
              <Divider my={3} />
              {safeAuthSignInResponse?.safes?.length ? (
                safeAuthSignInResponse?.safes?.map((safe, index) => (
                  <Box my={3} key={index}>
                    <EthHashInfo
                      address={safe}
                      showCopyButton
                      shortAddress={false}
                    />
                  </Box>
                ))
              ) : (
                <Text variant="body1" color="secondary" fontWeight={700}>
                  No Available Safes
                </Text>
              )}
            </>
          </GridItem>
        </Grid>
      )}
    </>
  );
}
const AppBar = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <Box position="static" color="default">
      <Text variant="h3" pl={4} fontWeight={700}>
        Auth Provider Demo
      </Text>

      <Box mr={5}>
        {isLoggedIn ? (
          <Button variant="contained" onClick={onLogout}>
            Log Out
          </Button>
        ) : (
          <Button variant="contained" onClick={onLogin}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

const getPrefix = (chainId) => {
  switch (chainId) {
    case "0x1":
      return "eth";
    case "0x5":
      return "gor";
    case "0x100":
      return "gno";
    case "0x137":
      return "matic";
    default:
      return "eth";
  }
};

export default App;
