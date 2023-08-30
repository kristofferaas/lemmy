type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
  ? RecursivelyReplaceNullWithUndefined<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
  : T;

export function replaceNullWithUndefined<T>(
  obj: T,
): RecursivelyReplaceNullWithUndefined<T> {
  if (obj === null || obj === undefined) {
    return undefined as any;
  }

  if ((obj as any).constructor.name === "Object" || Array.isArray(obj)) {
    for (const key in obj) {
      obj[key] = replaceNullWithUndefined(obj[key]) as any;
    }
  }
  return obj as any;
}
