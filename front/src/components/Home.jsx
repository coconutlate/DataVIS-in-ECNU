// HomeView.js
import React from 'react';
import '../styles/Home.css'; // 下文会给出对应的 CSS
import FlowingMenu from './blocks/Components/FlowingMenu/FlowingMenu';
import CircularGallery from './blocks/Components/CircularGallery/CircularGallery';
import DecryptedText from './blocks/TextAnimations/DecryptedText/DecryptedText';
import FuzzyText from './blocks/TextAnimations/FuzzyText/FuzzyText';

function Home() {
  // 示例数据：可播放歌曲列表（仅用于展示）
  const Songs = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <div className="home-container">
      <aside className="home-left">
        <div className="cover-box">
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>

        <div className='song-list-box'>
          <FlowingMenu items={Songs} color='black' />
        </div>
      </aside>

      {/* 右侧：上方“标题”卡片 + 下方卡片 */}
      <aside className="home-right">
        <div className="title-box">
          <FuzzyText 
            baseIntensity={0.2} 
            hoverIntensity={0.5} 
            enableHover={0.5}
            color='black'
          >
            标题
          </FuzzyText>
        </div>

        <div className='sub-box'>
          <DecryptedText
            text="简介"
            animateOn="view"
            revealDirection="center"
            speed={200}
          />
        </div>
      </aside>
    </div>
  );
}

export default Home;
