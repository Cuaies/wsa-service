import { ScraperOptions } from "../ts/interfaces";
import { SentimentalAnalysisOptions } from "../ts/interfaces/SentimentAnalysisOptions.interface";

export const isScraperOptions = (obj: unknown): obj is ScraperOptions => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "url" in obj &&
    typeof obj.url === "string"
  );
};

export const isSentimentalAnalysisOptions = (
  obj: unknown
): obj is SentimentalAnalysisOptions => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "text" in obj &&
    typeof obj.text === "string"
  );
};
