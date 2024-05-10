import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface OffscreenProps {
  children?: React.ReactNode;
}

export function Offscreen({ children }: OffscreenProps) {
  const [documentFragment, setDocumentFragment] = useState<DocumentFragment>();
  useEffect(() => {
    setDocumentFragment(new DocumentFragment());
  }, []);

  return documentFragment != null
    ? createPortal(children, documentFragment)
    : null;
}
