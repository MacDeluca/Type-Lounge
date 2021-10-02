import Cookies, { Cookie } from "universal-cookie";
import { v4 } from "uuid";
import { COOKIE_SCORES, NUM_HIGH_SCORES, TYPING_CARD_INITIAL_STATE, WORD_POOL } from "./constants";
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
    var dt = new Date();
    let dateString =+ dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    switch(type){
        case 'reset':
            return {
                ...TYPING_CARD_INITIAL_STATE,
                test: payLoad.content,
                author: payLoad.author,
                score: null,
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
                    let count = 0;
                    let time = end();
                    let collection = new Map();
                    output.userString.forEach((word, index)=> collection.set(index, word));
                    test!.forEach((word, index) => collection.get(index) === word && (count += 1));
                    output = {
                        ...output,
                        time: time,
                        score: {
                            wpm: calculateWpm(count, time),
                            accuracy: parseInt((100*count/test!.length).toFixed(0)),
                            id: v4(),
                            date: dateString,
                        }
                    }
                }
            }
            return output
        default:
            return state;
    }
}

export const getCookieScores = (score: Score) => {
            const cookies = new Cookies();
            const storedScores = cookies.get(COOKIE_SCORES);
            if(storedScores){
                if (storedScores.length < NUM_HIGH_SCORES) {
                    storedScores.push(score);
                }
                if (score.wpm > storedScores[storedScores.length - 1].wpm) {
                    storedScores.pop();
                    storedScores.push(score);
                }
                let sortedScores = storedScores.sort((a: Score, b: Score) => b.wpm - a.wpm)
                cookies.set(COOKIE_SCORES, JSON.stringify(sortedScores), { path: '/' });
                return sortedScores  
            }else{
                console.log('called');
                cookies.set(COOKIE_SCORES, JSON.stringify([score]), { path: '/' });
                return [score]
            }

        }


export const renderScores = (scores: Score[] | null, stickyScores: boolean, score: Score | null, reset?: boolean) => {
    if(stickyScores && scores) {
        console.log('1')
        return true
    }
    if(!stickyScores && score){
        console.log('2')
        return true
    } 
    else{
        console.log('3')
        return false
    } 
}