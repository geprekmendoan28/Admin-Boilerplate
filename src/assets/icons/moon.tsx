import React from 'react';

interface MoonTypes {
  style?: React.CSSProperties;
  onClick?: () => void;
  isDark?: boolean;
}
export default function MoonIcon(props: MoonTypes) {
  const { style, onClick, isDark } = props;
  return (
    <svg
      style={style}
      onClick={onClick}
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.875 1.125C7.5625 1.125 1.1875 6.4375 1.1875 14.9375C1.1875 23.4375 7.5625 29.8125 16.0625 29.8125C24.5625 29.8125 29.875 23.4375 29.875 18.125C18.1875 25.5625 5.4375 12.8125 12.875 1.125Z"
        stroke={isDark ? 'rgba(255, 255, 255, 0.85)' : 'black'}
        stroke-width="2.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
