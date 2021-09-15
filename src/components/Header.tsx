import { AppBar, Button, Drawer, Grid, IconButton, makeStyles, Toolbar, Typography, Theme, createStyles, List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { COLOURS } from '../utility/colours';
export const Header: React.FC = () => {
    const style = useStyles();
    const [show, setShow] = useState(false);
    const settingsDrawer = () => (
        <List>
            <ListItem button>
                <ListItemText primary={'User Name'}/>
            </ListItem>
        </List>
    )
    return (
            <div>
                <AppBar className={style.root}>
                    <Toolbar>
                        <IconButton edge="start" className={style.menuButton} color="inherit" aria-label="menu" onClick={()=>setShow(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography color="inherit" className={style.title}>
                            T Y P E L O U N G E
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer anchor={'left'} open={show} onClose={()=>setShow(false)} classes={{paper: style.paper}}>
                    {settingsDrawer}
                </Drawer>
            </div>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: COLOURS.header,
            color: COLOURS.primary,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            fontSize: '19px',
        },
        paper: {
            background: COLOURS.card,
            color: COLOURS.primary
        }
    }),
);
;