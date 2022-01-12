pub mod errors;
pub mod state;

use anchor_lang::prelude::*;
use anchor_spl::token::{self, InitializeMint, Mint, MintTo, Token};

use errors::ErrorCode;
use state::TokenVaultAccount;

declare_id!("FWtd4pWuYbCTVVCJ8UjCBdfMYeueSQdgH4uNVx5o6DBZ");

#[program]
pub mod alaatoken {
    use super::*;

    pub const DEFAULT_MAX_SUPPLY: u64 = 100_000; // in SOL
    pub const TOKEN_PDA_SEED: &[u8] = b"ALAA_TOKEN_VAULT";

    pub fn initialize(ctx: Context<InitializeToken>, bump: u8) -> ProgramResult {
        let vault = ctx.accounts.vault.clone();

        if vault.is_initialized {
            return Err(ErrorCode::AlreadyInitialized.into());
        }

        token::initialize_mint(ctx.accounts.into(), 0, &vault.key(), Some(&vault.key())).unwrap();

        let vault = &mut ctx.accounts.vault;
        vault.bump = bump;
        vault.initial_mint_amount = DEFAULT_MAX_SUPPLY;
        vault.is_initialized = true;
        vault.is_minted = false;
        vault.is_freezed = false;
        vault.authority = *ctx.accounts.authority.key;

        Ok(())
    }

    pub fn initial_mint(ctx: Context<InitialMint>) -> ProgramResult {
        let vault = ctx.accounts.vault.clone();

        if !vault.is_initialized {
            return Err(ErrorCode::NotInitialized.into());
        }

        if vault.is_minted {
            return Err(ErrorCode::AlreadyMinted.into());
        }

        token::mint_to(ctx.accounts.into(), vault.initial_mint_amount).unwrap();

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
        space = 8 + TokenVaultAccount::LEN
    )]
    vault: Account<'info, TokenVaultAccount>,
    #[account(
        init,
        payer = authority,
        space = Mint::LEN,
        signer
    )]
    token: AccountInfo<'info>,
    #[account(mut)]
    authority: Signer<'info>,
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
    rent: Sysvar<'info, Rent>,
}

impl<'a, 'b, 'c, 'info> From<&mut InitializeToken<'info>>
    for CpiContext<'a, 'b, 'c, 'info, InitializeMint<'info>>
{
    fn from(
        accounts: &mut InitializeToken<'info>,
    ) -> CpiContext<'a, 'b, 'c, 'info, InitializeMint<'info>> {
        let cpi_accounts = InitializeMint {
            mint: accounts.token.to_account_info(),
            rent: accounts.rent.to_account_info(),
        };

        let cpi_program = accounts.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitialMint<'info> {
    #[account(
        seeds = [alaatoken::TOKEN_PDA_SEED],
        bump = bump,
        has_one = authority,
        mut
    )]
    vault: Account<'info, TokenVaultAccount>,
    authority: Signer<'info>,
    token_program: Program<'info, Token>,
}

impl<'a, 'b, 'c, 'info> From<&mut InitialMint<'info>>
    for CpiContext<'a, 'b, 'c, 'info, MintTo<'info>>
{
    fn from(accounts: &mut InitialMint<'info>) -> CpiContext<'a, 'b, 'c, 'info, MintTo<'info>> {
        let cpi_accounts = MintTo {
            to: accounts.vault.to_account_info(),
            authority: accounts.vault.to_account_info(),
            mint: accounts.vault.to_account_info(),
        };

        let cpi_program = accounts.token_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}
