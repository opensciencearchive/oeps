import { defineCollection, z } from 'astro:content';
import { Octokit } from '@octokit/rest';
import { DUMMY_OEP_MARKDOWN } from './dummy-oeps';

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN,
});

const OWNER = 'opensciencearchive';
const REPO = 'oeps';

// Check if we're in dev mode (OEP_ENV=dev)
const isDevMode = import.meta.env.OEP_ENV === 'dev';

// Entry type for OEPs
type OEPEntry = {
  id: string;
  oep: number;
  title: string;
  author: string; // "First Last <email>, First Last <email>"
  status: 'Draft' | 'Review' | 'Accepted' | 'Withdrawn' | 'Living';
  type: 'Meta' | 'Technical' | 'Informational';
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
    : parseInt(filename.match(/oep-(\d+)/)?.[1] || '0', 10);

  return {
    id: `oep-${String(oepNumber).padStart(4, '0')}`,
    oep: oepNumber,
    title: frontmatter.title ?? `OEP-${oepNumber}`,
    author: frontmatter.author ?? 'Unknown',
    status: frontmatter.status ?? 'Draft',
    type: frontmatter.type ?? 'Technical',
    created: frontmatter.created ? new Date(frontmatter.created) : new Date(),
    body: body.trim(),
  };
}

// Load dummy OEPs from markdown strings
function loadDummyOEPs(): OEPEntry[] {
  console.log('[OEP Loader] Using dummy data (OEP_ENV=dev)');

  return DUMMY_OEP_MARKDOWN.map((markdown, index) => {
    const entry = parseMarkdownToEntry(markdown, `oep-${index + 1}.md`);
    if (!entry) {
      throw new Error(`Failed to parse dummy OEP at index ${index}`);
    }
    return entry;
  });
}

// Astro 5.x inline loader - async function that returns array of entries
async function githubLoader(): Promise<OEPEntry[]> {
  // Use dummy data in dev mode
  if (isDevMode) {
    return loadDummyOEPs();
  }

  try {
    console.log('[OEP Loader] Fetching from GitHub...');

    // Get list of files from the repo root
    const { data: contents } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: '',
    });

    if (!Array.isArray(contents)) {
      console.log('[OEP Loader] No OEPs found in repo, using dummy data');
      return loadDummyOEPs();
    }

    // Filter for OEP markdown files (e.g., oep-0001.md)
    const oepFiles = contents.filter(
      (file) => file.type === 'file' && /^oep-\d+\.md$/.test(file.name)
    );

    if (oepFiles.length === 0) {
      console.log('[OEP Loader] No OEP files found, using dummy data');
      return loadDummyOEPs();
    }

    const entries: OEPEntry[] = [];

    for (const file of oepFiles) {
      // Fetch raw content
      const { data: fileContent } = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: file.path,
      });

      if ('content' in fileContent && fileContent.content) {
        const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');
        const entry = parseMarkdownToEntry(content, file.name);

        if (entry) {
          entries.push(entry);
        }
      }
    }

    if (entries.length === 0) {
      console.log('[OEP Loader] No valid OEPs parsed, using dummy data');
      return loadDummyOEPs();
    }

    console.log(`[OEP Loader] Loaded ${entries.length} OEPs from GitHub`);
    return entries;
  } catch (error) {
    console.log('[OEP Loader] Error fetching OEPs from GitHub, using dummy data:', error);
    return loadDummyOEPs();
  }
}

export const collections = {
  oeps: defineCollection({
    loader: githubLoader,
    schema: z.object({
      oep: z.number(),
      title: z.string(),
      author: z.string(),
      status: z.enum(['Draft', 'Review', 'Accepted', 'Withdrawn', 'Living']),
      type: z.enum(['Meta', 'Technical', 'Informational']),
      created: z.date(),
      body: z.string(),
    }),
  }),
};
