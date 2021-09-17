import { AppBar, Button, Drawer, Grid, IconButton, makeStyles, Toolbar, Typography, Theme, createStyles, List, ListItemIcon, ListItemText, ListItem, ListItemSecondaryAction, Switch, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import { useContext, useState } from 'react';
import { COLOURS } from '../utility/colours';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import SpeedIcon from '@material-ui/icons/Speed';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { SettingsContext } from '../utility/context';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
export const Header: React.FC = () => {
    const style = useStyles();
    const {settings, setSettings} = useContext(SettingsContext);
    console.log(settings);
    const [show, setShow] = useState(false);
    const settingsDrawer = () => (
        <div>
        <List>
            <ListItem button>
                <ListItemText primary={'User Name'}/>
            </ListItem>
        </List>
        </div>
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
                    <List>
                        <ListItem>
                            <ListItemText primary={'Settings'}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemIcon><PersonIcon style={{color:COLOURS.primary}}/></ListItemIcon>
                            <ListItemText primary={settings.name}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><InvertColorsIcon style={{color:COLOURS.primary}}/></ListItemIcon>
                            <ListItemText primary={'Dark Mode'}/>
                            <ListItemSecondaryAction>
                                <Switch
                                    edge="end"
                                    checked={settings.darkMode}
                                    onChange={()=>setSettings({...settings, darkMode:!settings.darkMode})}
                                />
                        </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><SpeedIcon style={{color:COLOURS.primary}}/></ListItemIcon>
                            <ListItemText primary={'Easy Mode'}/>
                                <ListItemSecondaryAction>
                                <Switch
                                    edge="end"
                                    checked={settings.easyMode}
                                    onChange={()=>setSettings({...settings, easyMode:!settings.easyMode})}
                                />
                        </ListItemSecondaryAction>
                        </ListItem>
                        {settings.easyMode && 
                            <ListItem button>
                            <ListItemIcon><ImportExportIcon style={{color:COLOURS.primary}}/></ListItemIcon>
                                <ListItemText primary={'Word Count'}/>
                            </ListItem>
                        }
                        <ListItem button>
                            <ListItemIcon><PlaylistPlayIcon style={{color:COLOURS.primary}}/></ListItemIcon>
                            <ListItemText primary={'Change Playlist'}/>
                        </ListItem>
                        <Divider/>
                    </List>
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
            color: COLOURS.primary,
            minWidth: '25%'
        }
    }),
);
;