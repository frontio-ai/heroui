import {renderHook, waitFor} from "@testing-library/react";
import {mocks} from "@heroui/test-utils";

import {useImage} from "../src";

describe("use-image hook", () => {
  let mockImage: {restore: any; simulate: (value: "loaded" | "error") => void};

  beforeEach(() => {
    mockImage = mocks.image();
  });
  afterEach(() => {
    mockImage.restore();
  });

  it("can handle missing src", () => {
    const {result} = renderHook(() => useImage({}));

    expect(result.current).toEqual("pending");
  });

  it("can handle loading image", async () => {
    const {result} = renderHook(() => useImage({src: "/test.png"}));

    expect(result.current).toEqual("loading");
    mockImage.simulate("loaded");
    await waitFor(() => expect(result.current).toBe("loaded"));
  });

  it("can handle changing image", async () => {
    const {result, rerender} = renderHook(() => useImage({src: undefined}));

    expect(result.current).toEqual("pending");

    setTimeout(() => {
      rerender({src: "/test.png"});
    }, 3000);

    mockImage.simulate("loaded");
    await waitFor(() => expect(result.current).toBe("loaded"));
  });

  it("can handle error image", async () => {
    mockImage.simulate("error");
    const {result} = renderHook(() => useImage({src: "/test.png"}));

    expect(result.current).toEqual("loading");
    await waitFor(() => expect(result.current).toBe("failed"));
  });

  it("can handle cached image", async () => {
    mockImage.simulate("loaded");
    const {result} = renderHook(() => useImage({src: "/test.png"}));

    await waitFor(() => expect(result.current).toBe("loaded"));
  });
});
