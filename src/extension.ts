import * as vscode from 'vscode';
import path from 'node:path';
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('open-new-terminal-of-current-file.open-new-terminal-of-current-file', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;

		if (editor && editor.document.uri.scheme === 'file') {
			const targetDir = path.dirname(editor.document.uri.fsPath);
			openTerminal(targetDir);
			return;
		} else {
			vscode.window.showWarningMessage('No file or workspace folder found.');
		}
	});

	context.subscriptions.push(disposable);
}

function openTerminal(cwd: string) {
	const folderName = path.basename(cwd);
	const terminal = vscode.window.createTerminal({
		name: folderName,
		cwd: cwd,
	});
	terminal.show();
}

export function deactivate() { }
