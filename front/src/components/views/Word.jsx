import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * LyricsView Props：
 * @prop {object|null} song - 当前选中的歌曲对象
 *
 * 示例中假定：song.lyrics 是一个字符串（整首歌词文本），也可以改成 [{ time: 10, text: '...'}, ...] 的格式来同步高亮滚动
 */
const Word = ({ song }) => {
  const [lyricsText, setLyricsText] = useState('');

  useEffect(() => {
    if (!song) {
      setLyricsText('');
      return;
    }

    // 假设从 song 对象里直接取 lyrics，也可以自行改为 fetch(`/api/lyrics/${song.id}`)
    if (song.lyrics) {
      setLyricsText(song.lyrics);
    } else {
      // 如果没有预设歌词字段，可以在这里请求后台获取，比如：
      // fetch(`/api/lyrics/${song.id}`).then(res => res.text()).then(text => setLyricsText(text));
      setLyricsText('（暂无歌词，后续可自行填充歌词内容）');
    }
  }, [song]);

  return (
    <div>
      <h2>歌词展示</h2>
      {!song ? (
        <p>请选择左侧的某首歌曲，然后查看歌词</p>
      ) : (
        <div style={{ maxHeight: '70vh', overflowY: 'auto', whiteSpace: 'pre-wrap', lineHeight: '1.5', padding: '8px', border: '1px solid #ddd' }}>
          {lyricsText}
        </div>
      )}
    </div>
  );
};

Word.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string,
    url: PropTypes.string.isRequired,
    lyrics: PropTypes.string // 可选
  })
};

export default Word;
