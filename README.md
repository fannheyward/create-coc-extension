# create-coc-extension

Create a coc extension quickly 🚀

## Usage

### yarn

```sh
yarn create coc-extension [extension-name]
```

### npx

```sh
npx create-coc-extension [extension-name]
```

### npm

```sh
npm init coc-extension [extension-name]
```

then cd to your extension root and `yarn`.

- `yarn clean`
- `yarn build`
- `yarn` to clean & build

## Example

```sh
cd ~/src
yarn create coc-extension coc-test
? project title: coc-test
? project description: coc-test extension
? author full name: Heyward Fann
? author email address: fannheyward@gmail.com

coc-test is created.

  cd /Users/fannheyward/src/coc-test && yarn

then "set runtimepath^=/Users/fannheyward/src/coc-test" in vimrc/init.vim, and you will see "[coc.nvim] coc-test works!" in vim messages.
```

1. `:CocCommand coc-test.Command` for command
2. `coc-test.enabled` for configuration
3. `TestCompletionItem` for completion

## LICENSE

MIT
