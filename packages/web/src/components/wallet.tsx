import {
  ConnectWalletButton,
  useConnectedWallet,
  useSolana,
} from "@gokiprotocol/walletkit";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

export const Wallet = () => {
  const wallet = useSolana();

  const [balance, setBalance] = React.useState<number | null>(null);

  const refetchSOL = React.useCallback(async () => {
    if (wallet?.providerMut && wallet?.publicKey) {
      setBalance(
        await wallet.providerMut.connection.getBalance(wallet.publicKey)
      );
    }
  }, [wallet?.publicKey, wallet?.providerMut]);

  React.useEffect(() => {
    void refetchSOL();
  }, [refetchSOL]);

  if (!wallet?.connected) return <ConnectWalletButton />;
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h5>
        Connected as{" "}
        <span className="font-bold">{wallet.publicKey?.toBase58()}</span>
      </h5>
      {balance ? (
        <h4>
          Balance:{" "}
          <span className="font-bold">{balance / LAMPORTS_PER_SOL} SOL</span>
        </h4>
      ) : null}
      <div>
        <button
          onClick={wallet.disconnect}
          className="p-2 bg-gray-900 text-white rounded-md font-bold"
        >
          disconnect
        </button>
      </div>
    </div>
  );
};
