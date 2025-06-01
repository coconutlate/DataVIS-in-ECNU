import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css'; // 可以放一些全局布局的样式

/**
 * 内容类型列表（可按需增删、修改）
 * “HOME” —— 首页视图
 * “MUSIC” —— 音乐可视化视图
 * “LYRICS” —— 歌词展示视图
 */
const CONTENT_OPTIONS = [
  { id: 'HOME', label: '首页' },
  { id: 'MUSIC', label: '音乐可视化' },
  { id: 'WORD', label: '歌词展示' }
];

/**
 * 预定义的歌曲列表。实际项目中可以从后台接口获取，这里先写死几个示例。
 * 格式：{ id: string | number, name: string, artist: string, url: string (歌曲文件地址) … }
 */
const SONG_LIST = [
  { id: '1', name: 'Song A', artist: 'Artist A', music_url: '/audio/song-a.mp3', cover_url: 'https://upload.cc/i1/2025/06/01/zZ0Is5.jpg'},
  { id: '2', name: 'Song B', artist: 'Artist B', url: '/audio/song-b.mp3' },
  { id: '3', name: 'Song C', artist: 'Artist C', url: '/audio/song-c.mp3' },
];

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedContent, setSelectedContent] = useState(CONTENT_OPTIONS[0].id);

  return (
    <div className="app-container">
      {/* 左侧侧边栏：歌曲列表和内容类型选择 */}
      <Sidebar
        songList={SONG_LIST}
        selectedSong={selectedSong}
        onSelectSong={setSelectedSong}
        contentOptions={CONTENT_OPTIONS}
        selectedContent={selectedContent}
        onSelectContent={setSelectedContent}
      />

      {/* 右侧主区域：根据 selectedContent 显示不同视图 */}
      <MainContent
        selectedContent={selectedContent}
        selectedSong={selectedSong}
      />
    </div>
  );
}

export default App;
