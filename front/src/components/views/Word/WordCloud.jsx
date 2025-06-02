// https://github.com/ecomfe/echarts-wordcloud

import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import '../../../styles/Word.css';

function getData(song) {
  return ([
    { name: '医学研究', value: 300 },
    { name: '动物保护', value: 130 },
    { name: '航海', value: 200 }
  ]);
}

function  CloudDraw(chartDom, song) {
  console.log('>>> WordCloud 容器尺寸:', chartDom.clientWidth, chartDom.clientHeight);
  var myCloud = echarts.init(chartDom);

  var option = {
    tooltip: {
      show: true
    },
    series: [{
      type: 'wordCloud',
      gridSize: 8, // 控制词云图的网格大小，值越大词语之间的间距越大
      sizeRange: [10, 40], // 控制词语的大小范围
      rotationRange: [0, 0], // 控制词语的旋转角度范围
      rotationStep: 45, // 控制词语旋转的步长
      shape: 'circle', // 控制词云图的形状，可选值为 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
      drawOutOfBound: false, // 控制词云图是否允许词语超出绘制区域
      // 布局的时候是否有动画
      layoutAnimation: true,
      // 图的位置
      left: 'center',
      top: 'center',
      // 词汇样式
      textStyle: {
        fontFamily: 'sans-serif',
        // fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [Math.round(Math.random() * 160),Math.round(Math.random() * 160),Math.round(Math.random() * 160)].join(',') + ')';
        }
      },  
      data: getData(song), // 词云图的数据
      emphasis: {
        focus: 'self',
        textStyle: {
          fontSize: 60 // 点击的词放大
        }
      }
    }]
  };
  
  option && myCloud.setOption(option);
  window.addEventListener('resize', () => {
    myCloud.resize();
  });
}

function WordCloud({ song }) {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (chartRef.current) {
      CloudDraw(chartRef.current, song);
    }
    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [song]);

  return <div ref={chartRef} className="word-sub-cloud" />;
}

export default WordCloud;