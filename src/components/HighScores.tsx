import { Button, Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core"
import { COLOURS } from "../utility/colours";
import {Score} from '../utility/types';
import { useContext, useEffect, useRef, useState } from "react";
import { renderScores, getCookieScores } from "../utility/helperFunctions";
import Cookies from "universal-cookie";
import { SettingsContext } from "../utility/context";
import { COOKIE_SCORES } from "../utility/constants";
const StyledTableCell = withStyles({
    root: {
        color: COLOURS.primary,
        borderBottom: 'none'
    }
    })(TableCell);
const StyledTableCellWin = withStyles({
    root: {
        color: COLOURS.textCurrent,
        borderBottom: 'none'
    }
    })(TableCell);
const StyledTableCellLose = withStyles({
    root: {
        color: COLOURS.secondary,
        borderBottom: 'none'
        
    }
    })(TableCell);

interface RenderRowsProps {
    Component: React.ComponentType<any>;
    score: Score;
    index: number;
}
const StyledRows: React.FC<RenderRowsProps> = ({Component, score, index}) => {

    return(
        <TableRow>
        <Component>{index}</Component>
        <Component component='th' scope='row'>{score.wpm}</Component>
        <Component>{score.accuracy}</Component>
        <Component>{score.date}</Component>
        </TableRow>
    )
}
interface HighScoresProps {
    score: Score | null;
}
export const HighScores: React.FC<HighScoresProps> = ({score}) => {
    const styles = useStyles();
    const {settings, setSettings} = useContext(SettingsContext);
    const cookies = new Cookies();
    const [scores, setScores] = useState<Score[] | null>(cookies.get(COOKIE_SCORES) ?? null);
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
        <div className={styles.root}>
            {renderScores(scores, settings.stickyScores, score) && 
                <TableContainer component={Card} variant="outlined" className={styles.table}>
                <Table size="small" aria-label="simple table" >
                    <TableHead>
                        <TableRow >
                            <StyledTableCellWin>#</StyledTableCellWin>
                            <StyledTableCellWin>WPM</StyledTableCellWin>
                            <StyledTableCellWin>Accuracy</StyledTableCellWin>
                            <StyledTableCellWin>Date</StyledTableCellWin>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {scores && scores.map((item, index) => {
                        if(index === 0){
                            if(score && score.wpm >= item.wpm) return <StyledRows key={index} Component={StyledTableCellWin} score={item} index={index + 1}/>
                        }else{
                            if(score && item.id === score.id) return <StyledRows key={index} Component={StyledTableCellLose} score={item} index={index + 1}/>
                        }
                        return <StyledRows key={index} Component={StyledTableCell} score={item} index={index + 1}/>
                    })}
                    </TableBody>
                </Table>
            </TableContainer> 
            }
        </div>
    )
}
const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    table: {
        backgroundColor: COLOURS.card,
    },
    tableCell: {
        color: COLOURS.primary
    }
})