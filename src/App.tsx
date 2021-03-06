import { Box, Button, Grid, Grow } from '@material-ui/core';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import { Header } from './components/Header';
import { UserNameModal } from './components/partials/UserNameModal';
import { MatterStepThree } from './components/Physics';

// import { Comp } from './components/Physics';
import { SpotifyFooter } from './components/SpotifyFooter';
import { TypingCard } from './components/TypingCard';
import { darkTheme, lightTheme } from './utility/colours';
import { NUM_WORDS, COOKIE_SETTINGS, NUM_HIGH_SCORES } from './utility/constants';
import { SettingsContext, ISettings } from './utility/context';

function App() {
  let cookies = new Cookies();
  const styles = useStyles();
  const [settings, setSettings] = useState<ISettings>(cookies.get(COOKIE_SETTINGS) ?? 
    {
      easyMode: true,
      playlist: 'lo-fi',
      wordCount: NUM_WORDS[3],
      darkMode: true,
      stickyScores: true,
      reset: false,
  }
  );
  // const [colourTheme, setColourTheme] = useState<ColourTheme>();
  useEffect(()=>{
    cookies.set(COOKIE_SETTINGS,JSON.stringify(settings), {path:'/'});
  })
  return (
    <div className="App">
    <SettingsContext.Provider value={{settings, setSettings}}>
      <ThemeProvider theme={settings.darkMode ? darkTheme : lightTheme}>
          <Header/>
          <MatterStepThree/>
            <SpotifyFooter/>
      </ThemeProvider>
    </SettingsContext.Provider>
    </div>
    
  );
}
const useStyles = makeStyles((theme: Theme) =>
createStyles({
    physics: {
      //height: '100%',//92.4vh
      // flex: '1',
    },
    typingCard: {
    }
}))

export default App;

