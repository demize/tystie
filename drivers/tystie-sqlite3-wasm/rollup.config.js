// https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226?permalink_comment_id=4431424#gistcomment-4431424

import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

import packageJson from "./package.json" assert { type: "json" };

const name = packageJson.main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/tystie-sqlite3-wasm.ts",
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
