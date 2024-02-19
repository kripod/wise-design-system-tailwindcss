import type { Story } from "@ladle/react";

import { Input } from "./Input";

export const Basic: Story<{
  contents: string;
  disabled: boolean;
  onClick: () => void;
}> = function ({ contents, disabled }) {
  return <Input value={contents} disabled={disabled} />;
};

Basic.args = {
  contents: "Text value",
  disabled: false,
};
