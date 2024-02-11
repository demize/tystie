import { Database } from "node-sqlite3-wasm";
import { TystieBase } from "tystie-base";
import { TystieSqlite3WasmDriver } from "tystie-sqlite3-wasm";

const Tystie = new TystieBase(new TystieSqlite3WasmDriver("test.db"));
Tystie.RunMigrations();
