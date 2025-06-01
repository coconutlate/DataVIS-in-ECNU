import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * MusicVisualization Props：
 * @prop {object|null} song - 当前选中的歌曲对象，包含 { id, name, artist, url }
 *
 * 该组件职责：
 *   1. 当 song 改变时，加载对应的音频（例如 new Audio(song.url)）。
 *   2. 使用 Web Audio API 或者外部库（如 wavesurfer.js、d3、canvas/WebGL等）进行可视化渲染。
 *   3. 提供播放/暂停按钮、进度条、音量控制等。
 */
const Music = ({ song }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioBufferSource, setAudioBufferSource] = useState(null);
  const canvasRef = useRef(null);

  // 当 song 变化的时候，初始化 AudioContext、分析器等
  useEffect(() => {
    if (!song) return;

    // 示例: 创建一个新的 AudioContext
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = ac.createAnalyser();

    // 这里可以进一步：fetch(song.url) -> ac.decodeAudioData(...) -> 播放
    // 也可以直接 new Audio(song.url) 再 connect 到 analyserNode

    setAudioContext(ac);
    setAnalyser(analyserNode);

    // TODO: 加载音频并连接到 analyserNode，之后在 canvas 上画频谱/波形
    // —— 这里只是一个接口占位，具体要自己实现

    return () => {
      // 在 song 改变或组件卸载时，清理上下文
      if (audioBufferSource) {
        try {
          audioBufferSource.stop();
        } catch (err) {}
      }
      if (ac) {
        ac.close();
      }
    };
  }, [song]);

  // 用一个函数来启动/暂停播放示例
  const handlePlay = () => {
    if (!song) return;
    // TODO: 如果已经加载了 buffer，start，否则先加载。
  };

  const handleStop = () => {
    if (audioBufferSource) {
      audioBufferSource.stop();
    }
  };

  // 绘制示意（仅作示意，每帧调用一次）
  const draw = () => {
    if (!analyser || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ff6600';

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    // requestAnimationFrame(draw); // 如果要持续绘制，就在加载好音频后开始循环
  };

  return (
    <div>
      <h2>音乐可视化</h2>
      {!song ? (
        <p>请选择左侧的某首歌曲后再进行可视化</p>
      ) : (
        <div>
          <div>
            <strong>当前歌曲：</strong> {song.name} — {song.artist}
          </div>
          <button onClick={handlePlay} disabled={!song}>
            播放
          </button>
          <button onClick={handleStop} disabled={!song}>
            停止
          </button>
          <div style={{ marginTop: '16px' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              style={{ border: '1px solid #ccc' }}
            ></canvas>
          </div>
          {/* 后续可以加频谱图、进度条、音量滑块等 */}
        </div>
      )}
    </div>
  );
};

Music.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string,
    url: PropTypes.string.isRequired
  })
};

export default Music;
