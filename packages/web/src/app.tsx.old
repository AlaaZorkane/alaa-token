import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = React.useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="h-screen w-screen flex items-center justify-center">
            <div className="flex flex-col gap-2 border p-2 rounded-md border-black">
              <WalletMultiButton />
              <WalletDisconnectButton />
              <div className="flex flex-col w-full items-center">
                <h1 className="text-lg">alaa token</h1>
                <h4 className="text-lg">༼ つ ◕_◕ ༽つ</h4>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
