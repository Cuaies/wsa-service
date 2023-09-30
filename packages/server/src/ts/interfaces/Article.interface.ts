import { Author } from "./Author.interface";
import { Content } from "./Content.interface";

/**
 * Represents an article.
 */
export interface Article {
  articleLink?: string;
  imageLink?: string;
  time?: string | null | undefined;
  category?: string | null | undefined;
  title?: string | null | undefined;
  summary?: string | null | undefined;
  author?: Author;
  content?: Content[];
}
