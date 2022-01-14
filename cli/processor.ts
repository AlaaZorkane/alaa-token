import { Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { Alaatoken } from "../target/types/alaatoken";
import fs from "fs/promises";
import { getMintId, getWalletId } from "./utils";

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

  async setup() {
    const [vaultPDA, bump] = await PublicKey.findProgramAddress(
      this.TOKEN_PDA_SEED,
      this.program.programId
    );
    const mint = new Keypair();

    await this.program.account.vaultAccount.fetch(vaultPDA).catch(() => {});

    console.log("mint:", mint.publicKey.toBase58());
    console.log("pda:", vaultPDA.toBase58());

    const wallet = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      vaultPDA,
      true
    );
    console.log("vault tokens:", wallet.toBase58());

    const tx = await this.program.rpc.setup(bump, {
      accounts: {
        vault: vaultPDA,
        mint: mint.publicKey,
        wallet,
        authority: this.authority.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      },
      signers: [mint, this.authority.payer],
    });

    console.log(tx);

    await fs.writeFile("mint.md", mint.publicKey.toBase58(), "utf8");
    await fs.writeFile("wallet.md", wallet.toBase58(), "utf8");
  }

  async reset() {
    const [vaultPDA] = await PublicKey.findProgramAddress(
      this.TOKEN_PDA_SEED,
      this.program.programId
    );
    const mint = await getMintId();
    const wallet = await getWalletId();

    console.log("mint:", mint.toBase58());
    console.log("pda:", vaultPDA.toBase58());
    console.log("vault tokens:", wallet.toBase58());

    const tx = await this.program.rpc.reset({
      accounts: {
        authority: this.authority.publicKey,
        vault: vaultPDA,
        wallet,
        mint,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      signers: [this.authority.payer],
    });

    console.log(tx);

    await fs.rm("mint.md");
    await fs.rm("wallet.md");
  }

  async initialMint() {
    const [vaultPDA] = await PublicKey.findProgramAddress(
      this.TOKEN_PDA_SEED,
      this.program.programId
    );
    const vault = await this.program.account.vaultAccount.fetch(vaultPDA);

    const mint = await getMintId();
    const wallet = await getWalletId();

    if (vault.isMinted) throw new Error("Already minted");

    console.log("mint:", mint.toBase58());
    console.log("pda:", vaultPDA.toBase58());
    console.log("vault tokens:", wallet.toBase58());

    const tx = await this.program.rpc.initialMint({
      accounts: {
        authority: this.authority.publicKey,
        vault: vaultPDA,
        wallet,
        mint,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });

    console.log(tx);
  }
}
