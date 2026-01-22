/**
 * Push test batch of 3 levers to verify Webflow integration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const API_BASE = 'https://api.webflow.com/v2';
const TOKEN = process.env.WEBFLOW_API_TOKEN;
const LEVERS_COLLECTION_ID = '6971c02e212e47f15162b2ab';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createItem(collectionId, fieldData) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/items`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ fieldData, isArchived: false, isDraft: false }),
  });
  return res.json();
}

async function main() {
  const contentPath = path.join(__dirname, '../generated/lever-content.json');
  const levers = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

  // Take first 3 for testing
  const testLevers = levers.slice(0, 3);
  console.log(`Testing with ${testLevers.length} levers...`);

  for (const lever of testLevers) {
    console.log(`\nCreating: ${lever.name}`);
    console.log(`  Slug: ${lever.slug}`);

    const fieldData = {
      name: lever.name,
      slug: lever.slug,
      theme: lever.theme,
      description: lever.description,
      'main-content': lever.mainContent,
      industries: lever.industries,
      'impact-range': lever.impactRange,
      'typical-roi': lever.typicalRoi,
      'seo-title': lever.seoTitle,
      'seo-description': lever.seoDescription,
    };

    const result = await createItem(LEVERS_COLLECTION_ID, fieldData);
    console.log('Result:', JSON.stringify(result, null, 2));

    await sleep(1200);
  }
}

main().catch(console.error);
