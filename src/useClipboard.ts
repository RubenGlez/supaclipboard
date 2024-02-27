import { useCallback } from "react";

interface CopyFromClipboardProps {
  onCopySuccess?: () => void;
  onCopyFail?: () => void;
  onReadSuccess?: () => void;
  onReadFail?: () => void;
}

export function useClipboard(props?: CopyFromClipboardProps) {
  const { onCopySuccess, onCopyFail, onReadSuccess, onReadFail } = props;

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Error copying the text:", error);
    }
  }, []);

  const readFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      return "";
    }
  }, []);

  return { copyToClipboard, readFromClipboard };
}
