import { AnchorTypes } from "@saberhq/anchor-contrib";
import { AlaatokenIDL } from "../idls/alaatoken";

export type CoreTypes = AnchorTypes<
  AlaatokenIDL,
  {
    user: UserData;
    vault: VaultData;
  }
>;

export type CoreInfo = CoreTypes["State"];

type Accounts = CoreTypes["Accounts"];
export type UserData = Accounts["UserAccount"];
export type VaultData = Accounts["VaultAccount"];

export type MintInstruction = CoreTypes["Defined"][];

export type CoreError = CoreTypes["Error"];

export type CoreProgram = CoreTypes["Program"];
