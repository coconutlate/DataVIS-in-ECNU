import React, { useState, useEffect, useRef } from 'react';
import Lyrics from './views/Music/Lyrics';
import Imaginative from './views/Music/Imaginative';
import '../styles/Music.css';



const Music = ({ song }) => {

  const { name, artist, music_url, cover_url, lyrics } = song;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // 当播放状态改变时，更新播放状态
  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prevTime => prevTime + 0.1);  // 假设每 0.1s 更新一次
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);


  return (
    <div className="music-container">
      <div className="music-top">

        <div className="music-cover">
          <Imaginative song={song} />
        </div>

        <div className='music-lyrics'>
          <h1>滚动歌词</h1>  {/* lyrics ,*/}
        </div>

      </div>
      <div className="music-bottom">

        <div className="music-chart">
          <h1>频谱图</h1> {/* music_url */}  
        </div>

        <div className="music-audio">
          <h1>播放器</h1>
        </div>

      </div>
    </div>
  );
};

export default Music;
