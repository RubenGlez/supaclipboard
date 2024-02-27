import { useCallback } from "react";

interface CopyFromClipboardProps {
  onCopySuccess?: () => void;
  onCopyFail?: () => void;
  onReadSuccess?: () => void;
  onReadFail?: () => void;
}

export function useClipboard({
  onCopySuccess,
  onCopyFail,
  onReadSuccess,
  onReadFail,
}: CopyFromClipboardProps = {}) {
  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        onCopySuccess?.();
      } catch (error) {
        console.error("Error copying the text:", error);
        onCopyFail?.();
      }
    },
    [onCopyFail, onCopySuccess]
  );

  const readFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      onReadSuccess?.();
      return text;
    } catch (error) {
      onReadFail?.();
      return "";
    }
  }, [onReadFail, onReadSuccess]);

  return { copyToClipboard, readFromClipboard };
}
