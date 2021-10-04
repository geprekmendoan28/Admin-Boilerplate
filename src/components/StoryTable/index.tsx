import React from 'react';
import './StoryTable.less';
import { Button, Table, Tag, Tooltip } from 'antd';
import { EyeOutlined, MoreOutlined } from '@ant-design/icons';
import MenuAction from '@constant/menu-action';
import MyPopover from '@components/MyPopover';
import { useHistory } from 'react-router-dom';

interface TableTypes {
  data?: any;
  loading?: boolean;
  handleDelete: (e: string) => void;
  isTags?: boolean;
  handleEditTags?: (id:string)=>void;
}

export default function StoryTable(props: TableTypes) {
  const { data, loading, handleDelete, isTags, handleEditTags } = props;
  const { push } = useHistory();
  const ContentPopover = (id: string) => (
    <div className="parent-morepov">
      {MenuAction.map((item, index) => (
        <button
          onClick={() => {
            if (item.path) {
              push('/story' + item.path + '/' + id);
            } else if (index === 2) {
              handleDelete(id);
            }
          }}
          key={index}
          style={{ color: index === 2 ? 'red' : '' }}
        >
          {item.icons}
          <p>{item.name}</p>
        </button>
      ))}
    </div>
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'featuredImages',
      key: 'featuredImages',
      render: (image: { url: string }) => (
        <img style={{ height: 75, width: 75, objectFit: 'cover', borderRadius: 6 }} src={image.url} alt="thumbnail" />
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text: { name: string }) => <p>{text.name}</p>,
    },
    {
      title: 'Total Likes',
      dataIndex: 'usersLiked',
      key: 'usersLiked',
      render: (usersLiked: Array<string>) => <p>{usersLiked.length}</p>,
    },
    {
      title: 'Total Comments',
      dataIndex: 'comments',
      key: 'comments',
      render: (comments: Array<string>) => <p>{comments.length}</p>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: Array<{ name: string }>) => (
        <div>
          {' '}
          {tags.map((item, index) => (
            <Tag key={index}>{item.name}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, _record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Look Preview Content">
            <EyeOutlined style={{ cursor: 'pointer', marginRight: 8 }} />
          </Tooltip>
          <MyPopover content={() => ContentPopover(text.id)}>
            <MoreOutlined style={{ cursor: 'pointer' }} />
          </MyPopover>
        </div>
      ),
    },
  ];

  const TagsColums = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Stories',
      key: 'stories',
      dataIndex: 'stories',
      render: (stories: string[]) => <p>{stories.length}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, _record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={() => handleEditTags(text.id)}>Edit</Button>
          <Button onClick={() => handleDelete(text.id)} style={{ color: 'red', borderColor: 'red', marginLeft: 16 }}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="story-table">
      <Table loading={loading} columns={isTags ? TagsColums : columns} dataSource={data} pagination={false} />
    </div>
  );
}
