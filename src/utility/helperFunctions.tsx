import { WORD_POOL } from "../constants";

export function getTestWords(numWords?: number): string[]{
    const shuffled = WORD_POOL.sort(() => 0.5 - Math.random());
    let arrOut = shuffled.slice(0, numWords);
    //return arrOut.join(' ').split('');
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