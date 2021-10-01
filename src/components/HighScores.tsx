import { Card, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core"
import { COLOURS } from "../utility/colours";
import {Score} from '../utility/types';
import { useContext, useEffect, useState } from "react";
import { storeScores } from "../utility/helperFunctions";
import Cookies from "universal-cookie";
import { SettingsContext } from "../utility/context";
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
interface HighScoresProps {
    wpm: number,
    accuracy: number
}
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
export const HighScores: React.FC<HighScoresProps> = ({wpm, accuracy}) => {
    const styles = useStyles();
    const {settings} = useContext(SettingsContext);
    const [scores, setScores] = useState<Score[]>([]);
    useEffect(()=>setScores(storeScores(wpm,accuracy)),[wpm, accuracy, settings.stickyScores])
    return(
        <div className={styles.root}>
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
                    {scores.map((score, index) => {
                        if(index === 0){
                            if(wpm >= score.wpm) return <StyledRows key={index} Component={StyledTableCellWin} score={score} index={index + 1}/>
                        }else{
                            if(score.wpm === wpm) return <StyledRows key={index} Component={StyledTableCellLose} score={score} index={index + 1}/>
                        }
                        return <StyledRows key={index} Component={StyledTableCell} score={score} index={index + 1}/>
                    })}
                    </TableBody>
                </Table>
            </TableContainer> 
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