use crate::*;

#[account]
#[derive(Copy, Debug, Default)]
pub struct VaultAccount {
    pub initial_mint_amount: u64,
    pub authority: Pubkey,
    pub wallet: Pubkey,
    pub bump: u8,
    pub is_setup: bool,
    pub is_minted: bool,
    pub is_freezed: bool,
}

impl VaultAccount {
    // TODO: better precise calculations for the vault
    pub const LEN: usize = 8 + 8 + 32 + 32 + 1 + 1 + 1 + 1 + 128;
}

#[account]
#[derive(Debug, Default)]
pub struct UserAccount {
    /// Github login
    pub login: String,
    pub bump: u8,
    /// Wallet that owns the user account
    pub authority: Pubkey,
    /// Maybe for future airdrops?
    pub created_at: i64,
}

impl UserAccount {
    pub fn space(login: &str) -> usize {
        4 + login.as_bytes().len() + 4 + std::mem::size_of::<UserAccount>()
    }
}
