import { commands, CompleteResult, ExtensionContext, listManager, sources, window, workspace } from 'coc.nvim';
import DemoList from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  window.showInformationMessage('[title] works!');

  context.subscriptions.push(
    commands.registerCommand('[title].Command', async () => {
      window.showInformationMessage('[title] Commands works!');
    }),

    listManager.registerList(new DemoList()),

    sources.createSource({
      name: '[title] completion source', // unique id
      doComplete: async () => {
        const items = await getCompletionItems();
        return items;
      },
    }),

    workspace.registerKeymap(
      ['n'],
      '[keymap-title]-keymap',
      async () => {
        window.showInformationMessage('registerKeymap');
      },
      { sync: false }
    ),

    workspace.registerAutocmd({
      event: 'InsertLeave',
      request: true,
      callback: () => {
        window.showInformationMessage('registerAutocmd on InsertLeave');
      },
    })
  );
}

async function getCompletionItems(): Promise<CompleteResult> {
  return {
    items: [
      {
        word: 'TestCompletionItem 1',
        menu: '[[title]]',
      },
      {
        word: 'TestCompletionItem 2',
        menu: '[[title]]',
      },
    ],
  };
}
