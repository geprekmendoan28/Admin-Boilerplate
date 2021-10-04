import React from 'react';
import './Pagination.less';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface PropsTypes {
  totalPage: number;
  page: number;
  handlePage: (e: number) => void;
}
export default function Pagination(props: PropsTypes) {
  const { totalPage, page, handlePage } = props;
  return (
    <div className="wrapper-pagination">
      <button
        onClick={() => {
          if (page > 1) {
            handlePage(page - 1);
          }
        }}
        className="prev"
      >
        <LeftOutlined />
      </button>
      {Array.from(Array(totalPage).keys()).map((_items, index) => (
        <button
          onClick={() => {
            handlePage(index + 1);
          }}
          className={index + 1 === page ? 'active' : ''}
        >
          <p>{index + 1}</p>
        </button>
      ))}

      <button
        onClick={() => {
          if (page < totalPage) {
            handlePage(page + 1);
          }
        }}
        className="next"
      >
        <RightOutlined />
      </button>
    </div>
  );
}
