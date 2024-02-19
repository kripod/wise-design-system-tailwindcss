import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";
import { TextAreaInput } from "./TextAreaInput";
import { TextInput } from "./TextInput";

const meta = {
  title: "components/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WrappedTextInput = {
  args: {
    label: "Label",
    hint: "Information message.",
    children: <TextInput />,
  },
} satisfies Story;

export const WrappedTextInputWithError = {
  args: {
    ...WrappedTextInput.args,
    error: "Error message.",
  },
} satisfies Story;

export const WrappedTextAreaInput = {
  args: {
    label: "Label",
    hint: "Information message.",
    children: <TextAreaInput />,
  },
} satisfies Story;

export const WrappedTextAreaInputWithError = {
  args: {
    ...WrappedTextAreaInput.args,
    error: "Error message.",
  },
} satisfies Story;
