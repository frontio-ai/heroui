const warningStack: {[key: string]: boolean} = {};

export function warn(message: string, component?: string, ...args: any[]) {
  const tag = component ? ` [${component}]` : " ";
  const log = `[Hero UI]${tag}: ${message}`;

  if (typeof console === "undefined") return;
  if (warningStack[log]) return;
  warningStack[log] = true;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    return console.warn(log, args);
  }
}
