const getAvatar = (user) => {
  if (!user) return '';
  const { nom, prenom } = user;
  const firstLetter = prenom?.charAt(0);
  const secondLetter = nom?.charAt(0);

  return `${firstLetter}${secondLetter}`;
};

export default getAvatar;
