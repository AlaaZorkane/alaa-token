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
    case "setup":
      await processor.setup();
      break;
    case "reset":
      await processor.reset();
      break;
    case "mint":
      await processor.initialMint();
      break;
    default:
      console.log("Invalid arg :(");
      break;
  }
};

void main()
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
