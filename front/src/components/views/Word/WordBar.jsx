// https://echarts.apache.org/examples/en/editor.html?c=dataset-encode0

import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../../../styles/Word.css';

function getData(song) {
  return ([
    { name: '医学研究', value: 300 },
    { name: '动物保护', value: 130 },
    { name: '航海', value: 200 }
  ]);
}

function BarDraw(chartDom, song) {
  var myChart = echarts.init(chartDom);
  var option = {
    dataset: {source: getData(song)},
    grid: { containLabel: true },
    xAxis: { name: '频率' },
    yAxis: { type: 'category' },
    series: [
      {
        type: 'bar',
        encode: {
            // Map the "amount" column to X axis.
            x: 'value',
            // Map the "product" column to Y axis
            y: 'name'
        }
      }
    ]
  };
  
  option && myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}

function WordBar({ song }) {
  const chartRef = useRef(null);
  
  useLayoutEffect(() => {
    if (chartRef.current) {
      BarDraw(chartRef.current, song);
    }
    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [song]);
  return <div ref={chartRef} className='word-sub-bar' />;
}

export default WordBar;