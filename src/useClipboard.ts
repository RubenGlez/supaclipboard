import { useCallback, useState } from "react";

interface CopyFromClipboardProps {
  onSuccess?: () => void;
  onError?: () => void;
  historyLimit?: number;
  persist?: boolean;
}

enum CopyContentType {
  plainText = "text/plain",
  html = "text/html",
  image = "image/*",
}

enum PasteContentType {
  text = "text",
  image = "image",
}

type PasteResult =
  | { type: "text"; content: string }
  | { type: "image"; content: Blob };

const LOCAL_STORAGE_KEY = "supaclipboardHistory";

export function useClipboard({
  onSuccess,
  onError,
  historyLimit = 10, // Un límite predeterminado para el historial
  persist = false,
}: CopyFromClipboardProps = {}) {
  const [clipboardHistory, setClipboardHistory] = useState<
    Array<string | Blob>
  >(() => {
    if (persist) {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    }
    return [];
  });

  const updateHistory = useCallback(
    (content: string | Blob) => {
      setClipboardHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, content].slice(-historyLimit);
        if (persist) {
          /**
           * TODO
           * This only works for strings.
           * To store images or HTML we need to convert them to Base64
           * or store a reference instead the real content
           */
          const historyToStore = updatedHistory.filter(
            (item) => typeof item === "string"
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(historyToStore)
          );
        }
        return updatedHistory;
      });
    },
    [historyLimit, persist]
  );

  const copy = useCallback(
    async (content: string | Blob): Promise<boolean> => {
      if (!navigator.clipboard) {
        console.error("Clipboard API not available");
        onError?.();
        return false;
      }

      try {
        let mimeType = CopyContentType.plainText;
        const dataToCopy: Blob | string = content;

        if (typeof content === "string") {
          mimeType =
            content.trim().startsWith("<") && content.trim().endsWith(">")
              ? CopyContentType.html
              : CopyContentType.plainText;
        } else if (content instanceof Blob) {
          mimeType = CopyContentType.image; // TODO: Enhancing this by checking the blob's type.
        }

        // Simplify the data structure for ClipboardItem
        const item =
          mimeType === CopyContentType.image
            ? content
            : new Blob([dataToCopy], { type: mimeType });
        await navigator.clipboard.write([
          new ClipboardItem({ [mimeType]: item }),
        ]);

        updateHistory(item);

        onSuccess?.();
        return true;
      } catch (error) {
        console.error("Failed to copy content: ", error);
        onError?.();
        return false;
      }
    },
    [onError, onSuccess, updateHistory]
  );

  const paste = useCallback(async (): Promise<PasteResult | null> => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return null;
    }

    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type);
          if (type === CopyContentType.plainText) {
            const text = await new Response(blob).text();
            return { type: PasteContentType.text, content: text };
          } else if (type.startsWith("image/")) {
            return { type: PasteContentType.image, content: blob };
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Failed to paste content: ", error);
      return null;
    }
  }, []);

  return { copy, paste, clipboardHistory };
}
