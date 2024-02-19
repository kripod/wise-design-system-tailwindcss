export type SnackbarProps = {
  text: string;
  action?: React.ReactNode;
};

export function Snackbar({ text, action }: SnackbarProps) {
  return (
    <div className="theme-invert inline-flex items-center justify-between gap-x-4 rounded bg-contrast-overlay p-4 text-content-primary shadow">
      <div role="status" className="max-w-md flex-1 text-sm">
        {text}
      </div>
      {action != null ? <div className="-my-2">{action}</div> : null}
    </div>
  );
}
