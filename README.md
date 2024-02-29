# SupaClipboard

> :warning: **Work In Progress:** This hook is currently under development and might be subject to breaking changes. Use with caution in production environments.

A comprehensive React hook for interacting with the clipboard, providing functionalities beyond simple text copying and pasting. SupaClipboard offers advanced features like handling different data types, clipboard change listening, customizable notifications, and much more, making it a versatile tool for modern web applications.

## Features

🏗️: WIP features

- **Clipboard History:** Maintain a session-based history of copied items for easy access and manipulation.
- **Notifications:** Customizable notifications for successful or failed clipboard operations.
- **Security and Privacy:** Ensures secure and privacy-compliant access to the clipboard.
- **Cross-Browser Compatibility:** Works consistently across different browsers with fallbacks for unsupported cases.
- **Customizable:** Offers configuration options for callbacks, history limits, and more.
- **🏗️ Advanced Copying:** Support for copying HTML, and images to the clipboard.
- **🏗️ Conditional Copy:** Copy content based on custom conditions or validations.
- **🏗️ Advanced Reading:** Read and process various content types from the clipboard, including HTML and images.
- **🏗️ Clipboard Change Listening:** Detect and respond to changes in the clipboard content.

## Installation

```bash
npm install supaclipboard
```

Or using yarn:

```bash
yarn add supaclipboard
```

## Usage

Here's a quick example to get you started:

```jsx
import React from "react";
import { useClipboard } from "supaclipboard";

const MyComponent = () => {
  const inputRef = useRef < HTMLInputElement > null;

  const { copy, history, paste } = useClipboard({
    historyLimit: 8,
    onCopyError: () => {
      console.log("Error copying");
    },
    onCopySuccess: () => {
      console.log("Copy successful");
    },
    onPasteError: () => {
      console.log("Error pasting");
    },
    onPasteSuccess: () => {
      console.log("Paste successful");
    },
    persist: true,
  });

  const handlePaste = async () => {
    if (!inputRef.current) return;
    const valueFromClipboard = await paste();
    inputRef.current.value = valueFromClipboard ?? "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h1>📋 supaclipboard</h1>
      </div>

      <div>
        <h2>Copy examples</h2>
        <ul style={{ display: "inline-flex", gap: "20px" }}>
          <li>
            <button onClick={() => copy("Green")}>Green</button>
          </li>
          <li>
            <button onClick={() => copy("Blue")}>Blue</button>
          </li>
          <li>
            <button onClick={() => copy("Orange")}>Orange</button>
          </li>
          <li>
            <button onClick={() => copy("Red")}>Red</button>
          </li>
          <li>
            <button onClick={() => copy("Yellow")}>Yellow</button>
          </li>
          <li>
            <button onClick={() => copy("Purple")}>Purple</button>
          </li>
        </ul>
      </div>

      <div>
        <h2>Paste from clipboard</h2>
        <div style={{ display: "inline-flex", gap: "20px" }}>
          <button onClick={handlePaste}>Paste</button>
          <input ref={inputRef} />
        </div>
      </div>

      <div>
        <h2>
          History{" "}
          <small style={{ fontSize: "12px" }}>
            (first item is the last copied value)
          </small>
        </h2>
        <ol>
          {history.map((item, i) => (
            <li key={`${item}_${i}`}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MyComponent;
```

## API Reference

- `useClipboard(options)`: Initializes the clipboard hook with optional configurations.

### Options:

- `onSuccess`: Callback function that triggers on a successful copy.
- `onError`: Callback function that triggers on a failed copy.
- `historyLimit`: Limits the number of items in the clipboard history.

### Returns:

- `copy`: Function to copy content to the clipboard.
- `paste`: Function to read content from the clipboard.
- `clipboardHistory`: An array of copied items during the session.

## Browser Support

SupaClipboard is designed to work in most modern browsers. For older browsers, make sure to test and implement necessary polyfills.

## Contributing

Contributions are always welcome! Please read the contributing guide for more details on how to contribute to this project.

## License

SupaClipboard is MIT licensed.
