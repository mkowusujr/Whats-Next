export const titleCase = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const toYear = timestamp => {
  const date = new Date(timestamp);
  return date.getFullYear();
};
