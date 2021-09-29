import react from 'react';
export interface Score {
    wpm: number;
    accuracy: number;
    date: string;
    name: string;
}
export interface ReducerAction {
    type: string;
    fieldName?: string;
    payLoad?: any;
}

export interface TypingInitialState {
    input: string;
    test: string[];
    userString: string[];
    time: number | undefined;
    wpm: number;
    wordCount: number;
    author: string;
}

export interface ColourTheme {
    primary: string;
    secondary: string;
    textCorrect: string;
    textIncorrect: string;
    textCurrent: string;
    progressBarActive: string;
    header: string;
    card: string;
}