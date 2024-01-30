export const hello = () => {
  console.log("Hello");
};

export interface TystieDriver {
  init: () => string;
}
