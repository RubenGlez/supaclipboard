import { useEffect } from "react";
import { EventName, eventBus } from "./EventBus";

interface UseSupaclipboardGlobalListenerProps {
  onCopy?: (event: ClipboardEvent) => void;
  onCut?: (event: ClipboardEvent) => void;
  onPaste?: (event: ClipboardEvent) => void;
}

const noop = () => {};

export function useSupaclipboardGlobalListener(
  props?: UseSupaclipboardGlobalListenerProps
) {
  const { onCopy, onCut, onPaste } = {
    onCopy: noop,
    onCut: noop,
    onPaste: noop,
    ...props,
  };
  useEffect(() => {
    const handleCopy = (event: ClipboardEvent) => {
      onCopy?.(event);
      const selectedText = document.getSelection()?.toString() || "";
      eventBus.publish(EventName.copy, selectedText);
    };

    const handleCut = (event: ClipboardEvent) => {
      onCut?.(event);
      const selectedText = document.getSelection()?.toString() || "";
      eventBus.publish(EventName.cut, selectedText);
    };

    const handlePaste = (event: ClipboardEvent) => {
      onPaste?.(event);
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
    };
  }, [onCopy, onCut, onPaste]);
}
