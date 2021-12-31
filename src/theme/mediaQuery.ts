import { generateMedia } from 'styled-media-query';

//* When use styles-components with typescript. This is the better way to build media querys.

/*
  * Looks much simpler and easier to read
  * 100% understood by Prettier
  * Perfectly works in TS with no added magic
  * Is probably a bit faster because additional calls to css`...` are removed tada
*/

//* Use 1 - You build the media queries and types.

type QueryWidth = 'max-width' | 'min-width';

const customMediaQuery = (width: number, typeQueryWidth: QueryWidth = 'max-width'): string =>
    `@media (${typeQueryWidth}: ${width}px)`;

const media = {
    custom: customMediaQuery,
    desktop: customMediaQuery(922),
    tablet: customMediaQuery(768),
    phone: customMediaQuery(576)
};

//* Use 2 - Third-party library. You must install with npm i or yarn add styled-media-query

//* example media queries
const BREAKPOINT_XS = 480;
const BREAKPOINT_SM = 576;
const BREAKPOINT_MD = 768;
const BREAKPOINT_LG = 992;
const BREAKPOINT_XL = 1366;
const BREAKPOINT_XXL = 1600;

const media2 = generateMedia({
    xs: `${BREAKPOINT_XS}px`,
    sm: `${BREAKPOINT_SM}px`,
    md: `${BREAKPOINT_MD}px`,
    lg: `${BREAKPOINT_LG}px`,
    xl: `${BREAKPOINT_XL}px`,
    xxl: `${BREAKPOINT_XXL}px`
});

//* use example

/*
    ${media.custom(1366, 'max-width)`
        * your CSS code for custom breakpoint 
    `};

    ${media2.greaterThan('sm')`
        * your CSS code for md breakpoint 
    `};
*/

export {
    customMediaQuery,
    media,
};