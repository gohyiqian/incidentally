export const getData = () => {
  return fetch("/backend").then((res) => res.json());
};
