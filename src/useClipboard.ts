import { useCallback, useState } from "react";

interface CopyFromClipboardProps {
  onCopySuccess?: () => void;
  onCopyError?: () => void;
  onPasteSuccess?: () => void;
  onPasteError?: () => void;
  historyLimit?: number;
  persist?: boolean;
}

const LOCAL_STORAGE_KEY = "supaclipboardHistory";

export function useClipboard({
  onCopySuccess,
  onCopyError,
  onPasteSuccess,
  onPasteError,
  historyLimit = 10,
  persist = false,
}: CopyFromClipboardProps = {}) {
  const [history, setHistory] = useState<string[]>(() => {
    if (persist) {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });

  const updateHistory = useCallback(
    (text: string) => {
      setHistory((prevHistory) => {
        const updatedHistory = [
          text,
          ...prevHistory.slice(0, historyLimit - 1),
        ];
        if (persist) {
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updatedHistory)
          );
        }
        return updatedHistory;
      });
    },
    [historyLimit, persist]
  );

  const copy = useCallback(
    async (text: string) => {
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        onCopyError?.();
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        updateHistory(text);
        onCopySuccess?.();
      } catch (error) {
        console.error("Failed to copy content: ", error);
        onCopyError?.();
      }
    },
    [onCopyError, onCopySuccess, updateHistory]
  );

  const paste = useCallback(async () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      onPasteError?.();
      return null;
    }

    try {
      const text = await navigator.clipboard.readText();
      onPasteSuccess?.();
      return text;
    } catch (error) {
      console.error("Failed to paste content: ", error);
      onPasteError?.();
      return null;
    }
  }, [onPasteError, onPasteSuccess]);

  return { copy, paste, history };
}
