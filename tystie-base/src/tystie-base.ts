import { globSync } from "glob";
import importSync from "import-sync";

export interface DatatypeMap {
  NULL: "NULL";
  INTEGER: "INTEGER";
  FLOAT: "FLOAT";
  TEXT: "TEXT";
  BLOB: "BLOB";
}

export type TystieDatatype = DatatypeMap[keyof DatatypeMap];

export type TystieColumn = {
  name: string;
  type: TystieDatatype;
  length: number;
  notNull: boolean;
  unique: boolean;
  primaryKey: boolean;
};

/**
 * An interface that drivers for tystie must implement.
 *
 * This interface does not define a constructor, as different drivers may have
 * different requirements for construction. While initialization is done within
 * `init()`, configuration prior to initialization must be done in the
 * constructor.
 */
export interface TystieDriver {
  /**
   * Initializes the driver, using the configuration provided in the
   * constructor. This should create a database if necessary, and throw an
   * error if no database exists and creation of the database is impossible.
   *
   * Initialization of the driver cannot happen twice.
   *
   * This should not be called manually. It will be called automatically by
   * `TystieBase` when necessary.
   */
  init(): void;

  // table
  addTable(tableName: string, type: TystieDatatype): void;

  // column

  // indexes

  // foreign keys

  // insert rows

  // arbitrary SQL
}

export interface TystieMigrator {
  up(driver: TystieDriver): void;
  down(driver: TystieDriver): void;
  serial: string;
}

export class TystieBase {
  $driver: TystieDriver;

  public constructor(driver: TystieDriver) {
    this.$driver = driver;
    this.$driver.init();
  }

  public RunMigrations(folder: string = "migrations") {
    const res = globSync(process.cwd() + "/" + folder + "/{*.js,*.ts,*.mts}");
    const mods = res.map((file) => file.replace(process.cwd(), "."));
    for (const mod of mods) {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- these bad practices are a necessary part of loading migrations like this */
      const imp = importSync(mod, {
        basePath: process.cwd(),
      });
      if (imp === undefined || imp.default === undefined) {
        throw `Failed to import ${mod}`;
      }
      const migrator = imp.default as TystieMigrator;
      /* eslint-enable */

      // if (migrator.up === undefined || migrator.serial === undefined) {
      //   throw "Loaded a migrator with undefined up or serial";
      // }
      console.log(`Running migration ${migrator.serial}`);
      migrator.up(this.$driver);
    }
  }
}
