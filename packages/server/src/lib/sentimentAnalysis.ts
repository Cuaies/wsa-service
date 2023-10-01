// @ts-expect-error - no types
import Sentiment from "sentiment";

/**
 * Converts strings to sentiment scores.
 */
export const sentimentAnalysis = async (text: string): Promise<number> => {
  try {
    text = JSON.parse(text);
  } catch (err) {
    // eslint-disable-next-line no-empty
  }

  const sentiment = new Sentiment();
  return sentiment.analyze(text).score as number;
};
