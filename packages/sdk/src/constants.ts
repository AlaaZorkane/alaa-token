import { buildCoderMap } from "@saberhq/anchor-contrib";
import { PublicKey } from "@solana/web3.js";
import { AlaatokenJSON } from "./idls/alaatoken";
import { CoreProgram, CoreTypes } from "./programs";

export const ALTOKEN_ADDRESSES = {
  Core: new PublicKey("DgaUVK7Mz1ExQEH2g25i1GRt8xwhh13v9UU5y2ncGXit"),
};

export const ALTOKEN_IDLS = {
  Core: AlaatokenJSON,
};

export interface AlTokenPrograms {
  Core: CoreProgram;
}

export const ALTOKEN_CODERS = buildCoderMap<{
  Core: CoreTypes;
}>(ALTOKEN_IDLS, ALTOKEN_ADDRESSES);

export const DEFAULT_DECIMALS = 0;
export const DEFAULT_TOTA_SUPPLY = 1_000_000;
