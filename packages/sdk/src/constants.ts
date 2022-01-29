import { buildCoderMap } from "@saberhq/anchor-contrib";
import { PublicKey } from "@solana/web3.js";
import { AlaatokenJSON } from "./idls/alaatoken";
import { RegistrarJSON } from "./idls/registrar";
import { CoreProgram, CoreTypes } from "./programs";
import { RegistrarProgram, RegistrarTypes } from "./programs/registrar";

export const ALTOKEN_ADDRESSES = {
  Core: new PublicKey("DgaUVK7Mz1ExQEH2g25i1GRt8xwhh13v9UU5y2ncGXit"),
  Registrar: new PublicKey("BFq6fMJ4DuGriFeQs2uBPcYEzntU6NwVitD3LhujhRtv"),
};

export const ALTOKEN_IDLS = {
  Core: AlaatokenJSON,
  Registrar: RegistrarJSON,
};

export interface AlTokenPrograms {
  Core: CoreProgram;
  Registrar: RegistrarProgram;
}

export const ALTOKEN_CODERS = buildCoderMap<{
  Core: CoreTypes;
  Registrar: RegistrarTypes;
}>(ALTOKEN_IDLS, ALTOKEN_ADDRESSES);

export const DEFAULT_DECIMALS = 0;
export const DEFAULT_TOTAL_SUPPLY = 1_000_000;
