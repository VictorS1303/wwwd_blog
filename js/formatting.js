export function formatDate(date, { day = "numeric", month = "long", year = "numeric", timeZone = "Europe/Copenhagen" } = {}) {
  return new Intl.DateTimeFormat("en-US", {
    day,
    month,
    year,
    timeZone,
  }).format(new Date(date));
}