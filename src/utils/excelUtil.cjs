const XLSX = require('xlsx');

// Reading from file path
const workbook = XLSX.readFile('test-data/DataDrivenExcel.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

module.exports = data;
