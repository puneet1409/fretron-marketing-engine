#!/usr/bin/env node
/**
 * Schema Validation Script
 *
 * Validates ABM data records against JSON Schema definitions.
 * Uses Ajv (Another JSON Schema Validator) for draft-07 compliance.
 */

import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ABM_DATA_DIR = path.resolve(__dirname, '..');
const SCHEMAS_DIR = path.join(ABM_DATA_DIR, 'schemas');
const RECORDS_DIR = path.join(ABM_DATA_DIR, 'records');

async function loadSchema(name) {
  const schemaPath = path.join(SCHEMAS_DIR, `${name}.schema.json`);
  const content = await readFile(schemaPath, 'utf-8');
  return JSON.parse(content);
}

async function loadRecords(name) {
  const recordsPath = path.join(RECORDS_DIR, `${name}.json`);
  const content = await readFile(recordsPath, 'utf-8');
  const data = JSON.parse(content);
  return data.records || data;
}

async function validateCollection(ajv, schemaName, recordsName) {
  console.log(`\nValidating ${recordsName}...`);

  try {
    const schema = await loadSchema(schemaName);
    const records = await loadRecords(recordsName);

    const validate = ajv.compile(schema);
    const errors = [];
    let validCount = 0;

    records.forEach((record, index) => {
      const valid = validate(record);
      if (valid) {
        validCount++;
      } else {
        errors.push({
          index,
          id: record.id,
          errors: validate.errors.map(e => ({
            path: e.instancePath,
            message: e.message,
            params: e.params
          }))
        });
      }
    });

    const totalCount = records.length;
    const errorCount = errors.length;
    const validPercent = ((validCount / totalCount) * 100).toFixed(1);

    console.log(`  Total: ${totalCount}`);
    console.log(`  Valid: ${validCount} (${validPercent}%)`);
    console.log(`  Errors: ${errorCount}`);

    if (errorCount > 0 && errorCount <= 5) {
      console.log('\n  Sample errors:');
      errors.slice(0, 5).forEach(e => {
        console.log(`    Record ${e.id}:`);
        e.errors.forEach(err => {
          console.log(`      ${err.path}: ${err.message}`);
        });
      });
    } else if (errorCount > 5) {
      console.log(`\n  First 3 errors:`);
      errors.slice(0, 3).forEach(e => {
        console.log(`    Record ${e.id}:`);
        e.errors.slice(0, 2).forEach(err => {
          console.log(`      ${err.path}: ${err.message}`);
        });
      });
    }

    return {
      name: recordsName,
      total: totalCount,
      valid: validCount,
      errors: errorCount,
      validPercent: parseFloat(validPercent),
      errorDetails: errors.slice(0, 10) // Keep first 10 for report
    };
  } catch (err) {
    console.log(`  Error: ${err.message}`);
    return {
      name: recordsName,
      total: 0,
      valid: 0,
      errors: 0,
      validPercent: 0,
      errorMessage: err.message
    };
  }
}

async function main() {
  console.log('='.repeat(50));
  console.log('ABM Data Schema Validation');
  console.log('='.repeat(50));

  // Initialize Ajv with draft-07 support
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false
  });
  addFormats(ajv);

  const results = [];

  // Validate each collection
  results.push(await validateCollection(ajv, 'account', 'accounts'));
  results.push(await validateCollection(ajv, 'contact', 'contacts'));
  results.push(await validateCollection(ajv, 'deal', 'deals'));

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Validation Summary');
  console.log('='.repeat(50));

  let totalRecords = 0;
  let totalValid = 0;
  let totalErrors = 0;

  results.forEach(r => {
    if (!r.errorMessage) {
      totalRecords += r.total;
      totalValid += r.valid;
      totalErrors += r.errors;
    }
    console.log(`\n${r.name}:`);
    console.log(`  ${r.valid}/${r.total} valid (${r.validPercent}%)`);
    if (r.errorMessage) {
      console.log(`  Error: ${r.errorMessage}`);
    }
  });

  const overallPercent = totalRecords > 0 ? ((totalValid / totalRecords) * 100).toFixed(1) : 0;

  console.log('\n' + '-'.repeat(50));
  console.log(`Overall: ${totalValid}/${totalRecords} valid (${overallPercent}%)`);
  console.log('-'.repeat(50));

  // Exit with error code if validation failed
  if (totalErrors > 0) {
    console.log('\n⚠️  Some records failed validation');
    process.exit(1);
  } else {
    console.log('\n✅ All records passed validation');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
