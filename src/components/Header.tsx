import { AppBar, Button, Drawer, Grid, IconButton, makeStyles, Toolbar, Typography, Theme, createStyles, List, ListItemIcon, ListItemText, ListItem, ListItemSecondaryAction, Switch, Divider, createTheme, useTheme, Snackbar, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useContext, useEffect, useReducer, useState } from 'react';
import SpeedIcon from '@material-ui/icons/Speed';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { SettingsContext } from '../utility/context';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { NUM_HIGH_SCORES, NUM_WORDS, PLAYLISTS } from '../utility/constants';
import { ReducerAction } from '../utility/types';
import { settings } from 'cluster';
import Cookies from 'universal-cookie';
import { Alert } from '@mui/material';

function HeaderReducer(state: any, action: ReducerAction): any{ 
    const cookie = new Cookies();
    const {type, payLoad} = action;
    switch (type) {
        case 'openDrawer':
            return {...state, showDrawer: true}
        case 'closeDrawer':
            return {...state, showDrawer: false, showPlaylists: false, showScoresMods: false, msg: ''}
        case 'toggleShowPlaylist':
            return {...state, showPlaylists: !state.showPlaylists}
        case 'setWordCount':
            return{...state, index: state.index !== NUM_WORDS.length  ? state.index += 1 : 0 };
        case 'showScoresMods':
            return{...state, showScoresMods: !state.showScoresMods};
        case 'resetScores':
            cookie.remove('scores-typeLounge');
            return{...state, showScoresMods: false, showAlert: true, msg: 'Scores Reset'}
        case 'openAlert':
            return {...state, showAlert: true}
        case 'closeAlert':
            return {...state, showAlert: false}
        case 'setMsg':
            return {...state, showAlert: true, msg: payLoad}
        default:
            return state;
    }
}
export const Header: React.FC = () => {
    const {palette} = useTheme();
    const style = useStyles();
    const {settings, setSettings} = useContext(SettingsContext);
    const [state, dispatch] = useReducer(HeaderReducer, {
        index: 0,
        showDrawer: false,
        showPlaylists: false,
        showScoresMods: false,
        showAlert: false,
        msg: '',
    });
    const {showDrawer, showPlaylists, showScoresMods, showAlert, msg} = state;
    let index = NUM_WORDS.indexOf(settings.wordCount);
    console.log(settings);
    return (
            <div>
                <AppBar style={{backgroundColor: palette.primary.dark}}>
                    <Toolbar >
                        <IconButton edge="start" style={{color: palette.text.primary}} className={style.menuButton} aria-label="menu" onClick={()=>dispatch({type: 'openDrawer'})}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={style.title} color='textPrimary'>
                            T Y P E L O U N G E
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer anchor={'left'} open={showDrawer} onClose={()=>dispatch({type: 'closeDrawer'})} classes={{paper: style.paper}}>
                    <List>
                        <ListItem>
                            <ListItemText primary={'Settings'}/>
                        </ListItem>
                        <Divider/>
                        {/* <ListItem button onClick= {()=>setColourTheme()}>
                        <ListItemIcon><InvertColorsIcon/></ListItemIcon>
                            <ListItemText primary={settings.darkMode ? 'Dark Mode' : 'Light Mode'}/>
                        </ListItem> */}
                        <ListItem button onClick={()=>{
                            setSettings({...settings, easyMode: !settings.easyMode})
                            dispatch({type: 'setMsg', payLoad: settings.easyMode ? 'Hard Mode Enabled' : 'Easy Mode Enabled'})
                            }}>
                        <ListItemIcon><SpeedIcon/></ListItemIcon>
                            <ListItemText primary={settings.easyMode ? 'Easy Mode' : 'Hard Mode'}/>
                        </ListItem>
                        <ListItem button onClick={()=>dispatch({type: 'toggleShowPlaylist'})}>
                            <ListItemIcon><PlaylistPlayIcon /></ListItemIcon>
                            <ListItemText primary={'Change Playlist'}/>
                        </ListItem>
                        <ListItem button onClick={()=>dispatch({type: 'showScoresMods'})}>
                            <ListItemIcon><PlaylistPlayIcon /></ListItemIcon>
                            <ListItemText primary={'High Scores'}/>
                        </ListItem>
                        <Divider/>
                        {settings.easyMode && 
                        <>
                            <ListItem>
                                <ListItemText primary={'Easy Mode Settings'} style={{color: palette.text.secondary}}/>
                            </ListItem>
                            <ListItem button onClick={()=>
                                setSettings({...settings, wordCount: index < NUM_WORDS.length - 1 ? NUM_WORDS[index + 1] : NUM_WORDS[0]})}>
                            <ListItemIcon><ImportExportIcon/></ListItemIcon>
                                <ListItemText>Word Count | <span style={{color: palette.text.secondary}}>{settings.wordCount}</span></ListItemText>
                            </ListItem>
                            <Divider/>
                            </>
                        }
                        
                        {showPlaylists && 
                        <>
                            <ListItem>
                                <ListItemText primary={'Playlists'} style={{color: palette.text.secondary}}/>
                            </ListItem>
                            {PLAYLISTS.map((playlist, index)=>
                                <ListItem key={index} button onClick={()=>{
                                setSettings({...settings, playlist: playlist})
                                dispatch({type: 'setMsg', payLoad: `Playlist '${playlist}' Set`})
                            }
                                }>
                                <ListItemIcon><PlaylistPlayIcon /></ListItemIcon>
                                {playlist === settings.playlist ? <ListItemText style={{color: palette.text.secondary}} primary={playlist}/> : <ListItemText primary={playlist}/>}
                                </ListItem>
                            )}
                            <Divider/>
                            </>
                        }
                        { showScoresMods &&
                            <>
                            <ListItem>
                                <ListItemText primary={'High Score Settings'} style={{color: palette.text.secondary}}/>
                            </ListItem>
                            <ListItem button onClick={()=>dispatch({type: 'resetScores'})}>
                            <ListItemIcon><ImportExportIcon/></ListItemIcon>
                                <ListItemText>Reset High Scores</ListItemText>
                            </ListItem>
                            <ListItem button onClick={()=>setSettings(
                                {...settings, wordCount: index < NUM_WORDS.length - 1 ? NUM_WORDS[index + 1] : NUM_WORDS[0]})}>
                            <ListItemIcon><ImportExportIcon/></ListItemIcon>
                                <ListItemText>Number of Scores | <span style={{color: palette.text.secondary}}>{NUM_HIGH_SCORES}</span></ListItemText>
                            </ListItem>
                            <ListItem button onClick={()=>{
                                setSettings({...settings, stickyScores: !settings.stickyScores})
                                dispatch({type: 'setMsg', payLoad: settings.stickyScores ? 'Scores Hidden' : 'Scores Shown'})
                                }}>
                            <ListItemIcon><ImportExportIcon/></ListItemIcon>
                                <ListItemText>{settings.stickyScores ? 'Hide Scores' : 'Show Scores'}</ListItemText>
                            </ListItem>
                            
                            <Divider/>
                            </>
                        }
                        <Button onClick={()=>dispatch({type: 'openAlert'})}>open</Button>
                            <Snackbar 
                            open={showAlert} 
                            autoHideDuration={1000} 
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} 
                            onClose={()=>dispatch({type: 'closeAlert'})}
                            TransitionComponent={Slide}
                            >
                        <Alert severity="success" variant="filled" style={{backgroundColor: palette.secondary.main}}>{msg}</Alert>
                    </Snackbar>
                    </List>
                </Drawer>
            </div>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: '10px',
        },
        title: {
            fontSize: '19px',
        },
        paper: {
            minWidth: '15%'
        }
    }),
);
;