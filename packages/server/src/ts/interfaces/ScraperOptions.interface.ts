import { GoToOptions } from "puppeteer";

/**
 * Represents the options that can be passed to the scraper.
 */
export interface ScraperOptions {
  url: string;
  fetchLinks?: boolean;
  fetchImages?: boolean;
  download?: boolean;
  goToOpts?: GoToOptions;
}
