import { Context, useContext } from "react";

/**
 * A hook that checks beforehand if context is `null`.
 */
export function useCtx<T>(context: Context<T>) {
  const ctx = useContext(context);
  if (ctx == null) throw new Error("Context is null");

  return ctx;
}
