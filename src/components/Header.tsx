import {Grid, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
export const Header: React.FC = () => {
    const style = useStyles();
    return (
        <Grid container direction="row" spacing={2} className="App-header">
            <Grid item>
                <MenuIcon className={style.menuIcon} fontSize="large"/>
            </Grid>
            <Grid item>
                <p className={style.title}>T Y P E L O U N G E</p>
            </Grid>
        </Grid>
    );
}
const useStyles = makeStyles({
    menuIcon: {
        verticalAlign: 'middle',
    },
    title: {
        fontSize: '20px',
    }
});