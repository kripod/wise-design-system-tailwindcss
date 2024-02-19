import * as React from "react";
import * as ReactDOM from "react-dom";

export interface OffscreenProps {
  children?: React.ReactNode;
}

export function Offscreen({ children }: OffscreenProps) {
  const [documentFragment, setDocumentFragment] =
    React.useState<DocumentFragment>();
  React.useEffect(() => {
    setDocumentFragment(new DocumentFragment());
  }, []);

  return documentFragment != null
    ? ReactDOM.createPortal(children, documentFragment)
    : null;
}
