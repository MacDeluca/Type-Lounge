import {createContext} from 'react';
import { ColourTheme } from './types';
export interface ISettings {
    name: string | null;
    easyMode: boolean;
    playList: string;
    wordCount: number;
    darkMode: boolean;
    stickyScores: boolean;
    spawn: boolean;
}
export const SettingsContext = createContext<any>(null);
