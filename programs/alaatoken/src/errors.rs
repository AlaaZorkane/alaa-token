use anchor_lang::prelude::*;

#[error]
pub enum ErrorCode {
    #[msg("No usage of the word alaa >:(")]
    NoAlaa,
    #[msg("Max 16 characters!")]
    TooLong,
    #[msg("Token already initialized!")]
    AlreadyInitialized,
    #[msg("Max supply already minted.")]
    AlreadyMinted,
    #[msg("Token not initialized.")]
    NotInitialized,
    #[msg("Invalid root key!")]
    NotRoot,
    #[msg("Invalid PDA wallet owner!")]
    NotWalletOwner,
}
