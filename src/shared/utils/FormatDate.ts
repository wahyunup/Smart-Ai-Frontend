const formatDate = (rawDate: string, time?:boolean) => {
const options:Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
}

if (time) {
  options.hour = "2-digit",
  options.minute = "2-digit"
}

  return new Date(rawDate).toLocaleString("id-ID", options)
};

export { formatDate };
