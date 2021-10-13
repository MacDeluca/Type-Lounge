import { Box, Button, Card, createStyles, Grid, makeStyles, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, useTheme, withStyles, Zoom } from "@material-ui/core"
import { COLOURS } from "../utility/colours";
import {Score} from '../utility/types';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { useContext, useEffect, useRef, useState } from "react";
import { renderScores, getCookieScores } from "../utility/helperFunctions";
import Cookies from "universal-cookie";
import { SettingsContext } from "../utility/context";
import { COOKIE_SCORES } from "../utility/constants";
import { Alert } from "@mui/material";

interface RenderRowsProps {
    Component: React.ComponentType<any>;
    score: Score;
    index: number;
    color: string;
}
const StyledRows: React.FC<RenderRowsProps> = ({Component, score, index, color}) => {
    let style = {color: color, borderBottom: 'none'}
    return(
        <TableRow>
        <Component style={style}>{index}</Component>
        <Component style={style}>{score.wpm}</Component>
        <Component style={style}>{score.accuracy}</Component>
        <Component style={style}>{score.date}</Component>
        </TableRow>
    )
}
interface HighScoresProps {
    score: Score | null;
}
export const HighScores: React.FC<HighScoresProps> = ({score}) => {
    const styles = useStyles();
    const theme = useTheme();
    const {settings, setSettings} = useContext(SettingsContext);
    const cookies = new Cookies();
    const [scores, setScores] = useState<Score[] | null>(cookies.get(COOKIE_SCORES) ?? null);
    const [scoreAlert, setScoreAlert] = useState(false);

    useEffect(()=>{
        if(settings.reset){
            setSettings({...settings, reset: false});
            setScores(null);
        }
    },[settings.reset])

    useEffect(()=>{
        score && setScores(getCookieScores(score))
    } ,[score, settings.stickyScores])
    return(
        <>
        {renderScores(scores, settings.stickyScores, score) &&
            <Box component={Grid} boxShadow={6} className={styles.root}>
            
                <TableContainer component={Card} variant="outlined">
                <Table size="small" aria-label="simple table" >
                    <TableHead>
                        <TableRow >
                            {['#', 'WPM', 'Accuracy', 'Date'].map((value) =>
                                <TableCell key={value} style={{color: theme.palette.secondary.main}}>{value}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {scores && scores.map((item, index) => {
                        if(index === 0){
                            if(score && score.wpm >= item.wpm) {
                                console.log('high score');
                                !scoreAlert && setScoreAlert(true)
                                return <StyledRows key={index} Component={TableCell} color={theme.palette.primary.main} score={item} index={index + 1}/>
                            } 
                        }else{
                            if(score && item.id === score.id) 
                                return <StyledRows key={index} Component={TableCell} color={theme.palette.text.secondary} score={item} index={index + 1}/>
                        }
                        return <StyledRows key={index} Component={TableCell} color={theme.palette.text.primary} score={item} index={index + 1}/>
                    })}
                    </TableBody>
                </Table>
            </TableContainer> 
            <Button onClick={()=>setScoreAlert(true)}>{scoreAlert.toString()}</Button>
        </Box>
        }
        <Snackbar 
                open={scoreAlert} 
                autoHideDuration={3000}
                style={{paddingBottom: 80}} 
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                onClose={()=>{
                    setScoreAlert(false)
                    console.log('Setting false')
                }} 
                TransitionComponent={Slide}
            >
                <Alert icon={<SportsScoreIcon fontSize='inherit'/>}severity="success" variant="filled" style={{backgroundColor: theme.palette.secondary.main}}>New High Score of {score && score.wpm} WPM!</Alert>
            </Snackbar>
        </>
    
    )
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        marginTop: 20,
        marginBottom: 110,
    }
}))