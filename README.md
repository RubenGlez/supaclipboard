# SupaClipboard

> :warning: **Work In Progress:** This hook is currently under development and might be subject to breaking changes. Use with caution in production environments.

A comprehensive React hook for interacting with the clipboard, providing functionalities beyond simple text copying and pasting. SupaClipboard offers advanced features like handling different data types, clipboard change listening, customizable notifications, and much more, making it a versatile tool for modern web applications.

## Features

- **Advanced Copying:** Support for copying text, HTML, and images to the clipboard.
- **Conditional Copy:** Copy content based on custom conditions or validations.
- **Advanced Reading:** Read and process various content types from the clipboard, including text, HTML, and images.
- **Clipboard Change Listening:** Detect and respond to changes in the clipboard content.
- **Clipboard History:** Maintain a session-based history of copied items for easy access and manipulation.
- **Notifications:** Customizable notifications for successful or failed clipboard operations.
- **Security and Privacy:** Ensures secure and privacy-compliant access to the clipboard.
- **Cross-Browser Compatibility:** Works consistently across different browsers with fallbacks for unsupported cases.
- **Customizable:** Offers configuration options for callbacks, history limits, and more.

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
  const { copy, paste, clipboardHistory } = useClipboard({
    onSuccess: () => console.log("Copied successfully!"),
    onError: () => console.log("Failed to copy."),
  });

  return (
    <div>
      <button onClick={() => copy("Hello World!")}>Copy to Clipboard</button>
      <button onClick={async () => console.log(await paste())}>
        Paste from Clipboard
      </button>
      <div>Clipboard History: {clipboardHistory.join(", ")}</div>
    </div>
  );
};

export default MyComponent;
```

## API Reference
`useClipboard(options)`
Initializes the clipboard hook with optional configurations.

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
