import {createContext} from 'react';
export interface ISettings {
    name: string;
    easyMode: boolean;
    playList: string;
    wordCount: number;
    darkMode: boolean;
}
export const SettingsContext = createContext<any>(null);
