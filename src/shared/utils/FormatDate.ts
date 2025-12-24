const formatDate = (rawDate: string, time?: boolean) => {
  const date = new Date(rawDate);
  const now = new Date();

  // reset jam biar bisa dibandingkan hari
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDay = (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24);

  // format jam
  const timeString = time
    ? date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  if (diffDay === 0) {
    return time ? `Hari ini, ${timeString}` : "Hari ini";
  }

  if (diffDay === 1) {
    return time ? `Kemarin, ${timeString}` : "Kemarin";
  }

  // default format tanggal
  const dateString = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return time ? `${dateString}, ${timeString}` : dateString;
};

const countDownDate = (rawDate: string) => {
  const date = new Date(rawDate).getTime();
  const now = new Date().getTime();
  const diff = date - now;
  if (diff <= 0) {
    return 0;
  }

  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return daysLeft;
};

export { formatDate, countDownDate };
