import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TiltedCard from './blocks/Components/TiltedCard/TiltedCard';
import '../styles/Sidebar.css';

/**
 * SongCover 组件：点击“歌曲选择”标题后，动态展开或收起歌曲列表
 *
 * Props：
 * @param {object|null} selectedSong
 *        —— 当前已选中的歌曲对象，如果未选中则为 null
 */
const SongCover = ({ selectedSong}) => {
  if (!selectedSong) {
    return null
  }
  else {
    return (
      <TiltedCard
        imageSrc={selectedSong.cover_url}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.2}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <p className="sidebar-cover-text">
            {selectedSong.name} — {selectedSong.artist}
          </p>
        }
      />
    )
  }
};

SongCover.propTypes = {
  selectedSong: PropTypes.object,
};

export default SongCover;
