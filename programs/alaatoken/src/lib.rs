use anchor_lang::prelude::*;

declare_id!("FWtd4pWuYbCTVVCJ8UjCBdfMYeueSQdgH4uNVx5o6DBZ");

#[program]
pub mod alaatoken {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, bump: u8) -> ProgramResult {
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String, bump: u8) -> ProgramResult {
        let vault = &mut ctx.accounts.vault;
        let len = data.len();

        if data.contains("alaa") {
            return Err(ErrorCode::NoAlaa.into());
        };

        if len > 16 {
            return Err(ErrorCode::TooLong.into());
        };

        vault.data = data;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        seeds = [user.key.as_ref()],
        bump = bump,
        payer = user,
        // header + borsch length + string
        space = 8 + 4 + 16
    )]
    vault: Account<'info, VaultAccount>,
    #[account(mut)]
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(data: String, bump: u8)]
pub struct Update<'info> {
    #[account(
        seeds = [user.key.as_ref()],
        bump = bump,
        mut,
    )]
    vault: Account<'info, VaultAccount>,
    #[account()]
    user: Signer<'info>,
}

#[account]
pub struct VaultAccount {
    data: String,
}

#[error]
pub enum ErrorCode {
    #[msg("No usage of the word alaa >:(")]
    NoAlaa,
    #[msg("Max 16 characters!")]
    TooLong,
    #[msg("Already initialized")]
    AlreadyInitialized,
}
