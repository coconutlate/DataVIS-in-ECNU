import React from 'react';
import PropTypes from 'prop-types';
import Home from './views/Home';
import Music from './views/Music';
import Word from './views/Word';
import '../styles/MainContent.css';

/**
 * MainContent Props：
 * @prop {string} selectedContent - 当前被选中的内容类型 ID（例如 “HOME”, “MUSIC”, “LYRICS”）
 * @prop {object|null} selectedSong - 当前选中的歌曲对象
 */
const MainContent = ({ selectedContent, selectedSong }) => {
  const renderContent = () => {
    switch (selectedContent) {
      case 'HOME':
        return <Home />;
      case 'MUSIC':
        // 把选中的歌曲传给音乐可视化组件
        return <Music song={selectedSong} />;
      case 'WORD':
        // 把选中的歌曲传给歌词组件
        return <WORD song={selectedSong} />;
      default:
        return <div>请选择左侧菜单</div>;
    }
  };

  return <div className="main-content">{renderContent()}</div>;
};

MainContent.propTypes = {
  selectedContent: PropTypes.string.isRequired,
  selectedSong: PropTypes.object
};

export default MainContent;
