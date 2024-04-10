import { renderHook, act } from "@testing-library/react";
import { eventBus } from "./EventBus";
import { useSupaclipboardGlobalListener } from "./useSupaclipboardGlobalListener";

// Mocking the eventBus.publish method
jest.mock("./EventBus", () => ({
  eventBus: {
    publish: jest.fn(),
  },
  EventName: {
    copy: "copy",
    cut: "cut",
    paste: "paste",
  },
}));

describe("useSupaclipboardGlobalListener", () => {
  const mockCopyHandler = jest.fn();
  const mockCutHandler = jest.fn();
  const mockPasteHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    document.getSelection = jest.fn().mockImplementation(() => ({
      toString: () => "mocked text",
      anchorNode: null,
      anchorOffset: 0,
      focusNode: null,
      focusOffset: 0,
      isCollapsed: false,
      rangeCount: 0,
      type: "",
      addRange: jest.fn(),
      collapse: jest.fn(),
      collapseToEnd: jest.fn(),
      collapseToStart: jest.fn(),
      containsNode: jest.fn(),
      deleteFromDocument: jest.fn(),
      empty: jest.fn(),
      extend: jest.fn(),
      getRangeAt: jest.fn(),
      modify: jest.fn(),
      removeAllRanges: jest.fn(),
      removeRange: jest.fn(),
      selectAllChildren: jest.fn(),
      setBaseAndExtent: jest.fn(),
      setPosition: jest.fn(),
    }));

    global.ClipboardEvent = function (
      type: string,
      eventInitDict?: ClipboardEventInit
    ) {
      return new Event(type, eventInitDict);
    } as any;
  });

  it("calls the provided onCopy handler and publishes copy event with selected text", () => {
    renderHook(() =>
      useSupaclipboardGlobalListener({
        onCopy: mockCopyHandler,
      })
    );

    act(() => {
      document.dispatchEvent(new ClipboardEvent("copy"));
    });

    expect(mockCopyHandler).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalledWith("copy", "mocked text");
  });

  it("calls the provided onCut handler and publishes cut event with selected text", () => {
    renderHook(() =>
      useSupaclipboardGlobalListener({
        onCut: mockCutHandler,
      })
    );

    act(() => {
      document.dispatchEvent(new ClipboardEvent("cut"));
    });

    expect(mockCutHandler).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalledWith("cut", "mocked text");
  });

  it("calls the provided onPaste handler without publishing event", () => {
    renderHook(() =>
      useSupaclipboardGlobalListener({
        onPaste: mockPasteHandler,
      })
    );

    act(() => {
      document.dispatchEvent(new ClipboardEvent("paste"));
    });

    expect(mockPasteHandler).toHaveBeenCalled();
    // Ensure no publish event for paste since the original hook does not publish one
    expect(eventBus.publish).not.toHaveBeenCalledWith(
      "paste",
      expect.anything()
    );
  });
});
