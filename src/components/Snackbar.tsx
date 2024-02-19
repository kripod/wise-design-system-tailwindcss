export type SnackbarProps = {
  text: string;
  action?: React.ReactNode;
};

export function Snackbar({ text, action }: SnackbarProps) {
  return (
    <div className="theme-invert inline-flex max-w-xl items-center justify-between gap-x-4 rounded bg-background-screen p-4 text-sm text-content-primary shadow">
      <div role="status" className="flex-1">
        {text}
      </div>
      {action != null ? <div className="-my-2">{action}</div> : null}
    </div>
  );
}
