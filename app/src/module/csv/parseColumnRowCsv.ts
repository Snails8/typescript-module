import { File } from "@google-cloud/storage";
import { Parser as CsvParser } from "csv-parse";
import { Readable } from "stream";

type ColumnRowMap<T> = Map<T, Map<T, T>>;

/**
 * 特殊な形式のCSVファイルを読み込み、列と行のマップを作成するクラス
 * 
 * 1列目かつ1行目はskipされる
 * 列：CSVファイルの1列目の値
 * 行：CSVファイルの2行目以降の値
 */
export class CSVDataParser<T> {
  private file: File;
  private numericMode: boolean;

  constructor(file: File, numericMode = false) {
    this.file = file;
    this.numericMode = numericMode;
  }

  async getColumnRowMap(): Promise<ColumnRowMap<T>> {
    return this.__parse();
  }

  private async __parse(): Promise<ColumnRowMap<T>> {
    const columnRowMap: ColumnRowMap<T> = new Map();

    const parser = new CsvParser({
      delimiter: ',',
      fromLine: 1,
      columns: true,
      skip_empty_lines: true,
    });

    return new Promise((resolve, reject) => {
      this.file.createReadStream()
        .pipe(parser)
        .on('headers', (headers: string[]) => {
          headers.forEach(header => {
            const key = this.numericMode ? parseFloat(header) as unknown as T : header as unknown as T;
            if (this.numericMode && isNaN(key as unknown as number)) {
              return;
            }
            columnRowMap.set(key, new Map());
          });
        })
        .on('data', (data: { [key: string]: string }) => {
          const firstKey = Object.keys(data)[0];
          if (!firstKey) return;

          const firstValue = data[firstKey];
          if (!firstValue) return;

          const mainKey = this.numericMode ? parseFloat(firstValue) as unknown as T : firstValue as unknown as T;
          if (this.numericMode && isNaN(mainKey as unknown as number)) return;

          Object.entries(data).forEach(([key, value], index) => {
            if (index > 0) {
              const columnKey = this.numericMode ? parseFloat(key) as unknown as T : key as unknown as T;
              const columnValue = this.numericMode ? parseFloat(value) as unknown as T : value as unknown as T;

              if (this.numericMode && (isNaN(columnKey as unknown as number) || isNaN(columnValue as unknown as number))) return;
              if (!columnRowMap.has(columnKey)) {
                columnRowMap.set(columnKey, new Map());
              }
              columnRowMap.get(columnKey)?.set(mainKey, columnValue);
            }
          });
        })
        .on('end', () => {
          resolve(columnRowMap);
        })
        .on('error', (err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}
