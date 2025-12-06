// Dummy OEPs for local development (OEP_ENV=dev)
// These are markdown strings with frontmatter, parsed the same way as GitHub content

export const DUMMY_OEP_MARKDOWN = [
  `---
oep: 1
title: OEP Purpose and Guidelines
author: OSA Core Team <core@opensciencearchive.org>
status: Living
type: Meta
created: 2024-01-15
---

## Abstract

This OEP describes what an OEP is, how they work, and how they guide the development of the Open Science Archive protocol. It establishes the foundational governance framework for all protocol changes.

## Motivation

The Open Science Archive protocol requires a structured, transparent process for proposing, discussing, and implementing changes. Without such a process, protocol development risks becoming fragmented, inconsistent, or dominated by individual interests rather than community consensus.

OEPs provide this structure by:

- Creating a permanent record of design decisions and their rationale
- Enabling asynchronous, inclusive community participation
- Establishing clear criteria for proposal acceptance
- Maintaining protocol coherence across implementations

## Specification

### What is an OEP?

An OEP (OSA Enhancement Proposal) is a design document providing information to the OSA community, describing a new feature, process, or informational guideline for the protocol. Each OEP should provide a concise technical specification and a rationale for the proposed change.

OEPs are the primary mechanism for proposing major new features, collecting community input on issues, and documenting design decisions. The OEP author is responsible for building consensus within the community and documenting dissenting opinions.

### OEP Types

1. **Technical** — Describes changes to the protocol, APIs, data formats, or any change that affects interoperability between OSA implementations. Technical OEPs consist of a design document and a reference implementation.

2. **Informational** — Describes design issues, general guidelines, or provides information to the community. Informational OEPs do not necessarily represent community consensus and users are free to ignore them.

3. **Meta** — Describes a process surrounding OSA, or proposes changes to development processes, decision-making procedures, or governance. Meta OEPs require community consensus.

### OEP Workflow

1. **Draft** — The initial state for all new OEPs. The proposal is under active development and open for feedback. Draft OEPs may undergo significant changes.

2. **Review** — The OEP has been submitted for formal community review. A review period of at least 14 days is required before advancement. During this period, the community may raise objections or suggest modifications.

3. **Accepted** — The OEP has been approved by community consensus and is ready for implementation. For Technical OEPs, a reference implementation must be completed before final acceptance.

4. **Living** — A special status for OEPs that are continuously updated, such as this document. Living OEPs have no final state but require ongoing maintenance.

5. **Withdrawn** — The OEP has been withdrawn by its author or rejected by the community. Withdrawn OEPs remain in the repository for historical reference.

### OEP Format

Each OEP must include:

- **Preamble** — Metadata including OEP number, title, author(s), status, type, and creation date
- **Abstract** — A short (~200 word) description of the technical issue being addressed
- **Motivation** — The rationale for the OEP, explaining why the existing protocol is inadequate
- **Specification** — The technical specification, described in sufficient detail for implementation
- **Rationale** — The reasoning behind specific design decisions
- **Security Considerations** — Discussion of security implications (required for Technical OEPs)
- **Reference Implementation** — Link to reference implementation (required for Technical OEPs)

## Rationale

The OEP process is modeled after successful enhancement proposal systems in other projects (Python PEPs, Ethereum EIPs, Bitcoin BIPs). This approach has proven effective for:

- Maintaining high-quality technical documentation
- Enabling distributed, asynchronous collaboration
- Creating institutional memory for design decisions
- Balancing innovation with stability

The specific workflow states were chosen to provide clear milestones while remaining flexible enough to accommodate different types of proposals.

## Security Considerations

This OEP defines a governance process rather than technical changes, so direct security implications are limited. However, the process itself must be designed to resist:

- Capture by narrow interests
- Rushed adoption of insecure changes
- Exclusion of security-relevant feedback

The mandatory review period and security considerations section in Technical OEPs address these concerns.
`,

  `---
oep: 2
title: Archive Manifest Specification
author: Alice Chen <alice@example.org>, Bob Smith <bob@example.org>
status: Accepted
type: Technical
created: 2024-02-20
---

## Abstract

This OEP defines the structure and requirements for Archive Manifests — the core metadata documents that describe scientific archives in the OSA ecosystem. The manifest format provides a machine-readable, self-describing package that ensures archives can be discovered, verified, and reproduced across any implementation of the Open Science Archive protocol.

The Archive Manifest serves as the canonical source of truth for an archive's contents, metadata, and provenance. Every OSA-compliant archive must include a valid manifest file at its root, and all operations on archives — from storage to retrieval to verification — depend on the manifest's integrity. This specification describes the complete structure of manifest documents, the semantics of each field, validation requirements, and guidelines for implementation.

## Motivation

The challenge of scientific data archiving extends far beyond mere storage. While any organization can store files on disk or in cloud storage, transforming raw data into a proper scientific archive requires rich, standardized metadata that enables discovery, verification, and reproduction of results. The scientific community has long struggled with data that is technically preserved but practically unusable — files sitting on servers with no documentation, datasets with missing provenance information, and archives that cannot be verified against their original state.

Scientific data archives require comprehensive metadata to be useful. Without standardized metadata, archives cannot be properly indexed or discovered by other researchers who might benefit from the data. Search engines and data catalogs cannot effectively surface relevant datasets when metadata is inconsistent or missing. Data provenance and integrity cannot be verified, leaving researchers unable to confirm that the data they receive matches what was originally archived. Reproduction of results becomes difficult or impossible when essential context about experimental conditions, data collection methodology, or processing steps is lost. Long-term preservation is compromised when archives lack the self-describing properties needed to interpret data decades after its creation.

The problem is compounded by the fragmented landscape of existing metadata standards. Different scientific disciplines have developed their own conventions — from astronomy's FITS headers to genomics' various annotation formats to social science's DDI standard. While domain-specific metadata remains essential, the lack of a common envelope format makes it difficult to build general-purpose infrastructure for scientific data archiving. Researchers working across disciplines face the burden of learning multiple metadata systems, and institutions struggle to maintain archives spanning diverse domains.

A standardized manifest format addresses these challenges by providing a universal container for archive metadata. The manifest format ensures interoperability between different OSA implementations and provides a consistent way to describe archived scientific data regardless of domain or institution. By establishing clear requirements for essential metadata while remaining flexible enough to accommodate domain-specific extensions, the Archive Manifest specification enables the development of robust, interoperable archiving infrastructure.

The design of this specification draws on lessons from successful metadata standards including DataCite, schema.org, Dublin Core, and various domain-specific formats. Where possible, we align with existing conventions to minimize the learning curve for implementers and maximize compatibility with existing tools. However, we also address gaps in existing standards, particularly around cryptographic verification and content-addressed storage integration.

## Specification

### Overview of Manifest Architecture

The Archive Manifest is a JSON document that describes the complete contents and metadata of an OSA archive. The manifest serves multiple purposes: it provides human-readable documentation of the archive's contents, enables machine processing for indexing and discovery, supports cryptographic verification of archive integrity, and establishes provenance through author and relationship information.

Every manifest follows a consistent structure with clearly defined sections for identification, descriptive metadata, authorship, file listings, and relationships to other resources. This structure balances simplicity with expressiveness — simple archives can be described with minimal required fields, while complex archives can utilize the full range of optional metadata.

The manifest format is versioned to allow future evolution while maintaining backward compatibility. The current specification defines version 1.0 of the manifest format. Future versions will increment the version number and specify migration paths from earlier versions. Implementations must check the version field and handle manifests according to the appropriate version specification.

### Manifest Structure

The manifest is a JSON document with the following top-level structure. This example shows all supported fields; required fields are marked in the subsequent tables.

\`\`\`json
{
  "version": "1.0",
  "id": "osa:archive/example-dataset",
  "title": "Example Scientific Dataset",
  "description": "A comprehensive dataset measuring oceanic temperature variations across the Pacific basin, collected during the 2023-2024 research expedition aboard the R/V Discovery.",
  "created": "2024-02-20T12:00:00Z",
  "modified": "2024-02-20T12:00:00Z",
  "license": "CC-BY-4.0",
  "authors": [
    {
      "name": "Jane Researcher",
      "orcid": "0000-0001-2345-6789",
      "affiliation": "Example University"
    }
  ],
  "files": [
    {
      "path": "data/measurements.csv",
      "hash": "sha256:abc123def456...",
      "size": 1024000,
      "mediaType": "text/csv"
    }
  ]
}
\`\`\`

### Required Fields

The following fields must be present in every valid manifest. Implementations must reject manifests missing any required field.

| Field | Type | Description |
|-------|------|-------------|
| \`version\` | string | Manifest schema version (currently "1.0") |
| \`id\` | string | Unique archive identifier in OSA URI format |
| \`title\` | string | Human-readable title (max 256 characters) |
| \`created\` | datetime | ISO 8601 creation timestamp |
| \`authors\` | array | List of author objects (at least one required) |
| \`files\` | array | List of file objects (at least one required) |

### File Objects

Each file entry MUST include:

- \`path\` — Relative path within the archive (forward slashes, no leading slash)
- \`hash\` — Cryptographic hash in format \`algorithm:hexvalue\` (SHA-256 required)
- \`size\` — File size in bytes

### Validation Rules

1. All paths must be relative and use forward slashes
2. No two files may have the same path
3. Hash values must be lowercase hexadecimal
4. Timestamps must be valid ISO 8601 with timezone

## Security Considerations

Path validation is critical to prevent directory traversal attacks. Implementations must reject paths containing ".." components, paths beginning with "/" or "~", and paths containing null bytes.

## Reference Implementation

See \`@opensciencearchive/manifest\` package for the reference TypeScript implementation.
`,

  `---
oep: 3
title: Content Addressing Scheme
author: Carol Williams <carol@example.org>
status: Accepted
type: Technical
created: 2024-03-10
---

## Abstract

This OEP defines a content-addressing scheme for OSA archives, enabling decentralized storage and verification. Content addressing assigns identifiers based on cryptographic hashes of content, ensuring that addresses are deterministic, verifiable, and location-independent.

## Motivation

Traditional location-based addressing (URLs, file paths) has fundamental limitations for scientific archives:

- **Mutability** — Content at a URL can change without notice
- **Availability** — URLs become invalid when servers move or shut down
- **Duplication** — Identical content at different URLs appears as different resources
- **Trust** — Verifying content requires trusting the server

Content addressing solves these problems by deriving identifiers from the content itself:

- **Immutability** — Content cannot be modified without changing its address
- **Deduplication** — Identical content shares the same address globally
- **Verification** — Content can be verified against its address by anyone
- **Decentralization** — Content can be retrieved from any source that has it

## Specification

### Address Format

OSA content addresses follow this format:

\`\`\`
osa:<hash-algorithm>:<hash-value>
\`\`\`

Example addresses:

\`\`\`
osa:sha256:b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
osa:blake3:af1349b9f5f9a1a6a0404dea36dcc9499bcb25c9adc112b7cc9a93cae41f3262
\`\`\`

### Supported Algorithms

| Algorithm | Identifier | Output Size | Status |
|-----------|------------|-------------|--------|
| SHA-256 | \`sha256\` | 256 bits | Required |
| BLAKE3 | \`blake3\` | 256 bits | Optional |

**SHA-256** is the mandatory baseline algorithm. All implementations MUST support SHA-256.

**BLAKE3** is an optional high-performance alternative offering 10-15x faster hashing.

## Security Considerations

Implementations MUST verify content hashes before accepting content as valid. Accepting unverified content defeats the security properties of content addressing.
`,

  `---
oep: 4
title: Archive Versioning Protocol
author: David Lee <david@example.org>
status: Draft
type: Technical
created: 2024-04-05
---

## Abstract

This OEP defines how archives can be versioned over time while maintaining integrity and provenance. The versioning protocol enables archives to evolve — through corrections, additions, or retractions — while preserving complete history and ensuring reproducibility.

## Motivation

Scientific data is not static. Archives may need to be updated for many reasons:

- **Corrections** — Fixing errors in data or metadata
- **Additions** — Adding new measurements or supplementary materials
- **Retractions** — Removing data found to be invalid or fraudulent
- **Format updates** — Converting to new formats or standards

Without versioning, these changes create problems:

- Citations become invalid or ambiguous
- Reproducibility is compromised
- The scientific record becomes inconsistent
- Trust in archived data erodes

## Specification

### Version Identifiers

Each version is identified by appending a semantic version number to the archive ID:

\`\`\`
<archive-id>@<major>.<minor>.<patch>
\`\`\`

Examples:
\`\`\`
osa:sha256:abc123...@1.0.0
osa:archive/climate-data@2.1.0
\`\`\`

### Version Types

- **Major** (X.0.0) — Breaking changes that may affect reproducibility
- **Minor** (0.X.0) — Backwards-compatible additions
- **Patch** (0.0.X) — Backwards-compatible fixes

## Security Considerations

Version chains create a form of append-only log. Implementations should verify the chain is consistent with no gaps or forks.
`,

  `---
oep: 5
title: Peer Review Integration
author: Emma Wilson <emma@example.org>, Frank Garcia <frank@example.org>
status: Review
type: Technical
created: 2024-04-20
---

## Abstract

This OEP specifies how peer review records can be attached to and verified alongside archived scientific data. By integrating review attestations into the archive format, we enable transparent, machine-readable provenance of review status.

## Motivation

Peer review is fundamental to scientific credibility, yet review status is often:

- Opaque (readers cannot verify claims of review)
- Disconnected from data (review records stored separately)
- Non-portable (tied to specific journals or platforms)
- Lost over time (review records not archived)

By integrating review records into the OSA format, we enable:

- **Transparent provenance** — Anyone can verify review status
- **Cryptographic attestation** — Reviewers can sign their reviews
- **Machine-readable metadata** — Automated discovery of reviewed archives
- **Preservation** — Review records archived alongside data

## Specification

### Review Decisions

| Decision | Description |
|----------|-------------|
| \`accept\` | Archive meets quality standards without changes |
| \`accept-minor\` | Acceptable pending minor corrections |
| \`revise\` | Requires significant revision before acceptance |
| \`reject\` | Does not meet quality standards |

### Reviewer Identity

The protocol supports multiple identity modes:

1. **Anonymous** — Reviewer identity hidden, institution may be disclosed
2. **Pseudonymous** — Consistent pseudonym across reviews, verifiable via signature
3. **Identified** — Full identity disclosed, linked to ORCID or similar

## Privacy Considerations

The protocol is designed to support both open and blind review. Reviewer identities may be fully anonymous, and signatures enable verification without identity disclosure.
`,

  `---
oep: 6
title: Decentralized Storage Providers
author: Grace Kim <grace@example.org>
status: Draft
type: Technical
created: 2024-05-01
---

## Abstract

This OEP defines how storage providers can participate in the OSA network to host and serve archived data. The protocol enables a decentralized network of providers that collectively ensure data availability, redundancy, and censorship resistance.

## Motivation

Centralized storage creates single points of failure:

- **Availability** — Single provider outages affect all users
- **Durability** — Provider shutdown means data loss
- **Censorship** — Single point of control enables suppression
- **Cost** — Monopoly pricing without competition

A decentralized network of storage providers addresses these concerns through redundancy, geographic distribution, censorship resistance, and market efficiency.

## Specification

### Storage Protocol

Providers implement the OSA Storage API:

#### Store Content

\`\`\`
PUT /archive/<content-address>
Content-Type: application/octet-stream

<binary content>
\`\`\`

#### Retrieve Content

\`\`\`
GET /archive/<content-address>
\`\`\`

#### Check Availability

\`\`\`
HEAD /archive/<content-address>
\`\`\`

## Security Considerations

Clients MUST verify content hashes regardless of provider trust. The protocol's security relies on cryptographic verification, not provider reputation.
`,

  `---
oep: 7
title: Citation Format
author: Henry Zhang <henry@example.org>
status: Withdrawn
type: Informational
created: 2024-03-01
---

## Abstract

This OEP proposed a standardized citation format for OSA archives. After community discussion, this proposal has been withdrawn in favor of integration with existing citation standards.

## Status: Withdrawn

This proposal has been withdrawn. The OSA project will instead focus on seamless integration with established citation infrastructure (DataCite, DOI, ORCID) rather than creating a new citation format.

## Reason for Withdrawal

After extensive community discussion, the working group determined that:

1. **Existing standards are well-established** — DataCite and DOI have widespread adoption in scholarly communication.

2. **Integration is more valuable than innovation** — Researchers already know how to work with DOIs.

3. **Resolver infrastructure exists** — DOI resolvers are maintained by established organizations.

4. **Interoperability matters more** — The goal of OSA is to improve scientific data archiving, not to create new standards where adequate ones exist.

## Superseded By

Archives should obtain DOIs through established registrars (DataCite, Crossref) and include DOI metadata in their manifests.
`,
];

// Dummy PRs for local development
export const DUMMY_PRS = [
  {
    number: 8,
    title: 'OEP-0008: Archive Discovery Protocol',
    user: 'iris-chen',
    created_at: '2024-05-10T09:15:00Z',
    html_url: 'https://github.com/opensciencearchive/oeps/pull/8',
  },
  {
    number: 9,
    title: 'OEP-0009: Metadata Schema Extensions',
    user: 'jack-martinez',
    created_at: '2024-05-15T16:45:00Z',
    html_url: 'https://github.com/opensciencearchive/oeps/pull/9',
  },
  {
    number: 10,
    title: 'OEP-0010: Access Control Lists',
    user: 'karen-patel',
    created_at: '2024-05-20T11:30:00Z',
    html_url: 'https://github.com/opensciencearchive/oeps/pull/10',
  },
];
