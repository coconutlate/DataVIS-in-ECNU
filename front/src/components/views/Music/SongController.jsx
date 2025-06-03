// https://github.com/llaurora/react-audio-wave?utm_source=chatgpt.com

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
// import { ReactAudioWave } from 'react-audio-wave';
import { ReactAudioWave } from 'react-audio-wave/dist/react-audio-wave.cjs.js';

const SongController = forwardRef(({ audioSrc, onTimeChange, onPlayClick, onPauseClick }, ref) => {

  const waveRef = useRef(null);

  // 暴露给父组件的 API：play()、pause()
  useImperativeHandle(ref, () => ({
    play: () => {
      if (waveRef.current) {
        waveRef.current.play();
      }
    },
    pause: () => {
      if (waveRef.current) {
        waveRef.current.pause();
      }
    }
  }));

  const colors = {
    waveColor: "#d8d8d8",
    progressColor: "#8E128E",
    cursorColor: "#8E128E",
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button
        onClick={() => {
          // 调用内部 wave.play()
          if (waveRef.current) {
            waveRef.current.play();
          }
          // 通知父组件：播放事件发生了
          if (onPlayClick) onPlayClick();
        }}
        style={{ marginRight: 8 }}
      >
        播放
      </button>
      <div style={{ width: '600px', height: '100px', margin: '0 16px' }}>
        <ReactAudioWave
          ref={waveRef}
          supportPlaybackRate
          audioSrc={audioSrc}
          waveHeight={100}
          colors={colors}
          placeholder={"wait"}
          // 当 wave 内部更新 currentTime（播放进度）时，调用父组件 onTimeChange
          onCurrentTimeChange={(time) => {
            if (onTimeChange) onTimeChange(time);
          }}
          // 当用户点击 wave 上的“播放”按钮
          onPlay={() => {
            if (onPlayClick) onPlayClick();
          }}
          // 当用户点击 wave 上的“暂停”按钮
          onPause={() => {
            if (onPauseClick) onPauseClick();
          }}
        />
      </div>
      <button
        onClick={() => {
          // 调用内部 wave.pause()
          if (waveRef.current) {
            waveRef.current.pause();
          }
          // 通知父组件：暂停事件发生了
          if (onPauseClick) onPauseClick();
        }}
        style={{ marginLeft: 8 }}
      >
        暂停
      </button>
    </div>
  );
});

export default SongController;
