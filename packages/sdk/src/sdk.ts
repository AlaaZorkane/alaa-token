import { newProgramMap } from "@saberhq/anchor-contrib";
import {
  AugmentedProvider,
  Provider,
  SolanaAugmentedProvider,
} from "@saberhq/solana-contrib";
import { Signer } from "@solana/web3.js";
import { AlTokenPrograms, ALTOKEN_ADDRESSES, ALTOKEN_IDLS } from ".";

export class AlTokenSDK {
  constructor(
    readonly provider: AugmentedProvider,
    readonly programs: AlTokenPrograms
  ) {}

  withSigner(signer: Signer): AlTokenSDK {
    return AlTokenSDK.load({
      provider: this.provider.withSigner(signer),
    });
  }

  static load({ provider }: { provider: Provider }): AlTokenSDK {
    const programs: AlTokenPrograms = newProgramMap<AlTokenPrograms>(
      provider,
      ALTOKEN_IDLS,
      ALTOKEN_ADDRESSES
    );

    return new AlTokenSDK(new SolanaAugmentedProvider(provider), programs);
  }
}
