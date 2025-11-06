export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-11-02";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

export const useCdn =
  typeof document !== "undefined" && process.env.NODE_ENV === "production";
