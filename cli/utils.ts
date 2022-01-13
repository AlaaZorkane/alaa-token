import { PublicKey } from "@solana/web3.js";
import fs from "fs/promises";

export const getMintId = async () => {
  const [id] = (await fs.readFile("mint.md", "utf8")).split("\n");

  return new PublicKey(id);
};

export const getWalletId = async () => {
  const [id] = (await fs.readFile("wallet.md", "utf8")).split("\n");

  return new PublicKey(id);
};
