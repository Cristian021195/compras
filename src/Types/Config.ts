import { Exchange } from "./Exchange";

export type TTheme = 'light' | 'dark';
export type TFont = 'sm' | 'md' | 'lg';
export type TSound = 'true' | 'false';
export interface IConfig {
    theme: TTheme,
    font: TFont,
    sound: TSound,
    exchanges: Exchange[]
    switchTheme: ()=>void,
    switchFontSize: (v:TFont)=>void,
    switchSound: ()=>void,
    addOrReplaceExchange: (v:Exchange) => void
    resetConfig: () => void
}