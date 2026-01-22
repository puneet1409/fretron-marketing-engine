/**
 * Push generated lever content to Webflow CMS
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

async function publishItems(collectionId, itemIds) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/items/publish`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ itemIds }),
  });
  return res.json();
}

async function main() {
  // Read generated content
  const contentPath = path.join(__dirname, '../generated/lever-content.json');

  if (!fs.existsSync(contentPath)) {
    console.log('No generated content found. Running generator first...');
    const generate = await import('./generate-lever-content.js');
    await generate.default();
  }

  const levers = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  console.log(`Pushing ${levers.length} levers to Webflow...`);

  const createdItems = [];
  const errors = [];

  for (let i = 0; i < levers.length; i++) {
    const lever = levers[i];
    console.log(`[${i + 1}/${levers.length}] Creating: ${lever.name}`);

    try {
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

      if (result.id) {
        createdItems.push(result.id);
        console.log(`  ✓ Created: ${result.id}`);
      } else {
        console.error(`  ✗ Error:`, result);
        errors.push({ lever: lever.name, error: result });
      }

      // Rate limiting - Webflow allows ~60 requests/min
      await sleep(1100);
    } catch (err) {
      console.error(`  ✗ Exception:`, err.message);
      errors.push({ lever: lever.name, error: err.message });
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Created: ${createdItems.length}/${levers.length}`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  - ${e.lever}: ${JSON.stringify(e.error)}`));
  }

  // Publish all created items
  if (createdItems.length > 0) {
    console.log('\nPublishing items...');

    // Publish in batches of 100
    for (let i = 0; i < createdItems.length; i += 100) {
      const batch = createdItems.slice(i, i + 100);
      const publishResult = await publishItems(LEVERS_COLLECTION_ID, batch);
      console.log(`Published batch ${Math.floor(i / 100) + 1}:`, publishResult);
      await sleep(1100);
    }
  }

  // Save results
  const resultsPath = path.join(__dirname, '../generated/push-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    created: createdItems.length,
    errors: errors,
    itemIds: createdItems
  }, null, 2));

  console.log(`\nResults saved to: ${resultsPath}`);
}

main().catch(console.error);
