import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { SpotifyFooter } from './components/SpotifyFooter';
import { TypingCard } from './components/TypingCard';

function App() {
  return (
    <>
    <Header/>

    <div className="App">
      <TypingCard/>
    </div>
    
    <SpotifyFooter/>
    </>
    
  );
}

export default App;
