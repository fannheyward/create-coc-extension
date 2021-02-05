/* eslint-disable @typescript-eslint/no-var-requires */
async function start() {
  await require('esbuild').build({
    entryPoints: ['src/index.ts'],
    banner: '#!/usr/bin/env node',
    bundle: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development',
    mainFields: ['module', 'main'],
    tsconfig: 'tsconfig.json',
    external: [],
    platform: 'node',
    target: 'node10.12',
    outfile: 'bin/cli.js',
  });
}

start().catch((e) => {
  console.error(e);
});
