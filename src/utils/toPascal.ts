/**
 * Converts a string to PascalCase.
 *
 * - Capitalizes the first letter of each word.
 * - Removes spaces and common word separators like hyphens, underscores, and ampersands.
 * - Handles single-word strings by simply capitalizing the first letter.
 *
 * @param str The input string to convert.
 * @returns The PascalCase version of the input string.
 */

export const toPascalCase = (str: string): string => {
  if (
    !str.includes(" ") &&
    !str.includes("-") &&
    !str.includes("_") &&
    !str.includes("&")
  ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/&/g, " ")
    .split(" ")
    .map((word) => {
      if (word.length === 0) {
        return "";
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })

    .join("");
};
