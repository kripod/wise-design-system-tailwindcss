import * as React from "react";

import { ActionButton } from "@/components/ActionButton";
import { Alert } from "@/components/Alert";
import { Dialog } from "@/components/Dialog";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function Page() {
  const [hideAlert, setHideAlert] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div className="flex flex-col items-start space-y-6 p-6">
      <ActionButton
        onClick={() => {
          setShowDialog(true);
        }}
      >
        Open dialog
      </ActionButton>

      <div className="flex gap-4">
        <PrimaryButton size="sm">Button label</PrimaryButton>
        <PrimaryButton size="sm" disabled>
          Button label
        </PrimaryButton>
      </div>

      <div className="flex gap-4">
        <PrimaryButton>Button label</PrimaryButton>
        <PrimaryButton disabled>Button label</PrimaryButton>
      </div>

      {!hideAlert ? (
        <Alert
          onClose={() => {
            setHideAlert(true);
          }}
        >
          Payments sent to your bank details today might not arrive in time for
          the holidays.
        </Alert>
      ) : null}

      <Input label="Label" />

      <Dialog
        title="Change this user’s role?"
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <div className="space-y-4">
          <div>Hello, world!</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit,
            omnis cumque soluta culpa voluptatem vel, animi sed quisquam quaerat
            iusto commodi natus, nam nostrum quod ratione sequi optio iure!
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit,
            omnis cumque soluta culpa voluptatem vel, animi sed quisquam quaerat
            iusto commodi natus, nam nostrum quod ratione sequi optio iure!
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et impedit,
            omnis cumque soluta culpa voluptatem vel, animi sed quisquam quaerat
            iusto commodi natus, nam nostrum quod ratione sequi optio iure!
          </div>
        </div>
      </Dialog>
    </div>
  );
}
