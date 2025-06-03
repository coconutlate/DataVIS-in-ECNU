// https://echarts.apache.org/examples/en/editor.html?c=graph-circular-layout


import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../../../styles/Word.css';

function getData(song) {
  return ({
    "nodes": [
      {"id": "0", "name": "awa", "symbolSize": 50, "value": 50, "category": 0},
      {"id": "1", "name": "qaq", "symbolSize": 30, "value": 30, "category": 0},
      {"id": "2", "name": "=-=", "symbolSize": 20, "value": 20, "category": 1},
      {"id": "3", "name": "=.=", "symbolSize": 10, "value": 10, "category": 1},
    ],
    "links": [
      {"source": "1","target": "0"},
      {"source": "2","target": "0"},
      {"source": "3","target": "0"},
      {"source": "3","target": "2"},
    ],
    "categories": [
      {"name": "A"},
      {"name": "B"},
    ]
  });
}

function LinkDraw(chartDom, song) {
  var myChart = echarts.init(chartDom);
  
  var graph = getData(song);

  var option = {
    title: {
      text: '弧长链接图',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        data: graph.categories.map(function (a) {
          return a.name;
        })
      }
    ],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '弧长链接图',
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  };
  
  option && myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}

function WordLink({ song }) {
  const chartRef = useRef(null);
  
  useLayoutEffect(() => {
    if (chartRef.current) {
        LinkDraw(chartRef.current, song);
    }
    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [song]);
  return <div ref={chartRef} className='word-sub-link' />;
}

export default WordLink;