import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import { beforeAll, describe, expect, it } from "vitest";
import { Alaatoken } from "../target/types/alaatoken";
import { getAirdrop, sleep } from "./helpers";

describe("alaatoken", async () => {
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Alaatoken as Program<Alaatoken>;
  const connection = anchor.getProvider().connection;

  const user = new Keypair();
  const [vaultPDA, bump] = await PublicKey.findProgramAddress(
    [user.publicKey.toBuffer()],
    program.programId
  );

  await getAirdrop(connection, user.publicKey);

  it("initialize", async () => {
    const [vaultPDA, bump] = await PublicKey.findProgramAddress(
      [user.publicKey.toBuffer()],
      program.programId
    );

    const tx = await program.rpc.initialize(bump, {
      accounts: {
        vault: vaultPDA,
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [user],
    });

    console.log("tx initialize:", tx);
  });

  it("updates data", async () => {
    const tx = await program.rpc.update("a".repeat(16), bump, {
      accounts: {
        vault: vaultPDA,
        user: user.publicKey,
      },
      signers: [user],
    });

    console.log("tx update:", tx);

    const vault = await program.account.vaultAccount.fetch(vaultPDA);

    expect(vault.data).toEqual("a".repeat(16));
  });

  it("fails if more than 16 characters", async () => {
    try {
      await program.rpc.update("a".repeat(17), bump, {
        accounts: {
          vault: vaultPDA,
          user: user.publicKey,
        },
        signers: [user],
      });
    } catch (err) {
      expect(err.code).toBe(6001);
    }
  });

  it("fails if it has 'alaa' :p", async () => {
    try {
      await program.rpc.update("hahalolalaalol", bump, {
        accounts: {
          vault: vaultPDA,
          user: user.publicKey,
        },
        signers: [user],
      });
    } catch (err) {
      expect(err.code).toBe(6000);
    }
  });
});
