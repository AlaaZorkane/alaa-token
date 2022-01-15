import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { describe, it } from "vitest";
import { Alaatoken } from "../target/types/alaatoken";
import { getAirdrop } from "./helpers";

describe("alaatoken", async () => {
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Alaatoken as Program<Alaatoken>;
  const connection = anchor.getProvider().connection;

  const authority = new Keypair();
  const login = "alice";

  await getAirdrop(connection, authority.publicKey);

  it("register new user", async () => {
    const [user, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("user"), Buffer.from(login), authority.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.rpc.register(bump, login, {
      accounts: {
        user,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [authority],
    });

    console.log("TX:", tx);

    const userAccount = await program.account.userAccount.fetch(user);
    console.log(userAccount);
  });
});
