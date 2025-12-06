# OEPs repository commands

# Default: list available commands
default:
    @just --list

# Run a web command (e.g., just web dev, just web build)
[working-directory: 'web']
web *args:
    pnpm {{args}}

# Shortcuts for common web commands
[working-directory: 'web']
dev:
    pnpm dev

[working-directory: 'web']
build:
    pnpm build

[working-directory: 'web']
preview:
    pnpm preview

[working-directory: 'web']
install:
    pnpm install
