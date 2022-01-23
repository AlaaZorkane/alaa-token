use clap::{App, ErrorKind, IntoApp, Parser, Subcommand};
use std::path::Path;
use walkdir::{DirEntry, WalkDir};

pub struct Processor {
    pub app: App<'static>,
    pub cli: Cli,
}

/// Scripts to generate/parse IDL files
#[derive(Parser, Clone)]
#[clap(author, version, about, long_about = None)]
pub struct Cli {
    #[clap(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Clone)]
pub enum Commands {
    /// Parses all IDL files from the given programs directory
    /// [parse]
    #[clap()]
    Parse {
        /// The programs dirname, defaults to `programs/`
        #[clap(default_value = "programs/", short = 'i')]
        input: String,
        /// Output folder, default to `artifacts/idl/`
        #[clap(default_value = "artifacts/idl", short = 'o')]
        output: String,
    },
    /// Generates types for parsed IDL files. `<OUTPUT>/*.json`
    #[clap()]
    Generate {
        /// artifacts directory, default to `artifacts/idl`
        ///
        /// If no `dirname` is given, and default was not found, it will be created
        #[clap(default_value = "artifacts/idl", short = 'd')]
        dirname: String,
    },
}

impl Processor {
    pub fn new() -> Self {
        Processor {
            app: Cli::into_app_for_update(),
            cli: Cli::parse(),
        }
    }

    fn is_program_lib_file(walker: &DirEntry) -> bool {
        walker
            .file_name()
            .to_str()
            .map(|s| s.ends_with("lib.rs"))
            .unwrap_or(false)
    }

    pub fn generate_idl_types(&mut self, dirname: &String) {}

    pub fn parse_idl_files(&mut self, input: &String, output: &String) {
        let input_directory = Path::new(input);
        let output_directory = Path::new(output);

        if !input_directory.exists() {
            let msg = format!("Input directory [{input}] does not exist");

            self.app.error(ErrorKind::InvalidValue, msg).exit();
        }

        let input_walker = WalkDir::new(input_directory).max_depth(3).into_iter();

        let programs = input_walker.filter_entry(|e| Processor::is_program_lib_file(e));

        if programs.size_hint().0 == 0 {
            let msg = format!("No programs found in [{input}]");

            self.app.error(ErrorKind::InvalidValue, msg).exit();
        }

        for entry in programs {
            println!("{}", entry.unwrap().path().display());
        }
    }
}
