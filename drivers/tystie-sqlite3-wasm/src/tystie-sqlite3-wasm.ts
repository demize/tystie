import type { TystieDatatype, TystieDriver } from "tystie-base";
import { Database } from "node-sqlite3-wasm";

declare module "tystie-base" {
  export interface DatatypeMap {
    "TEST": "TEST"
  }
}

export class TystieSqlite3WasmDriver implements TystieDriver {
  $dbName: string | undefined;
  $db: Database | undefined;

  constructor(filename: string) {
    this.$dbName = filename;
  }

  addTable(tableName: string, type: TystieDatatype): void {
    throw new Error("Method not implemented.");
  }

  init() {
    if (this.$db !== undefined) {
      throw "Cannot re-initialize driver";
    }
    this.$db = new Database(this.$dbName);
  }
}
