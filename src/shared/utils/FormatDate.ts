const formatDate = (rawDate: string) => {
  const date = new Date(rawDate);
  const day = date.getDay();
  const month = date.toLocaleDateString("id-ID", {month:"long"});
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export { formatDate };
