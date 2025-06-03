import React, { useState, useEffect, useRef } from 'react';
import Imaginative from './views/Music/Imaginative';
// import Wave from './views/Music/Wave';
import SongController from './views/Music/SongController';
import Lyrics from './views/Music/Lyrics';
import '../styles/Music.css';

function getLyrics(song) {
  // 这里可以根据 song 对象获取对应的歌词
  // 假设 song 对象有 lyrics 属性，实际项目中可能需要从 API 获取
  return song.lyrics || '';
}

const Music = ({ song }) => {

  // 当前播放时间（单位：秒），用来驱动歌词滚动
  const [currentTime, setCurrentTime] = useState(0);
  // 可选：如果想让 Music 组件知道当前是否在播放，也可以维护一个 isPlaying
  const [isPlaying, setIsPlaying] = useState(false);

  // 用来直接调用 SongController 内部 play()/pause()
  const songControllerRef = useRef(null);

  const lrc = getLyrics(song);

  // 当 ReactAudioWave 播放进度更新时，会传过来 time（秒）
  const handleTimeChange = (time) => {
    setCurrentTime(time);
  };

  // 当用户在 SongController 里点击「播放」按钮
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // 当用户在 SongController 里点击「暂停」按钮
  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  
  return (
    <div className="music-container">
      <div className="music-top">

        <div className="music-cover">
          <Imaginative song={song} />
        </div>

        <div className='music-lyrics'>
          <Lyrics lrcText={lrc} currentTime={currentTime} />
        </div>

      </div>
      <div className="music-bottom">

        <div className="music-chart">
          {/* react-audio-visualize */}
          <h1>频谱图</h1> 
          {/* {analyserNode && <Wave analyserNode={analyserNode} />} */}
        </div>

        <div className="music-audio">
          {/* react-audio-wave */}
          <SongController
          ref={songControllerRef}
            audioSrc={song.music_url}
            onTimeChange={handleTimeChange}
            onPlayClick={handlePlayClick}
            onPauseClick={handlePauseClick}
          />
        </div>

      </div>
    </div>
  );
};

export default Music;
