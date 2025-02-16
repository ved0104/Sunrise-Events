module.exports.formatDate = (dateInput) => {
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
