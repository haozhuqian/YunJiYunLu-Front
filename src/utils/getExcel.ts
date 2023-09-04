import { Workbook, type Column } from 'exceljs';
export default async (
  fileName: string,
  keys: string[],
  tHead: { [key in (typeof keys)[number]]: string },
  rows: { [key in (typeof keys)[number]]: any }[],
) => {
  const workbook = new Workbook();
  workbook.creator = '云冀云麓';
  workbook.lastModifiedBy = '云冀云麓';
  const now = new Date();
  workbook.created = now;
  workbook.modified = now;
  workbook.lastPrinted = now;
  const sheet = workbook.addWorksheet(fileName);
  const head: Array<Partial<Column>> = [];
  for (const key of keys) {
    head.push({ header: tHead[key], key });
  }
  sheet.columns = head;
  sheet.addRows(rows);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.ms-excel; charset=uft-8', // 前后端一定要统一utf-8编码，否则会是乱码
  });
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `${fileName}.xlsx`; // 如果不加后缀。保存的文件就会异常或者乱码。一定要写文件后缀类型, 具体文件类型根据自己的业务需要
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};
