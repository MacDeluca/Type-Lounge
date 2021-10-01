
import { Card, TextField, makeStyles, Grid, Box, CardContent, Typography, LinearProgress, CardActions, IconButton, withStyles, createStyles, Theme, useTheme } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import * as React from 'react';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { SettingsContext } from '../utility/context';
import { hardMode, normalize, start, easyMode, typingCardReducer, renderScores } from '../utility/helperFunctions';
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



interface TypingCardProps {}
export const TypingCard: React.FC<TypingCardProps> = () => {
    const theme = useTheme();
    const style = useStyles(theme);
    const inputRef = useRef<HTMLInputElement>(null);
    const {settings, setSettings} = useContext(SettingsContext);
    const [state, dispatch] = useReducer(typingCardReducer, {
        input: '',
        test: [],
        userString: [],
        time: undefined,
        wpm: -1,
        wordCount: -1,
        author: ''
    });
    const {input, test, userString, time, wpm, wordCount, author} = state;
    
    if(input.length === 1 && userString.length === 0) start();
    if(userString.length === test!.length && (wpm && wordCount === -1)) dispatch({type: 'calculate'});
    
    const reset = async () => {
        inputRef.current?.focus();
        dispatch({type: 'reset', payLoad: settings.easyMode ? easyMode(settings.wordCount) : await hardMode()})
    }
    useEffect(() => {
        reset();
    }, [settings.wordCount, settings.easyMode, settings.stickyScores])
    return (
        <Grid container direction="column" alignItems="center" spacing={3} className={style.root}>
            <div>
            {wpm > 0 ? <Typography className={style.wpm} gutterBottom style={{color: theme.palette.text.primary}}>
                <span style={{color:theme.palette.primary.main}}>{wpm}</span> wpm  | 
                <span style ={{color:theme.palette.primary.main}}> {(100*wordCount/test!.length).toFixed(0)}</span> % | 
                <span style ={{color:theme.palette.primary.main}}> {(time!/1000).toFixed(1)}</span> secs
                </Typography>
                : <Typography gutterBottom style={{color: 'transparent'}}>.</Typography>
        }
                <Box component={Grid} boxShadow={4}>
                    <Card variant="outlined" style={{backgroundColor: theme.palette.background.paper}}>
                    {test && <StyledLinearProgress value={normalize(userString.length, test.length)} variant="determinate" />}
                        <CardContent>
                            <Typography className={style.test}>
                                {test && test.map((word, index) => {
                                    let color;
                                    index === userString.length && (color = theme.palette.secondary.main);
                                    index < userString.length && (color = (word === userString[index] ? theme.palette.text.secondary : theme.palette.error.main));
                                    return <span key={index} style={{ color: color}}>{word} </span>
                                })}
                                <br/>
                                {settings.easyMode === false && (test && author) && <i style={{color: theme.palette.text.secondary}}>- {author}</i>}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <TextField 
                                className={style.textField} 
                                size="small" 
                                fullWidth 
                                variant="outlined" value={input}  
                                onChange={e=>dispatch({type: 'setAndClear', payLoad: e.target.value})}
                                onKeyDown={e=> (e.key === 'Enter' && test!.length === userString.length) && reset()}
                                inputRef={inputRef}
                                />
                                <IconButton onClick={() => reset()} color="inherit" size="small">
                                <ReplayRoundedIcon style={{ color: theme.palette.text.secondary }} fontSize="large" />
                                </IconButton>
                        </CardActions>
                        
                    </Card>
                </Box>
                {renderScores(settings.stickyScores, wpm) &&
                <Box component={Grid} boxShadow={4}>
                    <HighScores wpm={wpm} accuracy={100*wordCount/test!.length}/>
                </Box>
                }
                </div>
        </Grid>
    )
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        marginTop: 200,
        marginRight: '10%',
        marginLeft: '10%',
        width: '80%',
        marginBottom: 200,
    },
    textField: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            borderColor: theme.palette.text.secondary
        },
    },
    wpm: {
        textAlign: 'right',
    },
    test: {
        textAlign: 'left',
        fontSize: '18px',
    },
}))