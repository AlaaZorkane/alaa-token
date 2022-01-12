use anchor_lang::prelude::*;

#[account]
pub struct TokenVaultAccount {
    pub initial_mint_amount: u64,
    pub authority: Pubkey,
    pub bump: u8,
    pub is_initialized: bool,
    pub is_minted: bool,
    pub is_freezed: bool,
}

impl TokenVaultAccount {
    pub const LEN: usize = 8 + 32 + 1 + 1 + 1 + 1 + 128;
}