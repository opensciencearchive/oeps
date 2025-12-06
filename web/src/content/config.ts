import { defineCollection, z } from 'astro:content';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Path to OEPs folder (relative to web/ directory)
const OEPS_DIR = join(process.cwd(), '..', 'oeps');

// Entry type for OEPs
type OEPEntry = {
  id: string;
  oep: number;
  title: string;
  author: string;
  status: 'draft' | 'review' | 'accepted' | 'withdrawn' | 'living';
  type: 'process' | 'technical' | 'informational';
  created: Date;
  body: string;
};

// Simple frontmatter parser
function parseFrontmatter(str: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = str.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays (simple case)
      if (value.startsWith('[') && value.endsWith(']')) {
        result[key] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
      } else {
        result[key] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  }

  return result;
}

// Parse markdown content (with frontmatter) into an OEP entry
function parseMarkdownToEntry(content: string, filename: string): OEPEntry | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    return null;
  }

  const [, frontmatterStr, body] = frontmatterMatch;
  const frontmatter = parseFrontmatter(frontmatterStr);

  // Extract OEP number from filename or frontmatter
  const oepNumber = frontmatter.oep
    ? parseInt(frontmatter.oep, 10)
    : parseInt(filename.match(/oep-(\d+)/i)?.[1] || '0', 10);

  return {
    id: `oep-${String(oepNumber).padStart(4, '0')}`,
    oep: oepNumber,
    title: frontmatter.title ?? `OEP-${oepNumber}`,
    author: frontmatter.author ?? 'Unknown',
    status: frontmatter.status ?? 'draft',
    type: frontmatter.type ?? 'technical',
    created: frontmatter.created ? new Date(frontmatter.created) : new Date(),
    body: body.trim(),
  };
}

// Load OEPs from local filesystem
async function loadOEPs(): Promise<OEPEntry[]> {
  try {
    console.log(`[OEP Loader] Reading from ${OEPS_DIR}`);

    const files = await readdir(OEPS_DIR);
    const oepFiles = files.filter((f) => /^oep-\d+\.md$/i.test(f));

    if (oepFiles.length === 0) {
      console.log('[OEP Loader] No OEP files found');
      return [];
    }

    const entries: OEPEntry[] = [];

    for (const filename of oepFiles) {
      const filepath = join(OEPS_DIR, filename);
      const content = await readFile(filepath, 'utf-8');
      const entry = parseMarkdownToEntry(content, filename);

      if (entry) {
        entries.push(entry);
      }
    }

    console.log(`[OEP Loader] Loaded ${entries.length} OEPs`);
    return entries;
  } catch (error) {
    console.log('[OEP Loader] Error reading OEPs:', error);
    return [];
  }
}

export const collections = {
  oeps: defineCollection({
    loader: loadOEPs,
    schema: z.object({
      oep: z.number(),
      title: z.string(),
      author: z.string(),
      status: z.enum(['draft', 'review', 'accepted', 'withdrawn', 'living']),
      type: z.enum(['process', 'technical', 'informational']),
      created: z.date(),
      body: z.string(),
    }),
  }),
};
