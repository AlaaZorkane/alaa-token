use anchor_lang::prelude::*;
use vipers::Validate;

mod account_structs;
mod errors;
mod state;
mod validation;

use account_structs::*;
use state::*;

declare_id!("BFq6fMJ4DuGriFeQs2uBPcYEzntU6NwVitD3LhujhRtv");

#[program]
pub mod registrar {
    use super::*;

    /// Registers a new login and creates an account for it.
    #[access_control(ctx.accounts.validate())]
    pub fn register(ctx: Context<Register>, bump: u8, login: String) -> ProgramResult {
        let user = &mut ctx.accounts.user;

        user.login = login;
        user.bump = bump;
        user.authority = ctx.accounts.authority.key();
        user.created_at = Clock::get()?.unix_timestamp;

        Ok(())
    }
}
