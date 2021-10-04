import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import './UploadImages.less';
interface PropsTypes {
  handleChangeImage?: (e: any) => void;
  src?: string;
}

export default function UploadImages(props: PropsTypes) {
  const { handleChangeImage, src } = props;

  return (
    <>
      <input
        type="file"
        id="upload-button"
        style={{ visibility: 'hidden', marginBottom: -24 }}
        onChange={handleChangeImage}
      />
      <label htmlFor="upload-button" style={{ cursor: 'pointer' }}>
        {src === '' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 175,
              width: 175,
              border: '1px solid #d9d9d9',
              borderRadius: 6,
            }}
          >
            <UploadOutlined />
            Upload
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <img src={src} alt="thumbnails" className="thumb-preview" />
            <p style={{ color: 'red', marginLeft: 16 }}>*Click to change thumbnail</p>
          </div>
        )}
      </label>
    </>
  );
}
