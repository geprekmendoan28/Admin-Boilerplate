import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React from 'react';

interface PropsTypes {
  children: React.ReactNode;
  text?: React.ReactNode;
  content?: React.ReactNode;
  position?: TooltipPlacement;
  id?: string;
  style?: React.CSSProperties;
}

function MyPopover(props: PropsTypes) {
  const { children, text, content, position, id, style } = props;
  return (
    <div id={id}>
      <Popover
        id={id}
        style={style}
        placement={position ? position : 'bottom'}
        title={text}
        content={content}
        trigger="click"
      >
        {children}
      </Popover>
    </div>
  );
}

export default MyPopover;
