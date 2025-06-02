import React, { useState, useEffect, useRef } from 'react';

const Lyrics = ({ lyrics, currentTime }) => {
  const lyricsRef = useRef(null);

  useEffect(() => {
    if (lyricsRef.current && lyrics.length > 0) {
      const currentLyric = lyrics.find((lyric) => {
        const currentTimeInSec = parseFloat(lyric.time);
        return currentTime >= currentTimeInSec;
      });

      if (currentLyric) {
        lyricsRef.current.scrollTo(0, currentLyric.offsetTop);
      }
    }
  }, [currentTime, lyrics]);

  return (
    <div className="lyrics" ref={lyricsRef}>
      {lyrics.map((lyric, index) => (
        <div key={index} className="lyric-line">
          {lyric.text}
        </div>
      ))}
    </div>
  );
};

export default Lyrics;
