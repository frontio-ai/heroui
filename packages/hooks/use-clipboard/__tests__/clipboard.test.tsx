import {renderHook, act} from "@testing-library/react";

import {useClipboard} from "../src";

describe("UseClipboard", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    // navigator.clipboard.writeText mock
    Object.assign(navigator, {
      clipboard: {
        writeText: (data: string) =>
          new Promise((res, rej) => {
            try {
              res(data);
            } catch (error) {
              rej(error);
            }
          }),
      },
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should copy text to clipboard", () => {
    jest.spyOn(navigator.clipboard, "writeText");

    const {result} = renderHook(() => useClipboard({timeout: 0}));

    act(() => {
      result.current.copy("test");
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test");
  });

  it("compatibilityCopy: should use execCommand to copy text to clipboard when writeText fail", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error("Clipboard write failed")),
      },
    });

    Object.assign(document, {
      execCommand: jest.fn().mockReturnValue(true),
    });
    jest.spyOn(navigator.clipboard, "writeText");
    jest.spyOn(document, "execCommand");
    const {result} = renderHook(() => useClipboard({timeout: 0}));

    await act(async () => {
      result.current.copy("test");
    });

    // Verify that navigator.clipboard.writeText was called with "test"
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test");
    // Check if document.execCommand was called with "copy" as fallback
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    // Ensure that the copied state is set to true
    expect(result.current.copied).toBe(true);
    jest.advanceTimersByTime(1000);
    expect(result.current.copied).toBe(false);
  });
});
