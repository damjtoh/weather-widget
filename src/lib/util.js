export const toUTCDate = timestamp => {
  // Multiply by 1000 because JS works in milliseconds instead of the UNIX seconds
  const date = new Date(timestamp * 1000);

  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
  let day = date.getUTCDate();
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
