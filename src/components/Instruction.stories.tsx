import type { Story } from "@ladle/react";

import { Instruction, InstructionList } from "./Instruction";

export const Basic: Story<{
  contents: string;
  sentiment: "negative" | "positive";
}> = function ({ contents, sentiment }) {
  return <Instruction sentiment={sentiment}>{contents}</Instruction>;
};

Basic.args = {
  contents: "Do an initial money transfer",
};

Basic.argTypes = {
  sentiment: {
    options: ["negative", "positive"],
    defaultValue: "positive",
    control: { type: "radio" },
  },
};

export const List = function () {
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
        Paying extra <a href="#_">hidden fees</a> for transfers
      </Instruction>
      <Instruction sentiment="negative">Use bad exchange rate</Instruction>
    </InstructionList>
  );
};
