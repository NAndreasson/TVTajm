// Not perfect by any means but work for our purpose.
// For a more robust solution, one could consider using either
// https://github.com/cure53/DOMPurify or DOMParser
export function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "");
}
