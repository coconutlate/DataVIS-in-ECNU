// LiveWave.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LiveAudioVisualizer } from 'react-audio-visualize';

const LiveWaveContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/**
 * Wave 组件：只需传入一个 HTMLAudioElement，内部自动创建 AudioContext、AnalyserNode 
 * 然后把 analyser 传给 LiveAudioVisualizer，渲染实时可视化效果。
 *
 * Props:
 *  - audioElement: 必填，HTMLAudioElement 实例（父组件传入）
 *  - barColor:     柱子颜色，默认 '#f76565'
 *  - width:        Canvas 宽度（像素），默认 800
 *  - height:       Canvas 高度（像素），默认 150
 *  - barWidth:     柱子宽度，默认 2
 *  - gap:          柱子之间的间隙，默认 1
 *  - fftSize:      AnalyserNode.fftSize，影响频谱分辨率，默认 1024
 *  - maxDecibels:  AnalyserNode.maxDecibels，默认 -10
 *  - minDecibels:  AnalyserNode.minDecibels，默认 -90
 */
function Wave({ audioElement }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!audioElement) {
      return;
    }
    if (didInitRef.current) {
      return;
    }
    didInitRef.current = true;

    if (audioElement.__waveMediaRecorder) {
      setMediaRecorder(audioElement.__waveMediaRecorder);
      return;
    }

    if (typeof audioElement.captureStream !== 'function') {
      console.warn('当前浏览器不支持 audio.captureStream()，无法进行实时可视化。');
      return;
    }

    try {
      const stream = audioElement.captureStream();
      const recorder = new MediaRecorder(stream);
      recorder.start();
      audioElement.__waveMediaRecorder = recorder;
      setMediaRecorder(recorder);
    } catch (err) {
      console.warn('创建 MediaRecorder 时出错：', err);
    }
  }, [audioElement]);


  return (
    <LiveWaveContainer>
      {mediaRecorder ? (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          barColor={"rgb(160, 198, 255)"}
          barWidth={2}
          gap={1}
          width={'1200px'}
          height={'150px'}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <p style={{ textAlign: 'center', marginTop: 60 }}>
          {audioElement
            ? '正在初始化实时可视化…'
            : '等待音频加载…'}
        </p>
      )}
    </LiveWaveContainer>
  );
}

export default Wave;