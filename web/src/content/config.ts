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
  type: 'technical' | 'process' | 'informational';
  authors: string;
  status: 'ideation' | 'discussion' | 'accepted' | 'living' | 'abandoned';
  labels: string[];
  discussion?: string;
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
      // Handle labels as comma-separated list
      if (key === 'labels') {
        result[key] = value
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter((s) => s.length > 0);
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

  // Validate required fields
  const requiredFields = ['title', 'type', 'status', 'authors', 'created'];
  const missingFields = requiredFields.filter(f => !frontmatter[f]);
  if (missingFields.length > 0) {
    console.error(`[OEP ${filename}] Missing required fields: ${missingFields.join(', ')}`);
    return null;
  }

  // Validate type
  const validTypes = ['technical', 'process', 'informational'];
  if (!validTypes.includes(frontmatter.type)) {
    console.error(`[OEP ${filename}] Invalid type "${frontmatter.type}"`);
    return null;
  }

  // Validate status
  const validStatuses = ['ideation', 'discussion', 'accepted', 'living', 'abandoned'];
  if (!validStatuses.includes(frontmatter.status)) {
    console.error(`[OEP ${filename}] Invalid status "${frontmatter.status}"`);
    return null;
  }

  return {
    id: `oep-${String(oepNumber).padStart(4, '0')}`,
    oep: oepNumber,
    title: frontmatter.title,
    type: frontmatter.type,
    authors: frontmatter.authors,
    status: frontmatter.status,
    labels: frontmatter.labels ?? [],
    discussion: frontmatter.discussion,
    created: new Date(frontmatter.created),
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
      type: z.enum(['technical', 'process', 'informational']),
      authors: z.string(),
      status: z.enum(['ideation', 'discussion', 'accepted', 'living', 'abandoned']),
      labels: z.array(z.string()),
      discussion: z.string().optional(),
      created: z.date(),
      body: z.string(),
    }),
  }),
};
