
import { Card, TextField, makeStyles, Grid, Box, CardContent, Typography, LinearProgress, CardActions, IconButton, withStyles, createStyles, Theme, useTheme, Zoom, Collapse, Grow, Button } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import * as React from 'react';
import { SetStateAction, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { MIN_ACCURACY, MIN_WPM, TYPING_CARD_INITIAL_STATE } from '../utility/constants';
import { SettingsContext } from '../utility/context';
import { hardMode, normalize, start, easyMode, renderScores, end, calculateWpm, generateScore, testNewHighScore, doWordsMatch } from '../utility/helperFunctions';
import { Score, Test, TypingInitialState } from '../utility/types';
import { HighScores } from './HighScores';

const StyledLinearProgress = withStyles((theme: Theme) =>
    createStyles({
    colorPrimary: {
        backgroundColor: theme.palette.background.paper,
    },
    bar: {
        backgroundColor: theme.palette.primary.main,
    },
}),
)(LinearProgress);



interface TypingCardProps {
    setSpawn?: any;
    spawn?: boolean;
}
export const TypingCard: React.FC<TypingCardProps> = ({setSpawn, spawn}) => {
    const theme = useTheme();
    const style = useStyles(theme);
    const inputRef = useRef<HTMLInputElement>(null);
    const {settings, setSettings} = useContext(SettingsContext);
    const [input, setInput] = useState('');
    const [typingState, setTypingState] = useState<TypingInitialState>(TYPING_CARD_INITIAL_STATE);
    const {test, userString, score} = typingState;


    const handleInput = (key: string) => {
        setInput(key);
        if(input.length === 1 && userString.length === 0) start();
        if(key.indexOf(' ') >= 0){
            if(userString.length === test.content.length) {
                setTypingState({...typingState, userString: []})
                reset();
            }else{
                setTypingState({...typingState, userString: [...userString,key.slice(0,-1)]})
            }
            setInput('')
        }
    }
    const reset = async () => {
        inputRef.current?.focus();
        setTypingState({...TYPING_CARD_INITIAL_STATE, test: settings.easyMode ? easyMode(settings.wordCount) : await hardMode()})
    }
    useEffect(() => {
        if(doWordsMatch(userString, test.content)) setSpawn({spawn: !spawn, num: 1}); //Function took: 0.15
        
        let genScore = generateScore(userString, test.content); //Function took: 0.2999999523162842
        if(genScore){
            let {score} = genScore;
            if(score.accuracy >= MIN_ACCURACY && score.wpm >= MIN_WPM) setSpawn({spawn: !spawn, num: test.content.length + 1})
            if(testNewHighScore(score)) setSpawn ({spawn: !spawn, num: test.content.length * 2})
            setTypingState({...typingState, score: score});
    }
    },[userString])
    useEffect(() => {
        reset();
    }, [settings.wordCount, settings.easyMode, settings.stickyScores])
    return (
        <Grow in={true} timeout={600}>
        <Grid container direction="column" alignItems="center" spacing={3} className={style.root}>
            <div className={style.card}>
            {score ? <Typography className={style.wpm} gutterBottom style={{color: theme.palette.text.primary}}>
                <span style={{color:theme.palette.primary.main}}>{score.wpm}</span> wpm  | 
                <span style ={{color:theme.palette.primary.main}}> {score.accuracy}</span> % 
                {/* <span style ={{color:theme.palette.primary.main}}> {(time!/1000).toFixed(1)}</span> secs */}
                </Typography>
                : <Typography gutterBottom style={{color: 'transparent'}}>{'\xa0'}</Typography>
        }
                <Box component={Grid} boxShadow={6}>
                    <Card variant="outlined" style={{backgroundColor: theme.palette.background.paper}}>
                    {test && <StyledLinearProgress value={normalize(userString.length, test.content.length)} variant="determinate" />}
                        <CardContent>
                        <div className={style.wpm} style={{color: theme.palette.text.secondary}}>Bonus: </div>
                            <Typography className={style.test}>
                                {test && test.content.map((word, index) => {
                                    let color;
                                    let wordWithSpaces = word + '\xa0'
                                    index === userString.length && (color = theme.palette.secondary.main);
                                    index < userString.length && (color = (word === userString[index] ? theme.palette.text.secondary : theme.palette.error.main));
                                    return <span key={index} style={{ color: color}}>{wordWithSpaces} </span>
                                })}
                                {settings.easyMode === false && 
                                (test.content && test.author) && 
                                <i style={{color: theme.palette.primary.main}}><br/><br/>- {test.author}</i>}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <TextField 
                                className={style.textField} 
                                size="small" 
                                fullWidth 
                                variant="outlined" value={input}  
                                onChange={e=>handleInput(e.target.value)}
                                inputRef={inputRef}
                                />
                                <IconButton onClick={() => reset()} color="inherit" size="small">
                                <ReplayRoundedIcon style={{ color: theme.palette.text.secondary }} fontSize="large" />
                                </IconButton>
                        </CardActions>
                        
                    </Card>
                </Box>
                {settings.stickyScores
                ? <HighScores score={score} />
                : <Collapse in={score !== null} timeout={380}><HighScores score={score} /></Collapse>
                }
                
                </div>
        </Grid>
        </Grow>
    )
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        marginTop: 100,
        marginRight: '10%',
        marginLeft: '10%',
        width: '80%',
        height: '100%',
    },
    card: {
        minWidth: 50,
        maxWidth: 800,
        opacity: '0.85',
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary
        },
        // "& .MuiInputLabel-outlined.Mui-focused": {
        //     borderColor: theme.palette.text.secondary
        // },
    },
    wpm: {
        textAlign: 'right',
    },
    test: {
        textAlign: 'left',
        fontSize: '18px',
    },
}))