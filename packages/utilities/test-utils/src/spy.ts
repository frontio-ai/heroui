export function shouldIgnoreReactWarning(spy: jest.SpyInstance): boolean {
  if (spy.mock.calls.length > 0) {
    const msg = spy.mock.calls[0][0];

    if (msg && typeof msg === "string" && msg.includes("Warning: `ReactDOMTestUtils.act`")) {
      return true;
    }
  }

  return false;
}

const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
const spy = errorSpy;

export {spy, errorSpy, warnSpy};
