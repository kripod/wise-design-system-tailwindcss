import { CheckCircleFill, CrossCircleFill } from "@transferwise/icons";

export interface InstructionListProps {
  children?: React.ReactNode;
}

export function InstructionList({ children }: InstructionListProps) {
  return <ul className="space-y-4">{children}</ul>;
}

export interface InstructionProps {
  sentiment: "negative" | "positive";
  children?: React.ReactNode;
}

const IconBySentiment = {
  negative: () => (
    <CrossCircleFill size={24} className="text-sentiment-negative" />
  ),
  positive: () => (
    <CheckCircleFill size={24} className="text-sentiment-positive" />
  ),
} satisfies Record<InstructionProps["sentiment"], React.ComponentType>;

export function Instruction({ sentiment, children }: InstructionProps) {
  const Icon = IconBySentiment[sentiment];
  return (
    <li className="flex gap-x-2 text-body-lg text-content-primary">
      <Icon />
      <div className="flex-1">{children}</div>
    </li>
  );
}
