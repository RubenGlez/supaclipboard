import { renderHook, act } from "@testing-library/react";
import { useSupaclipboard } from ".";

describe("useSupaclipboard", () => {
  // Mocks
  const originalNavigator = global.navigator;
  const originalLocalStorage = global.localStorage;

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

  afterEach(() => {
    global.localStorage = originalLocalStorage;
    global.navigator = originalNavigator;
  });

  it("persists history to localStorage when persist is true", async () => {
    const { result } = renderHook(() => useSupaclipboard({ persist: true }));

    await act(async () => {
      await result.current.copy("persisted text");
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "supaclipboardHistory",
      JSON.stringify(["persisted text"])
    );
  });

  it("respects the history limit", async () => {
    const historyLimit = 2;
    const { result } = renderHook(() =>
      useSupaclipboard({ historyLimit, persist: false })
    );

    await act(async () => {
      await result.current.copy("first text");
      await result.current.copy("second text");
      await result.current.copy("third text");
    });

    expect(result.current.history.length).toBe(historyLimit);
    expect(result.current.history).toEqual(["third text", "second text"]);
  });

  it("calls onCopySuccess and updates history on successful copy", async () => {
    const onCopySuccess = jest.fn();
    const { result } = renderHook(useSupaclipboard, {
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
