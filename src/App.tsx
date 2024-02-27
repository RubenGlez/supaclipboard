import { useState } from "react";
import { useClipboard } from "./useClipboard";

export default function App() {
  const { copy, paste } = useClipboard({
    onSuccess: () => alert("Copied successfully!"),
    onError: () => alert("Copy failed."),
  });
  const [pastedText, setPastedText] = useState<string>("");

  const handleCopy = async () => {
    const textToCopy = "Hello, world!";
    await copy(textToCopy);
  };

  const handlePaste = async () => {
    const result = await paste();
    if (result && result.type === "text") {
      setPastedText(result.content);
    }
  };

  return (
    <div>
      <button onClick={handleCopy}>Copy Text</button>
      <button onClick={handlePaste}>Paste</button>
      {pastedText && (
        <div>
          <h3>Pasted Text:</h3>
          <p>{pastedText}</p>
        </div>
      )}
    </div>
  );
}
