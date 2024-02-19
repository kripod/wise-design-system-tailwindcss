export type SnackbarProps = {
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export function Snackbar({ action, children }: SnackbarProps) {
  return (
    <div className="theme-invert inline-flex items-center justify-between gap-x-4 rounded bg-contrast-overlay p-4 text-content-primary shadow">
      <div className="max-w-md flex-1 text-sm">{children}</div>
      {action != null ? <div className="-my-2">{action}</div> : null}
    </div>
  );
}
