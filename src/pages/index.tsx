import { useState } from "react";

import { ActionButton } from "@/components/ActionButton";
import { Alert } from "@/components/Alert";

export default function Page() {
  const [hideAlert, setHideAlert] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <ActionButton>Button label</ActionButton>

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
    </div>
  );
}
