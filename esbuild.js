/* eslint-disable @typescript-eslint/no-var-requires */
async function start() {
  await require('esbuild').build({
    entryPoints: ['src/index.ts'],
    banner: { js: '#!/usr/bin/env node' },
    bundle: true,
    minify: true,
    sourcemap: false,
    mainFields: ['module', 'main'],
    tsconfig: 'tsconfig.json',
    external: [],
    platform: 'node',
    target: 'node18',
    outfile: 'bin/cli.js',
  });
}

start().catch((e) => {
  console.error(e);
});
