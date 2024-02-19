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
      <div className="flex-1 text-base text-content-secondary">{children}</div>
    </div>
  );
}

export type InstructionListProps = {
  children: React.ReactNode;
};

export function InstructionList({ children }: InstructionListProps) {
  return (
    <ul className="space-y-4">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
}
