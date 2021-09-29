import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import { Header } from './components/Header';
import { UserNameModal } from './components/partials/UserNameModal';
import { SpotifyFooter } from './components/SpotifyFooter';
import { TypingCard } from './components/TypingCard';
import { darkTheme, lightTheme } from './utility/colours';
import { NUM_WORDS, COOKIE_SETTINGS } from './utility/constants';
import { SettingsContext, ISettings } from './utility/context';

function App() {
  let cookies = new Cookies();
  const [settings, setSettings] = useState<ISettings>(cookies.get(COOKIE_SETTINGS) ?? 
    {
      easyMode: true,
      playlist: 'lo-fi',
      wordCount: NUM_WORDS[0],
      darkMode: true,
      stickyScores: false,
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
          <TypingCard/>
        <SpotifyFooter/>
        
      </ThemeProvider>
    </SettingsContext.Provider>
    </div>
    
  );
}

export default App;
function COOKIES_SETTINGS(COOKIES_SETTINGS: any, arg1: string, arg2: { path: string; }) {
  throw new Error('Function not implemented.');
}

