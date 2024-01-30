import { TystieDriver } from "tystie-base";

export class TystieSqlite3WasmDriver implements TystieDriver {
  init = () => {
    return "World";
  };
}
