import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import { Header } from './components/Header';
import { SpotifyFooter } from './components/SpotifyFooter';
import { TypingCard } from './components/TypingCard';
import { SettingsContext, ISettings } from './utility/context';

function App() {
  let cookies = new Cookies();
  const [settings, setSettings] = useState<ISettings>(cookies.get('settings-typeLounge') ?? 
    {
      name: 'Steve Brule',
      easyMode: true,
      playList: 'lo-fi',
      wordCount: 50,
      darkMode: true,
  }
  );
  useEffect(()=>{
    cookies.set('settings-typeLounge',JSON.stringify(settings), {path:'/'});
  })
  return (
    <div className="App">
    <SettingsContext.Provider value={{settings, setSettings}}>

      <Header/>
        <TypingCard/>
      <SpotifyFooter/>

    </SettingsContext.Provider>
    </div>
    
  );
}

export default App;
