export const formatDate = (date) => {
  if (!date) return "Never logged in"; // Handle missing date

  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? "Invalid date"
    : parsedDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};
