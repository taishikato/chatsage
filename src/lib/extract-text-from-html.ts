import { decode } from "html-entities";

export function extractTextFromHtml(htmlString: string): string {
  // Remove script and style elements
  htmlString = htmlString.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");

  // Remove HTML comments
  htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, "");

  // Remove all remaining HTML tags
  htmlString = htmlString.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  htmlString = decode(htmlString);

  // Remove extra whitespace
  htmlString = htmlString.replace(/\s+/g, " ").trim();

  return htmlString;
}
