import type { Story } from "@ladle/react";

import { Flag } from "./Flag";

export const Basic: Story<{
  code: string;
  size: number;
}> = function ({ code, size }) {
  return <Flag code={code} size={size} />;
};

Basic.args = {
  code: "USD",
  size: 64,
};
