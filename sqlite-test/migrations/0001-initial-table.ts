import { TystieDriver, TystieMigrator } from "tystie-base";

export default new class implements TystieMigrator {
    serial: string = "0001";
    up(driver: TystieDriver): void {
        throw new Error("Method not implemented.");
    }

    down(driver: TystieDriver): void {
        throw new Error("Method not implemented.");
    }

}();
