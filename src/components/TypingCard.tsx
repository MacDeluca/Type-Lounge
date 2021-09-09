
import { Card, TextField, makeStyles, Grid, Button, CardContent, Typography, LinearProgress } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getTestWords, normalize, timer } from '../utility/helperFunctions';

interface TypingCardProps {

}
export const TypingCard: React.FC<TypingCardProps> = () => {
    const style = useStyles();
    const [input, setInput] = useState('');
    const [prevLen, setPrevLen] = useState(0);
    const [test, setTest] = useState<string[]>();
    const [userString, setUserString] = useState('');
    const setAndClear = (char: string) => {
        setInput(char);
        // if(userString.length === 1) timer(true);
        if(userString.length === test!.length -1) console.log(timer(false));
        if(char.length > prevLen) {
            setPrevLen(char.length);
            setUserString(c=> c += char.slice(-1));
        }
        if(char.length < prevLen) {
            setUserString(c=> c.slice(0,-1));
            setPrevLen(char.length);
        }
        if(/\s/g.test(char)){
            setInput('');
            setPrevLen(0);
        }
    }
    const reset = () => {
        setInput('');
        setUserString('');
        setTest(getTestWords());
    }
    useEffect(() => {
        reset();
    }, [])
    return (
        <Grid container direction="column" alignItems="center" spacing={3}>
            <div>
                <Grid item>
                    {test && <LinearProgress value={normalize(userString.length, test.length)} color="secondary" variant="determinate" className={style.root} />}
                </Grid>
                <Grid item className={style.root}>
                    <Card className={style.card}>
                        <CardContent>
                            <Typography className={style.speed} gutterBottom>Speed 10 WPM</Typography>
                            <Typography className={style.test}>
                                {test && test.map((letter, index) => {
                                    let color;
                                    if (index < userString.length) {
                                        color = (letter === userString[index] ? '#b8bb26' : '#fb4934');
                                    }
                                    return <span key={index} style={{ color: color }}>{letter}</span>
                                })}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
            <Grid item>
                <Card className={style.card}>
                    <TextField className={style.textField} inputProps={{ className: style.input }} variant="outlined" value={input} onChange={e=>setAndClear(e.target.value)} />
                    <Button onClick={() => reset()}><ReplayRoundedIcon style={{ color: "#b8bb26" }} fontSize="large" /></Button>
                </Card>
            </Grid>
        </Grid>
    )
}
const useStyles = makeStyles({
    root: {
        minWidth: 50,
        maxWidth: 600,
        marginRight: 50,
        marginLeft: 50
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b8bb26"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#b8bb26"
        },
    },
    input: {
        color: "#b8bb26"
    },
    progress: {
        width: "50vw",
    },
    speed: {
        textAlign: 'right',
        color: "#b8bb26",
    },
    test: {
        textAlign: 'left',
        fontSize: '18px',
    },
    card: {
        backgroundColor: '#1d2021',
        color: "#ebdbb2",
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        


    }
})