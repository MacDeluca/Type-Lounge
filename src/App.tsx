import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { SpotifyFooter } from './components/SpotifyFooter';
import { TypingCard } from './components/TypingCard';

function App() {
  useEffect(()=>{
    console.log('hello');
  })
  return (
    <>
    <div className="App">
    <Header/>

    
      <TypingCard/>
    
    
    <SpotifyFooter/>
    </div>
    </>
    
  );
}

export default App;
