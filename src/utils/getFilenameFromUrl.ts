export const getFilenameFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    return decodeURIComponent(parts[parts.length - 1]);
  } catch {
    return "review.jpg";
  }
};
