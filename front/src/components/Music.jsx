import React, { useState, useEffect, useRef } from 'react';
import Lyrics from './views/Music/Lyrics';
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
          <h1>意象图</h1>  {/* 歌曲名字 */}
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

  return (
    <div className="song-player">
      <div className="cover">
        <img src={cover_url} alt={name} />
      </div>
      <div className="info">
        <h2>{name}</h2>
        <p>{artist}</p>
      </div>

      {/* 控制播放状态的组件 */}
      <SongController isPlaying={isPlaying} togglePlayState={togglePlayState} music_url={music_url} setCurrentTime={setCurrentTime} />
      
      {/* 传递 currentTime 到子组件 */}
      <Lyrics lyrics={lyrics} currentTime={currentTime} />
      <Spectrogram currentTime={currentTime} />
    </div>
  );
};

export default Music;
