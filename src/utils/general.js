const compare = (a, b) => {
  const user1 = sortOrder ? a : b;
  const user2 = sortOrder ? b : a;

  if (user1.name < user2.name) {
    return -1;
  }
  if (user1.name > user2.name) {
    return 1;
  } else return 0;
};
