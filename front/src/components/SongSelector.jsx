import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/SongSelector.css';

/**
 * SongSelector 组件：点击“歌曲选择”标题后，动态展开或收起歌曲列表
 *
 * Props：
 * @param {Array<{id: string|number, name: string, artist: string, url: string}>} songList
 *        —— 可供选择的歌曲数组
 * @param {object|null} selectedSong
 *        —— 当前已选中的歌曲对象，如果未选中则为 null
 * @param {(song: object) => void} onSelectSong
 *        —— 当用户点击其中一首歌时，会把该对象传给父组件，父组件再保存到 selectedSong
 */
const SongSelector = ({ songList, selectedSong, onSelectSong }) => {
  // 用于控制下拉列表是否展开
  const [isOpen, setIsOpen] = useState(false);

  // 用来监听“点击外部”时自动关闭下拉
  const dropdownRef = useRef(null);

  // 点击外部时，关闭列表
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 切换下拉展开/收起
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 选择某首歌曲后的回调
  const handleSongClick = (song) => {
    onSelectSong(song);
    setIsOpen(false);
  };

  return (
    <div className="song-dropdown-container" ref={dropdownRef}>
      {/* 这个区域即为“点击后展开/收起”的触发器 */}
      <div
        className="song-dropdown-header"
        onClick={toggleDropdown}
      >
        <span className="song-dropdown-label">
          {selectedSong
            ? `${selectedSong.name} — ${selectedSong.artist}`
            : '请选择歌曲'}
        </span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </div>

      {/* 如果 isOpen 为 true，就渲染下面的列表 */}
      {isOpen && (
        <ul className="song-dropdown-list">
          {songList.map((song) => (
            <li
              key={song.id}
              className={`dropdown-item ${
                selectedSong && selectedSong.id === song.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() => handleSongClick(song)}
            >
              <div className="song-name">{song.name}</div>
              <div className="song-artist">{song.artist}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SongSelector.propTypes = {
  songList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  selectedSong: PropTypes.object,
  onSelectSong: PropTypes.func.isRequired
};

export default SongSelector;
