import { Cross } from "@transferwise/icons";

export type CloseButtonProps = {
  onClick?: () => void;
};

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      type="button"
      className="-m-4 p-4"
      onClick={() => {
        onClick?.();
      }}
    >
      <Cross title="Close" />
    </button>
  );
}
