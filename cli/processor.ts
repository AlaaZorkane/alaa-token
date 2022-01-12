import { Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { Alaatoken } from "../target/types/alaatoken";

export class Processor {
  private connection: Connection;
  private program: Program<Alaatoken>;
  private authority: NodeWallet;
  private TOKEN_PDA_SEED = [Buffer.from("ALAA_TOKEN_VAULT")];

  constructor(
    connection: Connection,
    program: Program<Alaatoken>,
    authority: NodeWallet
  ) {
    this.connection = connection;
    this.program = program;
    this.authority = authority;
  }

  async initialize() {
    const [vaultPDA, bump] = await PublicKey.findProgramAddress(
      this.TOKEN_PDA_SEED,
      this.program.programId
    );
    const token = new Keypair();

    console.log("token:", token.publicKey.toBase58());

    console.log("pda:", vaultPDA.toBase58());

    const tx = await this.program.rpc.initialize(bump, {
      accounts: {
        vault: vaultPDA,
        token: token.publicKey,
        authority: this.authority.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      },
      signers: [token, this.authority.payer],
    });

    console.log(tx);
  }
}
