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

export function List() {
  return (
    <InstructionList
      dos={[
        "Do an initial money transfer",
        "Invite at least 3 friends",
        "Convince them to use this amazing product",
      ]}
      donts={[
        <>
          Paying extra <a href="#_">hidden fees</a> for transfers
        </>,
        "Use bad exchange rate",
      ]}
    />
  );
}
