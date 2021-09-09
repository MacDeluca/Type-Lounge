import { WORD_POOL } from "../constants";

export function getTestWords(numWords?: number): string[]{
    const shuffled = WORD_POOL.sort(() => 0.5 - Math.random());
    let arrOut = shuffled.slice(0, 25);
    return arrOut.join(' ').split('');
}
export const normalize = (value: number, len: number) => {
    if(value < len) return (value - 0) * 100 / (len - 0);
    else return 100;
}
export function timer(enable: boolean){
    var start = 0;
    var stop = 0;
    if(enable === true) start = performance.now()
    if(enable === false) {
        stop = performance.now();
        return start - stop;
    }
    
}