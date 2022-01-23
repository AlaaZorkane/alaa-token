import React from "react";
import { Alaatoken } from "@alaatoken/idl";
import { useConnection, useSolana } from "@saberhq/use-solana";
import { Program, Provider } from "@project-serum/anchor";

export const AnchorContext = React.createContext(null);

export const AnchorProvider: React.FC = ({ children }) => {
  const [anchorProvider, setAnchorProvider] = React.useState(null);
  const connection = useConnection();
  const solana = useSolana();

  function getProvider() {
    if (solana?.wallet && solana.wallet?.publicKey) {
      const provider = new Provider(connection, solana.wallet, {
        preflightCommitment: "processed",
      });
      return provider;
    }
    return null;
  }

  function createProgram() {
    if (anchorProvider) {
      const program = new Program(Alaatoken);
      return program;
    }
    return null;
  }

  return (
    <AnchorContext.Provider value={Alaatoken.anchor}></AnchorContext.Provider>
  );
};
