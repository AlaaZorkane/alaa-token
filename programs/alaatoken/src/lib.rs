use anchor_lang::prelude::*;
use anchor_spl::token::{
    self, Burn, CloseAccount, Mint, MintTo, SetAuthority, Token, TokenAccount,
};
use spl_token::instruction::AuthorityType;

mod account_structs;
mod errors;
mod macros;
mod state;

use account_structs::*;
use errors::*;
use state::*;

declare_id!("DgaUVK7Mz1ExQEH2g25i1GRt8xwhh13v9UU5y2ncGXit");

#[program]
pub mod alaatoken {
    use super::*;

    pub const DEFAULT_MAX_SUPPLY: u64 = 100_000; // in SOL
    pub const TOKEN_PDA_SEED: &[u8] = b"ALAA_TOKEN_VAULT";
    pub const ROOT: &str = "4P3wA8rnnHuHsyTxTsES54mmzqdPKv7QQqHNfrgdXAnQ";

    pub fn setup(ctx: Context<Setup>, bump: u8) -> ProgramResult {
        let vault = &mut ctx.accounts.vault;

        vault.bump = bump;
        vault.wallet = ctx.accounts.wallet.key();
        vault.initial_mint_amount = DEFAULT_MAX_SUPPLY;
        vault.is_setup = true;
        vault.is_minted = false;
        vault.is_freezed = false;
        vault.authority = ctx.accounts.authority.key();

        Ok(())
    }

    // p.s: This doesn't close the mint account because cpi context fails somewhere
    pub fn reset(ctx: Context<Reset>) -> ProgramResult {
        let vault = &ctx.accounts.vault;
        let seed = vault_signature!(vault);

        // Burn all remaining tokens
        {
            let cpi_accounts = Burn {
                authority: vault.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
                to: ctx.accounts.wallet.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seed);

            token::burn(cpi_ctx, ctx.accounts.wallet.amount).unwrap();
        }

        // Close wallet account
        {
            let cpi_accounts = CloseAccount {
                authority: vault.to_account_info(),
                account: ctx.accounts.wallet.to_account_info(),
                destination: ctx.accounts.authority.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seed);

            token::close_account(cpi_ctx).unwrap();
        }

        Ok(())
    }

    pub fn initial_mint(ctx: Context<InitialMint>) -> ProgramResult {
        let vault = &ctx.accounts.vault;
        let seed = vault_signature!(vault);

        // Mint default max supply
        {
            let cpi_accounts = MintTo {
                to: ctx.accounts.wallet.to_account_info(),
                authority: vault.to_account_info(),
                mint: ctx.accounts.mint.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seed);

            token::mint_to(cpi_ctx, vault.initial_mint_amount).unwrap();
        }

        // Disable future minting
        {
            let cpi_accounts = SetAuthority {
                current_authority: vault.to_account_info(),
                account_or_mint: ctx.accounts.mint.to_account_info(),
            };
            let cpi_program = ctx.accounts.token_program.to_account_info();
            let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seed);

            token::set_authority(cpi_ctx, AuthorityType::MintTokens, None).unwrap();
        }

        let vault = &mut ctx.accounts.vault;
        vault.is_minted = true;
        Ok(())
    }
}
