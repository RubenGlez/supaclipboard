import { useState } from "react";
import { useClipboard } from "./useClipboard";

export default function App() {
  const { copy, paste, history } = useClipboard({
    onCopySuccess: () => console.log("Copied successfully!"),
    onCopyError: () => console.log("Copy failed."),
    onPasteSuccess: () => console.log("Copied successfully!"),
    onPasteError: () => console.log("Copy failed."),
  });
  const [pastedText, setPastedText] = useState<string>("");

  const handleCopy = (textToCopy: string) => async () => {
    await copy(textToCopy);
  };

  const handlePaste = async () => {
    const result = await paste();
    setPastedText(result ?? "");
  };

  const colors = ["RED", "GREEN", "YELLOW", "ORANGE", "BLUE"];

  return (
    <div>
      <h3>Examples to copy</h3>
      <ul>
        {colors.map((color) => (
          <li key={color}>
            <button onClick={handleCopy(color)}>{color}</button>
          </li>
        ))}
      </ul>

      <button onClick={handlePaste}>Paste</button>

      <h3>History</h3>
      <ol>
        {history.map((item, i) => (
          <li key={`${item}_${i}`}>{item}</li>
        ))}
      </ol>

      <h3>Pasted text</h3>
      {pastedText && <p>{`Pasted Text: ${pastedText}`}</p>}
    </div>
  );
}
