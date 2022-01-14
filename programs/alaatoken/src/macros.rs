//! Macros

/// Generates the signer seeds for a the vault PDA.
#[macro_export]
macro_rules! vault_signature {
    ($vault: expr) => {
        &[&[TOKEN_PDA_SEED, bytemuck::bytes_of(&$vault.bump)][..]]
    };
}
