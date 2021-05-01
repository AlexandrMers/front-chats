export const shortName = (name: string) => {
  const short = name.split(" ");
  const first = short[0][0];
  const second = short[1] ? short[1][0] : first[1];

  return `${first}${second}`;
};
