/**
 * Represents the content that can be parsed from a page.
 */
export interface ParseContent {
  h3: string[];
  p: string[];
  links?: string[];
  images?: string[];
}
