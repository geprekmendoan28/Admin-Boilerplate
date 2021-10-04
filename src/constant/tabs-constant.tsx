import { DashboardOutlined, FormOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';

const TabsConstant = [
  {
    id: 0,
    name: 'Dashboard',
    icons: <DashboardOutlined />,
    path: '/',
  },
  {
    id: 1,
    name: 'Stories',
    icons: <FormOutlined />,
    path: '/story',
  },
  {
    id: 2,
    name: 'Tags',
    icons: <TagsOutlined />,
    path: '/tags',
  },
  {
    id: 3,
    name: 'Comments',
    icons: <TagsOutlined />,
    path: '/comments',
  },
  {
    id: 4,
    name: 'Users',
    icons: <UserOutlined />,
    path: '/users',
  },
];

export default TabsConstant;
