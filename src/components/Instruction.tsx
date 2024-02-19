import { CheckCircleFill, CrossCircleFill } from "@transferwise/icons";
import * as React from "react";

export type InstructionProps = {
  sentiment: "negative" | "positive";
  children?: React.ReactNode;
};

const IconBySentiment: {
  [key in InstructionProps["sentiment"]]: React.ComponentType<{
    [key: string]: never;
  }>;
} = {
  negative: () => (
    <CrossCircleFill size={24} className="text-sentiment-negative" />
  ),
  positive: () => (
    <CheckCircleFill size={24} className="text-sentiment-positive" />
  ),
};

export function Instruction({ sentiment, children }: InstructionProps) {
  const Icon = IconBySentiment[sentiment];
  return (
    <div className="flex gap-x-2 text-base text-content-secondary">
      <Icon />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export type InstructionListProps = {
  children?: React.ReactNode;
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
