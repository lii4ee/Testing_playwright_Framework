import ExcelJS from 'exceljs';

export interface TestRow {
  testCaseId: string;
  description: string;
  username: string;
  password: string;
  expectedResult: string;
  execute: string;    // "Y" or "N"
  actualResult?: string;
  status?: string;
}

export async function readTestData(
  filePath: string,
  sheetName: string
): Promise<TestRow[]> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);
  
  const ws = wb.getWorksheet(sheetName);
  if (!ws) throw new Error(`Sheet "${sheetName}" not found`);

  const headers: string[] = [];
  const rows: TestRow[] = [];

  ws.eachRow((row, rowNum) => {
    if (rowNum === 1) {
      row.eachCell(cell => headers.push(String(cell.value)));
      return;
    }
    const obj: any = {};
    row.eachCell((cell, colNum) => {
      obj[headers[colNum - 1]] = cell.value;
    });
    if (obj.execute === 'Y') rows.push(obj as TestRow);
  });

  return rows;
}

export async function writeResult(
  filePath: string,
  sheetName: string,
  testCaseId: string,
  status: 'PASS' | 'FAIL',
  actualResult: string
) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(filePath);
  const ws = wb.getWorksheet(sheetName)!;

  ws.eachRow((row, rowNum) => {
    if (rowNum === 1) return;
    if (String(row.getCell(1).value) === testCaseId) {
      row.getCell('actualResult').value = actualResult;
      row.getCell('status').value = status;
      row.getCell('status').font = {
        color: { argb: status === 'PASS' ? 'FF007B5E' : 'FFCC0000' }
      };
    }
  });

  await wb.xlsx.writeFile(filePath);
}