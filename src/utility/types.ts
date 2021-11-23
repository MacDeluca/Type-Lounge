import react from 'react';
export interface Score {
    wpm: number;
    accuracy: number;
    date: string;
    id: string;
}
export interface ReducerAction {
    type: string;
    fieldName?: string;
    payLoad?: any;
}
export interface Test {
    content: string[],
    author: string,
}
export interface TypingInitialState {
    test: {
        content: string[],
        author: string,
    }
    userString: string[];
    //time: number | null;
    score: Score | null;
    bonus: number;
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