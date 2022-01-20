import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { Wallet } from "./components/wallet";

function App() {
  return (
    <WalletKitProvider defaultNetwork="localnet" app={{ name: "AlaaToken" }}>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col gap-2 border p-2 rounded-md border-black">
          <Wallet />
          <div className="flex flex-col w-full items-center">
            <h1 className="text-lg">alaa token</h1>
            <h4 className="text-lg">༼ つ ◕_◕ ༽つ</h4>
          </div>
        </div>
      </div>
    </WalletKitProvider>
  );
}

export default App;
