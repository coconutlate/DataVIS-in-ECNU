import React, { useState, useRef, useEffect } from 'react';
import TiltedCard from '../../blocks/Components/TiltedCard/TiltedCard';
import '../../../styles/Music.css';


function getImage(song) {
    return 'https://upload.cc/i1/2025/06/01/zZ0Is5.jpg';
}


function Imaginative({ song }) {

  return (
    <div className="music-sub-cover">
      <TiltedCard
        imageSrc={getImage(song)}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
      />
    </div>
  );

}


export default Imaginative;