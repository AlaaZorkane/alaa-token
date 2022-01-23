use idl_generator::{Commands, Processor};

fn main() {
    let mut processor = Processor::new();
    let cli = processor.cli.clone();

    match &cli.command {
        Commands::Generate { dirname } => processor.generate_idl_types(dirname),
        Commands::Parse { input, output } => processor.parse_idl_files(input, output),
    }
}
