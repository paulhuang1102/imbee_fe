interface LooseObject {
  [key: string]: any;
}

export const pixel: LooseObject = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 400,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const size: LooseObject = Object.keys(pixel).reduce(
  (acc: LooseObject, item) => {
    acc[item] = `${pixel[item]}px)`;
    return acc;
  },
  {}
);

export const device = Object.keys(pixel).reduce((acc: LooseObject, item) => {
  acc[item] = `@media screen and (min-width: ${pixel[item]}px)`;
  return acc;
}, {});
