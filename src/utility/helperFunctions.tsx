import Cookies from "universal-cookie";
import { COOKIE_SCORES, NUM_HIGH_SCORES, WORD_POOL } from "./constants";
import { ReducerAction, Score, TypingInitialState } from "./types";

export const normalize = (value: number, len: number) => {
    if(value < len) return (value - 0) * 100 / (len - 0);
    else return 100;
}

var startTime: any;
var endTime;

export function start() {
    startTime = performance.now();
};

export function end() {
    endTime = performance.now();
    var timeDiff = endTime - startTime; //in ms 
    var seconds = Math.round(timeDiff);
    console.log(seconds + "milliseconds");
    return seconds;
}

export function calculateWpm(wordCount: number, milliseconds: number) {
    const MINUTE = 60000.00;
    const percentMinute = milliseconds / MINUTE;
    return Math.round(wordCount / (percentMinute));
}
export function compareStringsAsNums(a: string, b: string) {
    return parseInt(b) - parseInt(a);
}

export async function hardMode(){
    const response = await fetch('https://api.quotable.io/random?minLength=50&maxLength=800')
    const data = await response.json()
    // console.log(`${data.content} —${data.author}`)
    return({content: data.content.split(' '), author: data.author});
    
}
export function easyMode(numWords?: number){
    // old work!!!!!
        let wordsArr = WORD_POOL.sort(() => 0.5 - Math.random());
        let arrOut = wordsArr.slice(0, numWords);
        return {content: arrOut, author: ''};
}

export function typingCardReducer(state: TypingInitialState, action: ReducerAction): TypingInitialState{
    const {type, payLoad} = action;
    const {userString, test, time} = state;
    switch(type){
        case 'reset':
            return {
                ...state,
                input: '',
                test: payLoad.content,
                userString: [],
                time: undefined,
                wpm: -1,
                wordCount: -1,
                author: payLoad.author
            }
        case 'setAndClear':
            let output = {...state, input: payLoad};
            if(/\s/g.test(payLoad)){
                output = {
                    ...output,
                    input: '',
                    userString: [...userString,payLoad.slice(0,-1)]
                }
                if(userString.length === test!.length - 1){
                    output = {
                        ...output,
                        time: end()
                    }
                }
            }
            return output
        case 'calculate':
                let count = 0;
                let collection = new Map();
                userString.forEach((word, index)=> collection.set(index, word));
                test!.forEach((word, index) => collection.get(index) === word && (count += 1));
        return {
            ...state, 
            wpm: calculateWpm(count, time!), 
            wordCount: count
        }
        default:
            return state;
    }
}

export const storeScores = (wpm?: number, accuracy?: number) => {
    const cookies = new Cookies();
    var dt = new Date();
    var dateString = + dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    let storedScores = cookies.get(COOKIE_SCORES)
    console.log(wpm, accuracy)
    if(!wpm || !accuracy){
        console.log('showing scores')
        return storedScores;
    }
    let score = { wpm: wpm, accuracy: accuracy, date: dateString, name: 'hello' };
    if (!storedScores) {
        cookies.set(COOKIE_SCORES, JSON.stringify([score]), { path: '/' });
        return [score]
    } else {
        console.log(storedScores[storedScores.length - 1]);
        if (storedScores.length < NUM_HIGH_SCORES) {
            storedScores.push(score);
        } else {
            if (score.wpm! > storedScores[storedScores.length - 1].wpm) {
                storedScores.pop();
                storedScores.push(score);
            }
        }
        let sortedScores = storedScores.sort((a: Score, b: Score) => b.wpm - a.wpm)
        cookies.set(COOKIE_SCORES, JSON.stringify(sortedScores), { path: '/' });
        return sortedScores
    }
}

export const renderScores = (stickyScores: boolean, wpm: number) => {
    if(stickyScores){
        return true
    }else{
        return wpm > 0
    }
}