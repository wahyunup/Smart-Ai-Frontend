const formatDate = (rawDate: string) => {
  const date = new Date(rawDate).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return date;
};

export { formatDate };
