const getAvatar = (user) => {
  const { lastName, firstName } = user;
  const firstLetter = firstName.charAt(0);
  const secondLetter = lastName.charAt(0);

  return `${firstLetter}${secondLetter}`;
};

export default getAvatar;
