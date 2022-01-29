import { PublicKey, SystemProgram } from "@solana/web3.js";
import { AlTokenSDK } from "../../sdk";
import { RegistrarProgram, UserData } from "../../programs/registrar";
import { RegisterInstructionParams } from "./types";
import { TransactionEnvelope } from "@saberhq/solana-contrib";
import { findUserAddress } from "./pda";

/**
 * Handles interacting with the Registrar program
 */
export class RegistrarWrapper {
  readonly program: RegistrarProgram;

  constructor(readonly sdk: AlTokenSDK) {
    this.program = sdk.programs.Registrar;
  }

  get provider() {
    return this.sdk.provider;
  }

  async fetchUser(key: PublicKey): Promise<UserData | null> {
    return await this.program.account.user.fetchNullable(key);
  }

  async register(
    params: RegisterInstructionParams
  ): Promise<TransactionEnvelope> {
    const { login } = params;
    const authority = this.provider.wallet.publicKey;

    const [user, bump] = await findUserAddress({ authority, login });

    const tx = this.program.instruction.register(bump, login, {
      accounts: {
        authority: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        user,
      },
    });

    return this.provider.newTX([tx]);
  }
}
