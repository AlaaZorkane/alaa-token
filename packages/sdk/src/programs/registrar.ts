import { AnchorTypes } from "@saberhq/anchor-contrib";
import { RegistrarIDL } from "../idls/registrar";

export type RegistrarTypes = AnchorTypes<
  RegistrarIDL,
  {
    user: UserData;
  }
>;

export type RegistrarInfo = RegistrarTypes["State"];

type Accounts = RegistrarTypes["Accounts"];
export type UserData = Accounts["UserAccount"];

export type MintInstruction = RegistrarTypes["Defined"][];

export type RegistrarError = RegistrarTypes["Error"];

export type RegistrarProgram = RegistrarTypes["Program"];
