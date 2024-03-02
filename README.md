# create-coc-extension

Create a coc extension quickly 🚀

## Usage

### npx

```sh
npx create-coc-extension [extension-name]
# or
npm exec create-coc-extension [extension-name]
cd [extension-name]
npm install
npm run build
```

### npm

```sh
npm create coc-extension [extension-name]
# or
npm init coc-extension [extension-name]
cd [extension-name]
npm install
npm run build
```

### yarn

```sh
yarn create coc-extension [extension-name]
cd [extension-name]
yarn install
yarn run build
```

### bun

```sh
bun create coc-extension [extension-name]
cd [extension-name]
bun install
bun run build
```

## Example

```sh
cd ~/src
npx create-coc-extension coc-test
? project title: coc-test
? project description: coc-test extension
? author full name: Heyward Fann
? author email address: fannheyward@gmail.com

coc-test is created.

  cd /Users/fannheyward/src/coc-test && npm i

then "set runtimepath^=/Users/fannheyward/src/coc-test" in vimrc/init.vim, and you will see "[coc.nvim] coc-test works!" notification.
```

1. `:CocCommand coc-test.Command` for command
2. `coc-test.enabled` for configuration
3. `TestCompletionItem` for completion

## LICENSE

MIT
