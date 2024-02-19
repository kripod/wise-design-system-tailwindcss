export interface SnackbarProps {
  role?: "status" | "alert";
  text: string;
  action?: React.ReactNode;
}

export function Snackbar({ role = "status", text, action }: SnackbarProps) {
  return (
    <div className="theme-invert inline-flex max-w-xl items-center justify-between gap-x-4 rounded bg-background-screen p-4 text-body text-content-primary shadow">
      <div role={role} className="flex-1">
        {text}
      </div>
      {action ? <div className="-my-2">{action}</div> : null}
    </div>
  );
}
