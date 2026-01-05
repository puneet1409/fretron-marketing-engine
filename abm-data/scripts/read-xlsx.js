import XLSX from 'xlsx';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node read-xlsx.js <path-to-xlsx>');
  process.exit(1);
}

try {
  const workbook = XLSX.readFile(filePath);
  const result = {};

  console.log(`\n📊 File: ${basename(filePath)}`);
  console.log(`Sheets: ${workbook.SheetNames.join(', ')}\n`);

  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Filter out empty rows
    const filteredData = jsonData.filter(row => row.some(cell => cell !== undefined && cell !== ''));

    console.log(`\n--- Sheet: ${sheetName} (${filteredData.length} rows) ---\n`);

    // Print first 30 rows
    filteredData.slice(0, 30).forEach((row, idx) => {
      const rowStr = row.map(cell => {
        if (cell === undefined || cell === null) return '';
        const str = String(cell);
        return str.length > 40 ? str.substring(0, 37) + '...' : str;
      }).join(' | ');
      console.log(`${idx + 1}: ${rowStr}`);
    });

    if (filteredData.length > 30) {
      console.log(`\n... and ${filteredData.length - 30} more rows`);
    }

    result[sheetName] = filteredData;
  });

} catch (error) {
  console.error('Error reading file:', error.message);
  process.exit(1);
}
