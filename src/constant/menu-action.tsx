import { EditOutlined, SelectOutlined, DeleteOutlined } from '@ant-design/icons';

const MenuAction = [
  { id: 0, name: 'Open Story', icons: <SelectOutlined />, path: false },
  { id: 1, name: 'Edit Story', icons: <EditOutlined />, path: '/edit' },
  { id: 2, name: 'Delete Story', icons: <DeleteOutlined />, path: false },
];
export default MenuAction;
