import { PublicKey } from "@solana/web3.js";
import fs from "fs/promises";

export const getTokenId = async () => {
  const [id] = (await fs.readFile("token.md", "utf8")).split("\n");

  return new PublicKey(id);
};
