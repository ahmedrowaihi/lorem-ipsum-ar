import * as vscode from "vscode";
import { faker } from "@ahmedrowaihi/faker-ar/locale/ar";
import { inValidNumber, showInputBox } from "./utils";

type Count = string | undefined;

export function activate(context: vscode.ExtensionContext) {
  var commands = [] as vscode.Disposable[];
  var methods = {
    word: () => faker.lorem.word(),
    async words() {
      const count: Count = await showInputBox("كم كلمة؟");
      if (inValidNumber(count)) {
        return;
      }
      return faker.lorem.words(Number.parseInt(count as string) % 300);
    },
    text() {
      return faker.lorem.text();
    },
    slug() {
      return faker.lorem.slug();
    },
    sentence() {
      return faker.lorem.sentence();
    },
    async sentences() {
      const count: Count = await showInputBox("كم جملة؟");
      return faker.lorem.sentences(Number.parseInt(count as string) % 20);
    },
    async paragraphs() {
      const count: Count = await showInputBox("كم فقرة؟");
      return faker.lorem.paragraphs(Number.parseInt(count as string) % 20);
    },
    paragraph() {
      return faker.lorem.paragraph();
    },
    async lines() {
      const count: Count = await showInputBox("كم سطر؟");
      return faker.lorem.lines(Number.parseInt(count as string) % 20);
    },
    firstName() {
      return faker.person.firstName();
    },
    lastName() {
      return faker.person.lastName();
    },
    middleName() {
      return faker.person.middleName();
    },
    fullName() {
      return faker.person.fullName();
    },
    jobArea() {
      return faker.person.jobArea();
    },
    jobDescriptor() {
      return faker.person.jobDescriptor();
    },
    jobTitle() {
      return faker.person.jobTitle();
    },
    jobType() {
      return faker.person.jobType();
    },
  } as { [key: string]: () => string | Promise<string> };
  Object.keys(methods).forEach((key) => {
    commands.push(
      vscode.commands.registerCommand(`lorem-ipsum-ar.${key}`, async () => {
        insertText(await methods[key]());
      })
    );
  });

  commands.forEach(function (command) {
    context.subscriptions.push(command);
  });
}

export function deactivate() {}

function insertText(string: string) {
  var editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  editor.edit((edit) => {
    edit.delete(editor!.selection);
    edit.insert(editor!.selection.start, string);
  });
}
