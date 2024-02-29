import { renderHook, act } from "@testing-library/react";
import { useClipboard } from ".";

describe("useClipboard", () => {
  // Mocks
  beforeEach(() => {
    Object.defineProperty(global.navigator, "clipboard", {
      value: {
        writeText: jest.fn(),
        readText: jest.fn(),
      },
      writable: true,
    });

    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  it("calls onCopySuccess and updates history on successful copy", async () => {
    const onCopySuccess = jest.fn();
    const { result } = renderHook(useClipboard, {
      initialProps: { onCopySuccess, persist: false },
    });

    await act(async () => {
      await result.current.copy("test text");
    });

    expect(onCopySuccess).toHaveBeenCalled();
    expect(result.current.history).toContain("test text");
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
