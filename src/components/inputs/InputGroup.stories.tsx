import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "@transferwise/icons";

import { ActionButton } from "../buttons/ActionButton";
import { InputGroup } from "./InputGroup";
import { TextInput } from "./TextInput";

const meta = {
  title: "components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WrappedTextInputWithPrefix = {
  args: {
    addonStart: {
      content: <Search size={24} />,
      initialContentWidth: 24,
    },
    children: <TextInput />,
  },
} satisfies Story;

export const WrappedTextInputWithSuffix = {
  args: {
    addonEnd: {
      content: (
        <ActionButton
          onClick={async () => {
            const input = document.querySelector<HTMLInputElement>(
              "#storybook-root input",
            );

            if (input != null) {
              await navigator.clipboard.writeText(input.value);
              input.focus({ preventScroll: true });
              input.select();
            }
          }}
        >
          Copy
        </ActionButton>
      ),
      interactive: true,
      padding: "sm",
    },
    children: <TextInput defaultValue="Text value" />,
  },
} satisfies Story;

export const WrappedTextInputDisabled = {
  args: {
    ...WrappedTextInputWithSuffix.args,
    disabled: true,
  },
} satisfies Story;
