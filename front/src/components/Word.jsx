import React, { useState, useEffect, useRef } from 'react';
import '../styles/Word.css';
import WordBar from './views/Word/WordBar';
import WordCloud from './views/Word/WordCloud';
import WordLink from './views/Word/WordLink';


const Word = ({ song }) => {

  return (
    <div className="word-container">
      {/* 左侧：上面词云 + 链接图 */}
      <aside className="word-left">
        <div className="word-cloud">
          <WordCloud song={song} />
        </div>

        <div className='word-link'>
          <WordLink song={song} />
        </div>
      </aside>

      {/* 右侧：横着的柱形图*/}
      <aside className="word-bar">
        <WordBar song={song} />
      </aside>
    </div>
  );

  
};

export default Word;
