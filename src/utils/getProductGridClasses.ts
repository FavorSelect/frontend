export const getProductGridClasses = (viewMode: string) => {
  return viewMode === "grid"
    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
    : "space-y-4";
};
