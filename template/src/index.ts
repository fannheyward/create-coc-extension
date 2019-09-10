import { commands, CompleteResult, ExtensionContext, sources, workspace } from 'coc.nvim';

export async function activate(context: ExtensionContext): Promise<void> {
  workspace.showMessage(`[title] works!`);

  context.subscriptions.push(
    commands.registerCommand('[title].Command', async () => {
      workspace.showMessage(`[title] Commands works!`);
    }),

    sources.createSource({
      name: '[title] completion source', // unique id
      shortcut: '[CS]', // [CS] is custom source
      priority: 1,
      triggerPatterns: [], // RegExp pattern
      doComplete: async () => {
        const items = await getItems();
        return items;
      }
    }),

    workspace.registerKeymap(
      ['n'],
      '[title]-keymap',
      async () => {
        workspace.showMessage(`registerKeymap`);
      },
      { sync: false }
    ),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        workspace.showMessage(`registerAutocmd on InsertLeave`);
      }
    })
  );
}

async function getItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        word: 'TestCompletionItem 1'
      },
      {
        word: 'TestCompletionItem 2'
      }
    ]
  };
}
