import { DefaultTheme } from "styled-components";

const deviceSizes = {
  mobile: "770px",
  tablet: "1220px",
  laptop: "1460px",
  desktop: "1700px",
};

export const mainTheme: DefaultTheme = {
  colors: {
    blackColor: "#2f3640",
    lightBlackColor: "#353b48",
    blueColor: "#192a56",
    grayColor: "#718093",
    buttonColor: "#7f8fa6",
    lightBeigeColor: "#dcdde1",
    whiteColor: "#f5f6fa",
  },
  size: {
    mobile: `screen and (max-width:${deviceSizes.mobile})`,
    // tabletS: `screen and (max-width:1023px)`,
    tablet: `screen and (max-width:${deviceSizes.tablet})`,
    // tabletL: `screen and (max-width:1280px)`,
    laptop: `screen and (max-width:${deviceSizes.laptop})`,
    desktop: `screen and (max-width:${deviceSizes.desktop})`,
  },
  flatShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px`,
  bigShadow: `rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;`,
};
