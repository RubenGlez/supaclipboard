![supaclipboard](/src/supaclipboard.jpg)

# supaclipboard

A React hook for effortlessly handling clipboard operations (copy and paste) with additional features like operation callbacks, clipboard history management, and optional persistence of the clipboard history using local storage.

## Features

- **Clipboard History:** Maintain a session-based history of copied items for easy access and manipulation.
- **Notifications:** Customizable notifications for successful or failed clipboard operations.
- **Customizable:** Offers configuration options for callbacks, history limits, and more.
- **Security and Privacy:** Ensures secure and privacy-compliant access to the clipboard.
- **Cross-Browser Compatibility:** Works consistently across different browsers with fallbacks for unsupported cases.

## Installation

```bash
# npm
npm install supaclipboard

# yarn:
yarn add supaclipboard
```

## Usage

Here's a quick example to get you started:

```jsx
import React from "react";
import { useSupaclipboard } from "supaclipboard";

const MyComponent = () => {
  const inputRef = useRef < HTMLInputElement > null;

  const { copy, history, paste } = useSupaclipboard({
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

- `useSupaclipboard(options)`: Initializes the clipboard hook with optional configurations.

### Options:

- `onCopySuccess`: Callback function that triggers on a successful copy.
- `onCopyError`: Callback function that triggers on a failed copy.
- `onPasteSuccess`: Callback function that triggers on a successful paste.
- `onPasteError`: Callback function that triggers on a failed paste.
- `historyLimit`: Limits the number of items in the clipboard history.
- `persist`: Determines whether to persist history to local storage

### Returns:

- `copy`: Function to copy content to the clipboard.
- `paste`: Function to read content from the clipboard.
- `history`: An array of copied items during the session.

## Support & Contributing

If you need help or have any questions about supaclipboard, please don't hesitate to open an issue in the GitHub repository. I'm always here to help and would love to hear your feedback. If you're interested in contributing to the library, whether it's by reporting bugs, suggesting features, or submitting improvements, your contributions are greatly appreciated. Please feel free to open an issue or submit a pull request.

Thank you for using and supporting supaclipboard!

---

## Roadmap

### Short-term Enhancements

1. **Multi-Format Clipboard Support**: Extend functionality to support not just text, but images, HTML, and custom data types, offering a more versatile clipboard interaction experience.

2. **History Management Features**: Introduce capabilities to edit, remove, or even tag specific items within the clipboard history. This would allow users to manage their clipboard history more effectively.

3. **Clipboard Event Listeners**: Implement hooks that listen to clipboard events (copy, cut, and paste) globally within the app, allowing for automated reactions to these events.

### Mid-term Enhancements

4. **Synchronization Across Tabs**: Develop features for synchronizing clipboard history across multiple browser tabs or windows, using local storage, IndexedDB, or broadcast channels.

5. **Security Enhancements**: Offer security features like sanitization for copied content to prevent XSS attacks when pasting content from or into the web application.

6. **Custom Clipboard Implementation**: For applications that need a custom clipboard experience, provide the tools needed to implement a user-defined clipboard that can interact with the system clipboard.

### Long-term Enhancements

7. **Plugin System**: Establish a plugin system allowing developers to extend the library with custom functionalities, such as integrating with third-party APIs (e.g., saving clipboard items to cloud services).

8. **Advanced Clipboard Formatting**: Add support for preserving formatting when copying text (e.g., rich text formatting, markdown) or converting formats on the fly.

9. **Accessibility Improvements**: Enhance clipboard operations with accessibility in mind, ensuring that all functionalities are fully accessible through keyboard shortcuts and screen readers.

10. **Cross-Platform Clipboard Management**: Explore the possibility of extending `useSupaclipboard`'s capabilities to manage clipboard content across different devices, using cloud synchronization.
