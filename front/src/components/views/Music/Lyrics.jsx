// https://github.com/mebtte/react-lrc

import React from 'react';
import {Lrc} from "react-lrc";

function Lyrics({ lrcText, currentTime }) {


  return (
    <div style={{ width: 400, height: 200, overflow: 'hidden' }}>
      <Lrc 
        style = {{ overflow: 'hidden !important' }}
        recoverAutoScrollInterval = {0}
        lrc = {lrcText} 
        currentMillisecond = {currentTime} 
        verticalSpace = {true}
      
      />
    </div>
  );
};


export default Lyrics;