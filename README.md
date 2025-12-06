# OEPs — OSA Enhancement Proposals

Design documents for the [Open Science Archive](https://opensciencearchive.org) protocol.

## Structure

```
oeps/           # OEP documents (markdown)
web/            # Website (Astro)
```

## Writing an OEP

Create a new file in `oeps/` named `OEP-XXXX.md` with frontmatter:

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

See [OEP-0001](oeps/OEP-0001.md) for the full process and template.

## Development

Requires [just](https://github.com/casey/just) and [pnpm](https://pnpm.io).

```sh
just install   # Install dependencies
just dev       # Start dev server at localhost:4321
just build     # Build for production
```
