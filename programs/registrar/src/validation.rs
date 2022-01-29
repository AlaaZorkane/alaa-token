use crate::*;
use vipers::Validate;

impl<'info> Validate<'info> for Register<'info> {
    fn validate(&self) -> ProgramResult {
        Ok(())
    }
}
