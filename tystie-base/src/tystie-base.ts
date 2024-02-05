export const hello = () => {
  console.log("Hello");
};

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

export class TystieBase {
  $driver: TystieDriver;

  public constructor(driver: TystieDriver) {
    this.$driver = driver;
    this.$driver.init();
  }
}
