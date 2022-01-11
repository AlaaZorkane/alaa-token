import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getAirdrop = async (connection: Connection, pubkey: PublicKey) => {
  try {
    console.log("Getting you some free SOL 😎...");

    const airdrop = await connection.requestAirdrop(
      pubkey,
      LAMPORTS_PER_SOL / 100
    );

    await connection.confirmTransaction(airdrop);

    console.log("Airdrop confirmed 🚀:", airdrop);
  } catch (err) {
    console.error("Airdrop failed 💥:", err);
  }
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
