import { useState } from "react";

import { Alert } from "@/components/Alert";

export default function Page() {
  const [hideAlert, setHideAlert] = useState(false);

  return (
    <div className="p-6">
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
