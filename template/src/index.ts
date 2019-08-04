import { ExtensionContext, workspace } from 'coc.nvim';

export async function activate(context: ExtensionContext): Promise<void> {
  workspace.showMessage(`[title] is works!`);
}
