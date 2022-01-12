use anchor_lang::prelude::*;

#[error]
pub enum ErrorCode {
    #[msg("No usage of the word alaa >:(")]
    NoAlaa,
    #[msg("Max 16 characters!")]
    TooLong,
    #[msg("Token initial mint was already initialized!")]
    AlreadyInitialized,
    #[msg("Max supply already minted.")]
    AlreadyMinted,
    #[msg("Token not initialized.")]
    NotInitialized,
}
