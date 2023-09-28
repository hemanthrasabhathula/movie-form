
export const allLanguages = ['Te', 'Hi', 'Ta', 'Kn', 'Ml', 'En'];

export const AHA = 'Aha';
export const HOTSTAR = 'Hotstar';
export const NETFLIX = 'Netflix';
export const PRIMEVIDEO = 'Prime Video';
export const SONYLIV = 'Sony LIV';
export const SUNNXT = 'Sun NXT';
export const ZEE5 = 'ZEE5';


export const AHA_REGEX = /aha\.video/;
export const HOTSTAR_REGEX = /hotstar\.com/;
export const NETFLIX_REGEX = /netflix\.com/;
export const PRIMEVIDEO_REGEX = /primevideo\.com/;
export const SONYLIV_REGEX = /sonyliv\.com/;
export const SUNNXT_REGEX = /sunnxt\.com/;
export const ZEE5_REGEX = /zee5\.com/;

export const platformRegexMap = new Map([
    [AHA,AHA_REGEX],
    [HOTSTAR,HOTSTAR_REGEX],
    [NETFLIX,NETFLIX_REGEX],
    [PRIMEVIDEO,PRIMEVIDEO_REGEX],
    [SONYLIV,SONYLIV_REGEX],
    [SUNNXT,SUNNXT_REGEX],
    [ZEE5,ZEE5_REGEX]
]
);