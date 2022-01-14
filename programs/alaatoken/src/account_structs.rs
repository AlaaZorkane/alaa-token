//! Accounts structs for the alaa token.
use crate::*;
use anchor_spl::associated_token::AssociatedToken;
use std::str::FromStr;

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Setup<'info> {
    #[account(
        init_if_needed,
        payer = authority,
        seeds = [alaatoken::TOKEN_PDA_SEED],
        bump = bump,
        space = VaultAccount::LEN,
        constraint = vault.is_setup == false @ ErrorCode::AlreadyInitialized
    )]
    pub vault: Account<'info, VaultAccount>, // the PDA, owner of everything
    #[account(
        init,
        payer = authority,
        mint::decimals = 0,
        mint::authority = vault,
    )]
    pub mint: Account<'info, Mint>, // the mint account (holds the logic of the token)
    #[account(
        init,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = vault
    )]
    pub wallet: Account<'info, TokenAccount>, // account that holds all tokens for the PDA
    #[account(
        mut,
        constraint = authority.key() == Pubkey::from_str(alaatoken::ROOT).unwrap() @ ErrorCode::NotRoot,
    )]
    pub authority: Signer<'info>, // the authority of the PDA
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
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
    pub vault: Account<'info, VaultAccount>,
    #[account(mut)]
    pub wallet: Account<'info, TokenAccount>,
    #[account(
        mut,
        owner = token_program.key()
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
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
    pub vault: Account<'info, VaultAccount>,
    #[account(
        mut,
        owner = token_program.key(),
        constraint = wallet.owner == vault.key() @ ErrorCode::NotWalletOwner,
    )]
    pub wallet: Account<'info, TokenAccount>,
    #[account(
        mut,
        owner = token_program.key()
    )]
    pub mint: Account<'info, Mint>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
