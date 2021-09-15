import { Card, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core"
import { COLOURS } from "../utility/colours";
import Cookies from 'universal-cookie';
import {Score} from '../utility/types';
import { useEffect, useState } from "react";
import { ImportantDevicesTwoTone } from "@material-ui/icons";
import { compareStringsAsNums } from "../utility/helperFunctions";
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
export const HighScores: React.FC<HighScoresProps> = ({wpm, accuracy}) => {
    const styles = useStyles();
    const cookies = new Cookies();
    const [scores, setScores] = useState<string[]>([]);
    useEffect(()=>{
        var dt = new Date();
        let data = wpm.toString() + ',' 
        + accuracy.toString() + ',' 
        + dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
        cookies.set(data, wpm, {path:'/'});
        let unordered = cookies.getAll();
        let ordered = Object.keys(unordered).sort(compareStringsAsNums)
        setScores(ordered);
    },[wpm, accuracy])
    return(
        <div className={styles.root}>
            <TableContainer component={Card} variant="outlined" className={styles.table}>
                <Table size="small" aria-label="simple table" >
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>WPM</StyledTableCell>
                            <StyledTableCell>Accuracy</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {scores.map((score, index) => {
                        let data = score.split(',')
                        if(index === 0){
                            if(wpm >= parseInt(data[0])){
                                return(
                                    <TableRow key={score}>
                                    <StyledTableCellWin component='th' scope='row'>{data[0]}</StyledTableCellWin>
                                    <StyledTableCellWin>{data[1]}</StyledTableCellWin>
                                    <StyledTableCellWin>{data[2]}</StyledTableCellWin>
                                </TableRow>
                                )
                            }
                        }else{
                            if(parseInt(data[0]) === wpm){
                                return(
                                    <TableRow key={score}>
                                    <StyledTableCellLose component='th' scope='row'>{data[0]}</StyledTableCellLose>
                                    <StyledTableCellLose>{data[1]}</StyledTableCellLose>
                                    <StyledTableCellLose>{data[2]}</StyledTableCellLose>
                                    </TableRow>
                                        )
                            }
                        }
                        return(
                            <TableRow key={score}>
                            <StyledTableCell component='th' scope='row'>{data[0]}</StyledTableCell>
                            <StyledTableCell>{data[1]}</StyledTableCell>
                            <StyledTableCell>{data[2]}</StyledTableCell>
                        </TableRow>
                        )
                    }
                    )}
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