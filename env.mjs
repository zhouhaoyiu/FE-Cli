import { writeFileSync } from "fs";

const environment = process.env.NODE_ENV || "development";

writeFileSync(".env", `NODE_ENV=${environment}`);
