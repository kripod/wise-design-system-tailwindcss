import { Dialog, Listbox } from "@headlessui/react";

/** @satisfies {(keyof HTMLElementTagNameMap)[]} */
const resetHTMLElements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "address",
  "p",
  "hr",
  "pre",
  "blockquote",
  "ol",
  "ul",
  "menu",
  "dl",
  "dd",
  "figure",
  "a",
  "iframe",
  "table",
  "td",
  "th",
  "input",
  "button",
  "select",
  "textarea",
  "fieldset",
  "legend",
];

/** @type {[React.ComponentType, (typeof resetHTMLElements)[number]][]} */
const htmlElementByCustomComponent = [
  [Dialog.Title, "h2"],
  [Listbox.Options, "ul"],
  [Listbox.Button, "button"],
];

export const resetClassNameByElementType = new Map(
  [
    ...resetHTMLElements.map((element) => [element, element]),
    ...htmlElementByCustomComponent,
  ].map(([key, value]) => [key, `_${value}`]),
);
