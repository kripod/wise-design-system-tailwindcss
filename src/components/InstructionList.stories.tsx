import type { Story } from "@ladle/react";

import { Instruction, InstructionList } from "./InstructionList";

export const Basic = function () {
  return (
    <InstructionList>
      <Instruction sentiment="positive">
        Do an initial money transfer
      </Instruction>
      <Instruction sentiment="positive">Invite at least 3 friends</Instruction>
      <Instruction sentiment="positive">
        Convince them to use this amazing product
      </Instruction>
      <Instruction sentiment="negative">
        Paying extra{" "}
        <a href="#_" className="font-semibold underline underline-offset-3">
          hidden fees
        </a>{" "}
        for transfers
      </Instruction>
      <Instruction sentiment="negative">Use bad exchange rate</Instruction>
    </InstructionList>
  );
};

export const ListItem: Story<{
  text: string;
  sentiment: "negative" | "positive";
}> = function ({ text, sentiment }) {
  return (
    <InstructionList>
      <Instruction sentiment={sentiment}>{text}</Instruction>
    </InstructionList>
  );
};

ListItem.args = {
  text: "Do an initial money transfer",
};

ListItem.argTypes = {
  sentiment: {
    options: ["negative", "positive"],
    defaultValue: "positive",
    control: { type: "radio" },
  },
};
