import React, { useState, useEffect, useRef } from 'react';
import '../styles/Word.css';
import WordBar from './views/Word/WordBar';


const Word = ({ song }) => {

  return (
    <div className="word-container">
      {/* 左侧：上面词云 + 链接图 */}
      <aside className="word-left">
        <div className="word-cloud">
          <h1>awa</h1>
        </div>

        <div className='word-link'>
          <h1>awa</h1>
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
