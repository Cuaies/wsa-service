import { ScraperOptions } from "../ts/interfaces";

export const isScraperOptions = (obj: unknown): obj is ScraperOptions => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "url" in obj &&
    typeof obj.url === "string"
  );
};
