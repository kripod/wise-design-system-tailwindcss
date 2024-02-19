import type { Story } from "@ladle/react";

import { Instruction, InstructionList, InstructionProps } from "./Instruction";

export const Basic: Story<Pick<InstructionProps, "sentiment" | "children">> =
  function ({ sentiment, children }) {
    return <Instruction sentiment={sentiment}>{children}</Instruction>;
  };

Basic.args = {
  children: "Do an initial money transfer",
};

Basic.argTypes = {
  sentiment: {
    options: ["positive", "negative"],
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
