
import { Card, TextField, makeStyles, Grid, Box, CardContent, Typography, LinearProgress, CardActions, IconButton, withStyles, createStyles, Theme, useTheme, Zoom, Collapse, Grow } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import * as React from 'react';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { v4 } from 'uuid';
import { TYPING_CARD_INITIAL_STATE } from '../utility/constants';
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
    const [state, dispatch] = useReducer(typingCardReducer, TYPING_CARD_INITIAL_STATE);
    const {input, test, userString, time, author, score} = state;
    if(input.length === 1 && userString.length === 0) start();
    const reset = async () => {
        inputRef.current?.focus();
        dispatch({type: 'reset', payLoad: settings.easyMode ? easyMode(settings.wordCount) : await hardMode()})
    }
    useEffect(() => {
        reset();
    }, [settings.wordCount, settings.easyMode, settings.stickyScores])
    return (
        <Grow in={true} timeout={600}>
        <Grid container direction="column" alignItems="center" spacing={3} className={style.root}>
            <div className={style.card}>
            {score ? <Typography className={style.wpm} gutterBottom style={{color: theme.palette.text.primary}}>
                <span style={{color:theme.palette.primary.main}}>{score.wpm}</span> wpm  | 
                <span style ={{color:theme.palette.primary.main}}> {score.accuracy}</span> % | 
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
                                    let wordWithSpaces = word + '\xa0'
                                    index === userString.length && (color = theme.palette.secondary.main);
                                    index < userString.length && (color = (word === userString[index] ? theme.palette.text.secondary : theme.palette.error.main));
                                    return <span key={index} style={{ color: color}}>{wordWithSpaces} </span>
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
        marginTop: 150,
        marginRight: '10%',
        marginLeft: '10%',
        width: '80%',
        //marginBottom: 200,
    },
    card: {
        minWidth: 50,
        maxWidth: 600,
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