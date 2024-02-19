import { CheckCircleFill, CrossCircleFill } from "@transferwise/icons";
import * as React from "react";

export type InstructionProps = {
  sentiment: "positive" | "negative";
  children: React.ReactNode;
};

const iconBySentiment: {
  [key in InstructionProps["sentiment"]]: React.ComponentType<{
    [key: string]: never;
  }>;
} = {
  positive: () => (
    <CheckCircleFill size={24} className="text-sentiment-positive" />
  ),
  negative: () => (
    <CrossCircleFill size={24} className="text-sentiment-negative" />
  ),
};

export function Instruction({ sentiment, children }: InstructionProps) {
  const Icon = iconBySentiment[sentiment];
  return (
    <div className="flex items-center gap-x-2">
      <Icon />
      <span className="text-base text-content-secondary">{children}</span>
    </div>
  );
}

export type InstructionListProps = {
  dos?: React.ReactNode[];
  donts?: React.ReactNode[];
};

export function InstructionList({ dos, donts }: InstructionListProps) {
  return (
    <ul className="space-y-4">
      {dos?.map((children, index) => (
        <li key={typeof children !== "object" ? String(children) : index}>
          <Instruction sentiment="positive">{children}</Instruction>
        </li>
      ))}
      {donts?.map((children, index) => (
        <li key={typeof children !== "object" ? String(children) : index}>
          <Instruction sentiment="negative">{children}</Instruction>
        </li>
      ))}
    </ul>
  );
}
