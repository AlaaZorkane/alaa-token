import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import { FC, useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    // <ConnectionProvider endpoint={endpoint}>
    //   <WalletProvider wallets={wallets} autoConnect>
    //     <WalletModalProvider>
    <Component {...pageProps} />
    //     </WalletModalProvider>
    //   </WalletProvider>
    // </ConnectionProvider>
  );
};

export default App;
