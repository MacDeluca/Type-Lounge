import { AppBar, Button, Drawer, Grid, IconButton, makeStyles, Toolbar, Typography, Theme, createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
export const Header: React.FC = () => {
    const style = useStyles();
    const [show, setShow] = useState(false);
    return (
        <>
        {/* <Drawer anchor={'left'} open={show} className={style.drawer}>
            hello worls
        </Drawer> */}
            <div className={style.root}>
                <AppBar>
                    <Toolbar className='App-header'>
                        <IconButton edge="start" className={style.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h3" color="inherit" className={style.title}>
                            T Y P E L O U N G E
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            fontSize: '20px',
        },
        drawer: {
            width: 500,
        },
    }),
);
;