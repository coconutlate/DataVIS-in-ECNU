// https://github.com/samhirtarif/react-audio-visualize?tab=readme-ov-file

import React, { useState, useRef } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';

function Wave({ song, currentTime }) {

  const [blob, setBlob] = useState();
  const visualizerRef = useRef(null)

  setBlob(song.music_url);


  return (
    <div>
      {blob && (
        <AudioVisualizer
          ref={visualizerRef}
          blob={song.music_url}
          currentTime={currentTime}
          gap={0}
          barColor={'#f76565'}
        />
      )}
    </div>
  )
}


export default Wave;