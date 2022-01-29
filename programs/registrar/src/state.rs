use crate::*;

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
