import fs from "fs";
import * as esbuild from 'esbuild';

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const data = loadJSON("package.json");

const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  mainFields: ['module', 'main'],
  external: ['coc.nvim'],
  platform: 'node',
  target: 'node18',
  outfile: data.main,
};

if (process.argv.length > 2 && process.argv[2] === '--watch') {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('watching...');
} else {
  const result = await esbuild.build(options);
  if (result.errors.length) {
    console.error(result.errors);
  }
}
