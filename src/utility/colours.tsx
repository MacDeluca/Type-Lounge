import { createTheme, ThemeOptions } from "@material-ui/core";
import { ColourTheme } from "./types";

export const COLOURS: ColourTheme = {
    primary: "#fbf1c7",
    secondary: '#b8bb26',
    textCorrect: '#b8bb26',
    textIncorrect: '#fb4934',
    textCurrent: '#d3869b',
    progressBarActive: '#d3869b',
    header: '#32302f',
    card: '#1d2021',
}

export const LIGHT_COLOURS: ColourTheme = {
    primary: "blue",
    secondary: '#b8bb26',
    textCorrect: '#b8bb26',
    textIncorrect: '#fb4934',
    textCurrent: '#d3869b',
    progressBarActive: '#d3869b',
    header: '#32302f',
    card: '#1d2021',
}

export const darkTheme: ThemeOptions = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#83a598',
            dark: '#32302f',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: '#fbf1c7',
            secondary: '#b8bb26',
        },
        error: {
            main: '#fe8019',
        },
        background: {
            paper: '#1d2021',
            default: '#282828',
        },
    }
})

export const lightTheme: ThemeOptions = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#d3869b',
            dark: '#32302f',
        },
        secondary: {
            main: '#f50057',
        },
        text: {
            primary: '#1d2021',
            secondary: '#b8bb26',
        },
        error: {
            main: '#fb4934',
        },
        background: {
            paper: '#fbf1c7',
            default: '#282828',
        },
    }
})