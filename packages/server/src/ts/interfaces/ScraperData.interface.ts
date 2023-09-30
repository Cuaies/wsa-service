import { Article } from "./Article.interface";

/**
 * Represents the data scraped from the website.
 */
export interface ScraperData {
  articles: Article[];
  images?: string[];
  links?: string[];
}
