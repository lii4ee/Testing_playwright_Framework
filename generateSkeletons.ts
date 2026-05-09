import data from './src/utils/excelUtil.cjs';
import * as fs from 'fs';
import * as path from 'path';

// Collect all unique keywords
const allKeywords = new Set<string>();
data.forEach((row: any) => {
  for (const key in row) {
    if (key.startsWith('Keyword_') && row[key]) {
      allKeywords.add(row[key]);
    }
  }
});

// Create page files
allKeywords.forEach((keyword: string) => {
  const pageFile = path.join('src', 'pages', `${keyword}.ts`);
  const content = `import { Page } from '@playwright/test';

export class ${keyword} {
  constructor(private page: Page) {}

  async execute(): Promise<void> {
    // TODO: Implement ${keyword} logic
  }
}
`;
  fs.writeFileSync(pageFile, content);
  console.log(`Created page: ${pageFile}`);
});

// Create test files
data.forEach((row: any) => {
  const tcId = row.TC_ID;
  const testFile = path.join('tests', `${tcId}.spec.ts`);
  let content = `import { test, expect } from '@playwright/test';\n`;

  // Import pages
  allKeywords.forEach((keyword: string) => {
    content += `import { ${keyword} } from '../src/pages/${keyword}';\n`;
  });

  content += `\ntest('${tcId}', async ({ page }) => {\n`;

  // For each keyword in the row, call the page
  for (let i = 1; i <= 40; i++) {
    const key = `Keyword_${i}`;
    if (row[key]) {
      content += `  const ${row[key].toLowerCase()} = new ${row[key]}(page);\n`;
      content += `  await ${row[key].toLowerCase()}.execute();\n`;
    }
  }

  content += `});\n`;

  fs.writeFileSync(testFile, content);
  console.log(`Created test: ${testFile}`);
});
