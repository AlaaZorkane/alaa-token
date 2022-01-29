//! Accounts structs for the alaa token.
use crate::*;

#[derive(Accounts)]
#[instruction(bump: u8, login: String)]
pub struct Register<'info> {
    #[account(
        init,
        seeds = [
            b"user".as_ref(),
            login.as_ref(),
            authority.key().as_ref(),
        ],
        bump = bump,
        payer = authority,
        space = UserAccount::space(&login),
    )]
    pub user: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
