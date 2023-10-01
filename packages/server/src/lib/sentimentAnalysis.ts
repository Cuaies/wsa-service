// @ts-expect-error - no types
import Sentiment from "sentiment";

/**
 * Converts strings to sentiment scores.
 */
export const sentimentAnalysis = async (
  text: string
): Promise<{ [result: string]: number }> => {
  try {
    text = JSON.parse(text);
  } catch (err) {
    // eslint-disable-next-line no-empty
  }

  const sentiment = new Sentiment();
  return { result: sentiment.analyze(text).score as number };
};
