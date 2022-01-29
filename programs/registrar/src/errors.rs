use anchor_lang::prelude::*;

#[error]
pub enum ErrorCode {
    #[msg("This account is already registered")]
    AlreadyRegistered,
}
