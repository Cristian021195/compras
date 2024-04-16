import { create } from 'zustand'        
import { Exchange, IConfig, TFont, TSound, TTheme } from '../Types';

export const ZConfig = create<IConfig>((set) => ({
    theme: localStorage.getItem('theme') === null ? 'light' : localStorage.getItem('theme') as TTheme,
    font: localStorage.getItem('font') === null ? 'md' : localStorage.getItem('font') as TFont,
    sound: localStorage.getItem('sound') === null ? 'false' : localStorage.getItem('sound') as TSound,
    exchanges: localStorage.getItem('exchanges') === null ? [] : JSON.parse(localStorage.getItem('exchanges')!) as Exchange[],
    switchTheme: () => set((state:IConfig) => {
        if(state.theme === 'light'){
            localStorage.setItem('theme', 'dark');
            document.body.style.backgroundColor = '#000000';
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
            return {theme: 'dark'}
        }else{            
            localStorage.setItem('theme', 'light');
            document.body.style.backgroundColor = '#ffffff';
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FF7F50');
            return {theme: 'light'}
        }
    }),
    switchFontSize: (v:TFont) => set((state:IConfig) => {
        localStorage.setItem('font', v);
        document.body.className = 'font-'+v;
        return {font: v}        
    }),
    switchSound: () => set((state:IConfig) => {
        if(state.sound === 'true'){
            localStorage.setItem('sound', 'false');
            return {sound: 'false'}
        }else{
            localStorage.setItem('sound', 'true');
            return {sound: 'true'}
        }
    }),
    addOrReplaceExchange: (v: Exchange) => set((state:IConfig) => {        
        let indx = state.exchanges.findIndex(obj => obj.exchange === v.exchange);
        if(indx !== -1){
            state.exchanges[indx] = v;
            localStorage.setItem('exchanges', JSON.stringify(state.exchanges));
            return {exchanges: state.exchanges}
        }else{
            localStorage.setItem('exchanges', JSON.stringify([...state.exchanges, v]));
            return {exchanges: [...state.exchanges, v]}
        }
    }),
    resetConfig: ()=> set((state:IConfig) => {
        localStorage.removeItem('theme');
        localStorage.removeItem('font');
        localStorage.removeItem('sound');
        localStorage.removeItem('exchanges');
        state.font='md';
        state.sound='false';
        state.theme='light';
        state.exchanges=[];
        return {
            font:'md',
            sound:'false',
            theme:'light',
            exchanges:[]
        }        
    })
}))

//