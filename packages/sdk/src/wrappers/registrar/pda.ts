import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { ALTOKEN_ADDRESSES } from "../..";

interface FindUserAddressParams {
  login: string;
  authority: PublicKey;
}

export const findUserAddress = async (params: FindUserAddressParams) => {
  const { login, authority } = params;

  const userPDA = await PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(login), authority.toBuffer()],
    ALTOKEN_ADDRESSES.Registrar
  );

  return userPDA;
};
