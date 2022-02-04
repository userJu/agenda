import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blackColor: string;
      blueColor: string;
      grayColor: string;
      whiteColor: string;
    };
    flatShadow: string;
  }
}
