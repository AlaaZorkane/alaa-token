import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Alaatoken } from "../target/types/alaatoken";
import { Processor } from "./processor";

anchor.setProvider(anchor.Provider.env());

const program = anchor.workspace.Alaatoken as Program<Alaatoken>;
const connection = anchor.getProvider().connection;
const authority = NodeWallet.local();

const main = async () => {
  const args = process.argv.slice(2);
  const directive = args[0];
  const processor = new Processor(connection, program, authority);

  switch (directive) {
    case "initialize":
      await processor.initialize();
      break;
    case "mint":
      // processor.mintToken();
      break;
    default:
      console.log("Invalid arg :(");
      break;
  }
};

void main().catch(console.error);
