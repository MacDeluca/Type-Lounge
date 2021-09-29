import { useContext } from "react";
import { SettingsContext } from "../utility/context";

interface SpotifyPlaylistProps {}
export const SpotifyFooter: React.FC<SpotifyPlaylistProps> = () => {
    const {settings: {playlist}, setSettings} = useContext(SettingsContext);
    let playlistString = '';
    switch (playlist) {
        case 'Lo-fi':
            playlistString = "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?theme=0"
            break;
        case 'Hip-hop':
        playlistString = "https://open.spotify.com/embed/playlist/1ZK6XxERSYKtjpazUTrkJH"
            break;
        case 'Jazz':
        playlistString = "https://open.spotify.com/embed/playlist/37i9dQZF1DWV7EzJMK2FUI"
            break;
        case 'Ambient':
        playlistString = "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY"
            break;
    
        default:
            playlistString = "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?theme=0"
    }
    return(
        <iframe 
        className="App-footer"
        title="spotify" 
        src={playlistString} 
        width="100%" 
        height="80" 
        frameBorder="0" 
        allow-transparency="true" 
        allow="encrypted-media">
        </iframe>
    )
}