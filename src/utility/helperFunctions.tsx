import { WORD_POOL } from "./constants";

export function getTestWords(numWords?: number){
    // old work!!!!!
        let wordsArr = WORD_POOL.sort(() => 0.5 - Math.random());
        let arrOut = wordsArr.slice(0, numWords);
        return arrOut;
}
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

export async function getRandomQuote(){
    const response = await fetch('https://api.quotable.io/random?minLength=100&maxLength=400')
    const data = await response.json()
    // console.log(`${data.content} —${data.author}`)
    return(data.content.split(' '));
    
}