export const randomTime = () => {
  // Get a random time between 10min and 3h
  const hours = Math.floor(Math.random() * 2);
  const minutes = Math.floor(Math.random() * (60 - 10) + 10);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours > 0 ? hours + ":" : ""}${minutes < 10 ? "0" : ""}${minutes}${
    seconds < 10 ? ":0" : ":"
  }${seconds}`;
};
