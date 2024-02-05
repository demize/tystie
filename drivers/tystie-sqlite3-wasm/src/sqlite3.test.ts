import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as fs from "fs";
import * as os from "os";
import path from "path";
import { TystieBase } from "tystie-base";
import { TystieSqlite3WasmDriver } from "./tystie-sqlite3-wasm.js";

let tmpDir: string | undefined;

describe("Build new DB from scratch", () => {
  let driver: TystieSqlite3WasmDriver;
  let Tystie: TystieBase;
  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tystie-sqlite3-test-"));
    console.log(`Test output will be stored in ${tmpDir}`);
  });

  it("should initialize tystie", () => {
    if (tmpDir === undefined) {
      throw "Somehow, tmpDir is undefined";
    }
    driver = new TystieSqlite3WasmDriver(`${tmpDir}/scratch.db`);
    Tystie = new TystieBase(driver);
  });

  it("should refuse to double-init the driver", () => {
    expect(() => driver.init()).toThrow("Cannot re-initialize driver");
  });

  it("should create a new table", () => {
    driver.addTable("test", "TEST");
  });

  afterAll(() => {
    if (tmpDir !== undefined) {
      console.log(`Removing directory ${tmpDir}`);
      //fs.rmdirSync(tmpDir);
    }
  });
});

describe("Build new DB in memory", () => {
  it("should initialize tystie in-memory", () => {
    const driver = new TystieSqlite3WasmDriver(":memory:");
    new TystieBase(driver); // No assignment, we're just initializing in this test
  });
});
