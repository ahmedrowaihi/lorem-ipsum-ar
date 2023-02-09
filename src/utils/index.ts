import * as vscode from "vscode";
export const inValidNumber = (count: any) =>
  !count || isNaN(Number.parseInt(count)) || Number.parseInt(count) <= 0;

export const showInputBox = (placeHolder: string) =>
  vscode.window.showInputBox({ placeHolder });

export default {
  inValidNumber,
  showInputBox,
};
