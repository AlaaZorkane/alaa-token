pub mod errors;
pub mod state;

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, CloseAccount, Mint, MintTo, Token, TokenAccount},
};
use std::str::FromStr;

use errors::ErrorCode;
use state::VaultAccount;

declare_id!("DgaUVK7Mz1ExQEH2g25i1GRt8xwhh13v9UU5y2ncGXit");

#[program]
pub mod alaatoken {

    use anchor_spl::token::Burn;

    use super::*;

    pub const DEFAULT_MAX_SUPPLY: u64 = 100_000; // in SOL
    pub const TOKEN_PDA_SEED: &[u8] = b"ALAA_TOKEN_VAULT";
    pub const ROOT: &str = "4P3wA8rnnHuHsyTxTsES54mmzqdPKv7QQqHNfrgdXAnQ";

    pub fn initialize(ctx: Context<InitializeToken>, bump: u8) -> ProgramResult {
        let vault = &mut ctx.accounts.vault;

        vault.bump = bump;
        vault.wallet = ctx.accounts.wallet.key();
        vault.initial_mint_amount = DEFAULT_MAX_SUPPLY;
        vault.is_initialized = true;
        vault.is_minted = false;
        vault.is_freezed = false;
        vault.authority = ctx.accounts.authority.key();

        Ok(())
    }

    // p.s: This doesn't close the mint account because cpi context fails somewhere
    pub fn reset(ctx: Context<Reset>) -> ProgramResult {
        let vault = ctx.accounts.vault.clone();
        let seed = &[&[TOKEN_PDA_SEED, bytemuck::bytes_of(&vault.bump)][..]];

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
        let vault = ctx.accounts.vault.clone();

        let seed = &[&[TOKEN_PDA_SEED, bytemuck::bytes_of(&vault.bump)][..]];
        let cpi_accounts = MintTo {
            to: ctx.accounts.wallet.to_account_info(),
            authority: vault.to_account_info(),
            mint: ctx.accounts.mint.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, seed);

        token::mint_to(cpi_ctx, vault.initial_mint_amount).unwrap();

        let vault = &mut ctx.accounts.vault;
        vault.is_minted = true;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeToken<'info> {
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [alaatoken::TOKEN_PDA_SEED],
        bump = bump,
        space = 8 + VaultAccount::LEN,
        constraint = vault.is_initialized == false @ ErrorCode::AlreadyInitialized
    )]
    vault: Account<'info, VaultAccount>, // the PDA, owner of everything
    #[account(
        init,
        payer = authority,
        mint::decimals = 0,
        mint::authority = vault,
    )]
    mint: Account<'info, Mint>, // the mint account (holds the logic of the token)
    #[account(
        init,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = vault
    )]
    wallet: Account<'info, TokenAccount>, // account that holds all tokens for the PDA
    #[account(
        mut,
        constraint = authority.key() == Pubkey::from_str(alaatoken::ROOT).unwrap() @ ErrorCode::NotRoot,
    )]
    authority: Signer<'info>, // the authority of the PDA
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
    associated_token_program: Program<'info, AssociatedToken>,
    rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Reset<'info> {
    #[account(
        mut,
        seeds = [alaatoken::TOKEN_PDA_SEED],
        bump = vault.bump,
        has_one = authority,
        close = authority
    )]
    vault: Account<'info, VaultAccount>,
    #[account(mut)]
    wallet: Account<'info, TokenAccount>,
    #[account(
        mut,
        owner = token_program.key()
    )]
    mint: Account<'info, Mint>,
    #[account(mut)]
    authority: Signer<'info>,
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitialMint<'info> {
    #[account(
        mut,
        seeds = [alaatoken::TOKEN_PDA_SEED],
        bump = vault.bump,
        has_one = authority,
        constraint = vault.is_minted == false @ ErrorCode::AlreadyMinted
    )]
    vault: Account<'info, VaultAccount>,
    #[account(
        mut,
        owner = token_program.key(),
        constraint = wallet.owner == vault.key() @ ErrorCode::NotWalletOwner,
    )]
    wallet: Account<'info, TokenAccount>,
    #[account(
        mut,
        owner = token_program.key()
    )]
    mint: Account<'info, Mint>,
    authority: Signer<'info>,
    token_program: Program<'info, Token>,
}
