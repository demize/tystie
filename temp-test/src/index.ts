import { TystieDriver } from "tystie-base";
import "tystie-sqlite3-wasm";

export const runMigration = (driver: TystieDriver) => {
    driver.addTable("test", "TEST");
}
