import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { HintPopover } from "../HintPopover";
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

export const WrappedTextInputWithButtonInLabel: Story = {
  args: {
    ...WrappedTextInput.args,
    label: (
      <HintPopover label="Label">
        Further information explained in detail.
      </HintPopover>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "avoids triggering button within label inadvertently",
      async () => {
        const onClick = fn();

        const button = canvas.getByRole("button");
        button.addEventListener("click", onClick);

        const label = canvas.getByText("Label");
        await userEvent.click(label);

        await expect(onClick).not.toBeCalled();
      },
    );
  },
};

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
