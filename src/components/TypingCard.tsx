
import { Card, TextField, makeStyles, Grid, Box, CardContent, Typography, LinearProgress, CardActions, IconButton, withStyles, createStyles, Theme } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { COLOURS } from '../utility/colours';
import { NUM_WORDS } from '../utility/constants';
import { getTestWords, normalize, start, end, calculateWpm, getRandomQuote } from '../utility/helperFunctions';
import { HighScores } from './HighScores';

const StyledLinearProgress = withStyles((theme: Theme) =>
    createStyles({
    colorPrimary: {
        backgroundColor: COLOURS.card,
    },
    bar: {
        backgroundColor: COLOURS.progressBarActive,
    },
}),
)(LinearProgress);

interface TypingCardProps {

}
export const TypingCard: React.FC<TypingCardProps> = () => {
    const style = useStyles();
    const [input, setInput] = useState('');
    const [test, setTest] = useState<string[]>();
    const [userString, setUserString] = useState<string[]>([]);
    const [time, setTime] = useState<number>();
    const [wpm, setWpm] = useState(-1);
    const [wordCount, setWordCount] = useState(-1);
    //60000 in a minute
    if(userString.length > 0){
        userString.length === 1 && start();
        if(userString.length === test!.length){
            let count = 0.00;
            let collection = new Map();
            userString.forEach((word, index)=> collection.set(index, word));
            test!.forEach((word, index) => collection.get(index) === word && (count += 1));
            wpm === -1 && setWpm(calculateWpm(count, time!));
            wordCount === -1 && setWordCount(count);
            console.log(wordCount, count);
        }
    }

    const setAndClear = (char: string) => {
        setInput(char);
        //userString.length === 0 && start();
        if(/\s/g.test(char)){
            setInput('');
            setUserString(arr=>[...userString,char.slice(0,-1)]);
            if(userString.length === test!.length-1){
                setTime(end());
            }
        }
    }
    const reset = async () => {
        let test = await getRandomQuote();
        setInput('');
        setUserString([]);
        setTest(test);
        setTime(undefined);
        setWordCount(-1);
        setWpm(-1);
    }
    useEffect(() => {
        reset();
    }, [])
    return (
        <Grid container direction="column" alignItems="center" spacing={3} className={style.root}>
            <div>
                <Box component={Grid} className={style.typingCard} boxShadow={4}>
                    <Card className={style.card} variant="outlined">
                    {test && <StyledLinearProgress value={normalize(userString.length, test.length)} variant="determinate" />}
                        <CardContent>
                            {time && <Typography className={style.wpm} gutterBottom>{wpm} WPM | {100*wordCount/NUM_WORDS}%</Typography>}
                            <Typography className={style.test}>
                                {test && test.map((word, index) => {
                                    let color;
                                    if(index === userString.length){
                                        color = COLOURS.textCurrent;
                                    }
                                    if (index < userString.length) {
                                        color = (word === userString[index] ? COLOURS.textCorrect : COLOURS.textIncorrect);
                                    }
                                    return <span key={index} style={{ color: color}}>{word} </span>
                                })}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <TextField className={style.textField} size="small" fullWidth inputProps={{ className: style.input }} variant="outlined" value={input} onChange={e=>setAndClear(e.target.value)} />
                                <IconButton onClick={() => reset()} color="inherit" size="small">
                                <ReplayRoundedIcon style={{ color: COLOURS.secondary }} fontSize="large" />
                                </IconButton>
                        </CardActions>
                        
                    </Card>
                </Box>
                {(time !== -1 && wpm !== -1) &&
                <Box component={Grid} boxShadow={4}>
                    <HighScores wpm={wpm} accuracy={100*wordCount/NUM_WORDS}/>
                </Box>
                }
                </div>
        </Grid>
    )
}
const useStyles = makeStyles({
    root: {
        marginTop: 200,
        marginRight: '10%',
        marginLeft: '10%',
        width: '80%',
        marginBottom: 200
    },
    typingCard: {
        minWidth: 50,
        maxWidth: 600,
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLOURS.secondary
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: COLOURS.secondary
        },
    },
    input: {
        color: COLOURS.primary
    },
    wpm: {
        textAlign: 'right',
        color: COLOURS.textCurrent,
    },
    test: {
        textAlign: 'left',
        fontSize: '18px',
    },
    card: {
        backgroundColor: COLOURS.card,
        color: COLOURS.primary,
    }
})