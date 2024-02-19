import type { Story } from "@ladle/react";

import { Flag } from "./Flag";

export const Basic: Story<{
  code: string;
  intrinsicSize: number;
}> = function ({ code, intrinsicSize }) {
  return <Flag code={code} intrinsicSize={intrinsicSize} />;
};

Basic.args = {
  code: "USD",
  intrinsicSize: 64,
};
