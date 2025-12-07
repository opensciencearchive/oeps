# OEPs — OSA Enhancement Proposals

Design documents for the [Open Science Archive](https://opensciencearchive.org) protocol.

## Structure

```
oeps/           # OEP documents (markdown)
web/            # Website (Astro)
```

## Writing an OEP

Use the helper script to create a new OEP:

```sh
./create-oep.sh <number> "<title>"

# Example
./create-oep.sh 5 "Decentralized Storage Protocol"
```

This creates `oeps/OEP-0005.md` with the standard template, your git author info, and today's date.

Alternatively, copy `template.md` manually and fill in the frontmatter:

```yaml
---
oep: XXXX
title: Your Proposal Title
status: draft
type: technical | process | informational
author: Your Name <email@example.com>
created: YYYY-MM-DD
---
```

## Development

Requires [just](https://github.com/casey/just) and [pnpm](https://pnpm.io).

```sh
just install   # Install dependencies
just dev       # Start dev server at localhost:4321
just build     # Build for production
```
