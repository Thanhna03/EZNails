const normalizePriority = (value: any) => {
  const num = Number(value);
  return isNaN(num) || num < 0 ? 0 : num;
};

export function useGalleryHelpers() {
  const sortFn = (type: "Custom" | "Default" = "Default") => (a: any, b: any) => {
    const dateA = a?.created_at || 0;
    const dateB = b?.created_at || 0;
    if (type === "Custom") {
      const priorityA = normalizePriority(a?.priority);
      const priorityB = normalizePriority(b?.priority);

      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }
    }
    return dateB - dateA;
  };
  return { sortFn };
}
