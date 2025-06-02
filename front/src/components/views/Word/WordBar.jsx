// https://echarts.apache.org/examples/en/editor.html?c=dataset-encode0

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../../../styles/Word.css';

function getData(song) {

}

function BarDraw(chartDom, song) {
  
  var myChart = echarts.init(chartDom);
  var option = {
    // dataset: getData(song),
    dataset: {
      source: [
        ['frequency', 'word'],
        [58212, 'Matcha Latte'],
        [78254, 'Milk Tea'],
        [41032, 'Cheese Cocoa'],
        [12755, 'Cheese Brownie'],
        [20145, 'Matcha Cocoa'],
        [79146, 'Tea'],
        [91852, 'Orange Juice'],
        [101852, 'Lemon Juice'],
        [20112, 'Walnut Brownie']
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: '频率' },
    yAxis: { type: 'category' },
    series: [
      {
        type: 'bar',
        encode: {
            // Map the "amount" column to X axis.
            x: 'frequency',
            // Map the "product" column to Y axis
            y: 'word'
        }
      }
    ]
  };
  
  option && myChart.setOption(option);
}

function WordBar({ song }) {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      BarDraw(chartRef.current, song);
    }
  }, [song]);
  return <div ref={chartRef} className='word-sub-bar' />;
}

export default WordBar;