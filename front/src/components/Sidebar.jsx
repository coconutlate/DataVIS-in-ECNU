import React from 'react';
import PropTypes from 'prop-types';
import SongSelector from './SongSelector';
import ContentSelector from './ContentSelector';
import '../styles/Sidebar.css';
import TextPressure from './blocks/TextAnimations/TextPressure/TextPressure';
import SongCover from './SongCover';

/**
 * Sidebar 组件 Props 接口：
 * @prop {Array<{id: string|number, name: string, artist: string}>} songList - 可供选择的歌曲列表
 * @prop {object|null} selectedSong - 当前被选中的歌曲对象，若无则为 null
 * @prop {(song: object) => void} onSelectSong - 当用户选择一首歌时触发，参数是被选中的歌曲对象
 *
 * @prop {Array<{id: string, label: string}>} contentOptions - 可供选择的内容类型列表（如首页、音乐可视化、歌词展示等）
 * @prop {string} selectedContent - 当前被选中的内容类型 ID
 * @prop {(contentId: string) => void} onSelectContent - 当用户切换内容类型时触发，参数是被选中的内容类型 ID
 */
const Sidebar = ({
  songList,
  selectedSong,
  onSelectSong,
  contentOptions,
  selectedContent,
  onSelectContent
}) => {
  return (
    <div className="sidebar-container">
      <div style={{position: 'relative', height: '25%', display: 'grid'}}>
        <TextPressure
          text="Music"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor='rgb(194,214,195)'
          strokeColor="rgb(55, 255, 0)"
        />
        <TextPressure
          text="Visualization"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor='rgb(194,214,195)'
          strokeColor="rgb(55, 255, 0)"
        />
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">歌曲选择</h3>
        <SongSelector
          songList={songList}
          selectedSong={selectedSong}
          onSelectSong={onSelectSong}
        />
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-title">内容选择</h3>
        <ContentSelector
          contentOptions={contentOptions}
          selectedContent={selectedContent}
          onSelectContent={onSelectContent}
        />
      </div>
      <div className="sidebar-cover">
        <SongCover selectedSong={selectedSong} />
      </div>

    </div>
  );
};

Sidebar.propTypes = {
  songList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  selectedSong: PropTypes.object,
  onSelectSong: PropTypes.func.isRequired,

  contentOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedContent: PropTypes.string.isRequired,
  onSelectContent: PropTypes.func.isRequired
};

export default Sidebar;
