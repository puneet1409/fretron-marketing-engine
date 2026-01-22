import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const API_BASE = 'https://api.webflow.com/v2';
const SITE_ID = process.env.WEBFLOW_SITE_ID;
const TOKEN = process.env.WEBFLOW_API_TOKEN;

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

export async function listCollections() {
  const res = await fetch(`${API_BASE}/sites/${SITE_ID}/collections`, { headers });
  return res.json();
}

export async function getCollection(collectionId) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}`, { headers });
  return res.json();
}

export async function getCollectionFields(collectionId) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/fields`, { headers });
  return res.json();
}

export async function createCollection(displayName, singularName, slug) {
  const res = await fetch(`${API_BASE}/sites/${SITE_ID}/collections`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ displayName, singularName, slug }),
  });
  return res.json();
}

export async function createField(collectionId, field) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/fields`, {
    method: 'POST',
    headers,
    body: JSON.stringify(field),
  });
  return res.json();
}

export async function createItem(collectionId, item) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/items`, {
    method: 'POST',
    headers,
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function listItems(collectionId, limit = 100, offset = 0) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/items?limit=${limit}&offset=${offset}`, { headers });
  return res.json();
}

export async function publishItems(collectionId, itemIds) {
  const res = await fetch(`${API_BASE}/collections/${collectionId}/items/publish`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ itemIds }),
  });
  return res.json();
}

export { SITE_ID, TOKEN };
