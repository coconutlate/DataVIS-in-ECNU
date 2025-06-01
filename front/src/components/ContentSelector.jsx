import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/ContentSelector.css';

/**
 * ContentDropdown 组件：点击后展开/收起“内容类型”列表
 *
 * Props：
 * @param {Array<{id: string, label: string}>} contentOptions
 *        — 可供选择的内容类型数组，例如 [ {id:'HOME', label:'首页'}, {...} ]
 * @param {string} selectedContent
 *        — 当前已选中的内容类型 ID，例如 'HOME'；若无可设置为 ''
 * @param {(contentId: string) => void} onSelectContent
 *        — 当用户点击某个选项时的回调，将该内容 ID 传回父组件
 */
const ContentSelector = ({
  contentOptions,
  selectedContent,
  onSelectContent
}) => {
  // 控制下拉列表展开/收起
  const [isOpen, setIsOpen] = useState(false);
  // 用于监听点击外部以自动关闭列表
  const dropdownRef = useRef(null);

  // 如果点击区域在组件外部时，收起列表
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

  // 切换展开/收起
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 选择某个内容类型后的回调
  const handleOptionClick = (option) => {
    onSelectContent(option.id);
    setIsOpen(false);
  };

  // 找到当前选中项的 label，用于在 header 中显示
  const currentLabel = () => {
    const found = contentOptions.find((opt) => opt.id === selectedContent);
    return found ? found.label : '请选择内容';
  };

  return (
    <div className="content-dropdown-container" ref={dropdownRef}>
      {/* 点击区域 */}
      <div
        className="content-dropdown-header"
        onClick={toggleDropdown}
      >
        <span className="content-dropdown-label">
          {currentLabel()}
        </span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </div>

      {/* 下拉列表 */}
      {isOpen && (
        <ul className="content-dropdown-list">
          {contentOptions.map((opt) => (
            <li
              key={opt.id}
              className={`dropdown-item ${
                selectedContent === opt.id ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ContentSelector.propTypes = {
  contentOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedContent: PropTypes.string.isRequired,
  onSelectContent: PropTypes.func.isRequired
};

export default ContentSelector;
