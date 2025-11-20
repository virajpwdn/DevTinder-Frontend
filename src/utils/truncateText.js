export const truncateText = (text, maxCharacters = 250) => {
  if (!text) return "";

  if (text.length > maxCharacters) {
    return text.slice(0, maxCharacters) + "...";
  }

  return text
};
