import React, { ReactNode, useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Divider, Breadcrumb } from 'antd';
import { CheckCircleTwoTone, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import Logo from '@assets/vector/logo.svg';
// import { useTranslation } from 'react-i18next';
import TabsConstant from '@constant/tabs-constant';
import MyPopover from '../MyPopover';
import './Layout.less';
import MoonIcon from '@assets/icons/moon';
import SunIcon from '@assets/icons/sun';
import Cookies from 'js-cookie';
import { useAuth } from '@context/authContext';
import { getInitials } from '@constant/initial-name';
import { useHistory, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

interface LayoutTypes {
  children: ReactNode;
}

function Layouts(props: LayoutTypes) {
  const { children } = props;
  const [collapsed, setCollapse] = useState<boolean>(false);
  const { currentTheme, switcher, themes } = useThemeSwitcher();
  const [value, setValue] = useState(0);
  const { user } = useAuth();
  // const { t } = useTranslation();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const onCollapse = () => {
    setCollapse(!collapsed);
  };

  const toggleTheme = () => {
    switcher({ theme: currentTheme === 'light' ? themes.dark : themes.light });

    Cookies.set('theme', currentTheme === 'light' ? 'dark' : 'light');
  };
  const textNotif = (
    <div style={{ marginTop: 16 }} className="title-notif">
      <span>Notifikasi</span>
      <div className="indicator-new">
        <p>5 Baru</p>
      </div>
    </div>
  );

  useEffect(() => {
    let newValue = 0;
    switch (pathname) {
      case '/':
        newValue = 0;
        break;
      case '/story':
        newValue = 1;
        break;
      case '/story/add':
        newValue = 1;
        break;
      case '/story/edit':
        newValue = 1;
        break;
      case '/tags':
        newValue = 2;
        break;
      case '/users':
        newValue = 4;
        break;
      case '/users/add':
        newValue = 4;
        break;
      case '/users/edit':
        newValue = 4;
        break;
      default:
        newValue = 0;
    }
    setValue(newValue);
  }, [pathname]);
  const contentNotif = (
    <div>
      <Button type="text" id="list-notif">
        <div className="parent-notifs">
          <div className="icons-notif">
            <CheckCircleTwoTone style={{ fontSize: 20 }} twoToneColor="blue" />
          </div>
          <div className="content-notifs">
            <h6>Test</h6>
            <p>Lorem ipsum dolor sit amet, consecteturt</p>
            <span>30 Menit lalu</span>
          </div>{' '}
        </div>
      </Button>
      <Divider style={{ margin: 0 }} />
      <div className="read-more">
        <Button type="text">Read More</Button>
      </div>
    </div>
  );
  const contentProfile = (
    <div>
      <Button type="text" id="list-profiles">
        <UserOutlined style={{ fontSize: 20 }} />
        <p>Profiles</p>
      </Button>
      <Divider style={{ margin: 0 }} />
    </div>
  );
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme={currentTheme === 'dark' ? 'dark' : 'light'}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" style={{ padding: !collapsed ? '16px 40px' : '16px' }}>
          <img src={Logo} alt="logos" />
        </div>
        <Menu theme={currentTheme === 'dark' ? 'dark' : 'light'} selectedKeys={[`${value}`]} mode="inline">
          {TabsConstant.map((item: any, index: number) => (
            <Menu.Item onClick={() => push(item.path)} key={index.toString()} icon={item.icons}>
              {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: !collapsed ? 200 : 80, transition: 'all 0.2s ease 0s' }}>
        <Header className="appbar-parent" style={{ width: !collapsed ? 1150 : 1270 }}>
          <div className={`wrapper-header  ${currentTheme === 'dark' ? 'dark' : ''}`}>
            <div className="appbar-wraps">
              {currentTheme === 'dark' ? (
                <SunIcon
                  onClick={toggleTheme}
                  style={{ transform: 'scale(0.68)', marginTop: -5, cursor: 'pointer', marginRight: 8 }}
                />
              ) : (
                <MoonIcon
                  onClick={toggleTheme}
                  style={{ transform: 'scale(0.68)', marginTop: -5, cursor: 'pointer', marginRight: 8 }}
                />
              )}

              <MyPopover position="bottomRight" text={textNotif} content={contentNotif}>
                <BellOutlined style={{ fontSize: 21, cursor: 'pointer' }} />
              </MyPopover>
              <MyPopover position="bottomLeft" content={contentProfile}>
                <div className="username-section">
                  {' '}
                  <div>
                    <p className="text-name">{user?.name}</p>
                    <span>{user?.username}</span>
                  </div>
                  {user?.photoProfile ? (
                    <Avatar style={{ width: 40, height: 40 }} src={user?.photoProfile} />
                  ) : (
                    <Avatar
                      style={{
                        width: 40,
                        height: 40,
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {getInitials(user?.name)}
                    </Avatar>
                  )}
                </div>
              </MyPopover>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px', marginTop: 70 }}>
          <Breadcrumb style={{ marginTop: 16 }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className={` ${currentTheme === 'dark' ? 'dark' : ''}`}
            style={{ minHeight: 360, marginTop: 16, borderRadius: 6, width: !collapsed ? 1120 : 1240 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Daebak Tech ©2021 Created with ❤ by Daebak Tech and supported by Ant Design{' '}
        </Footer>
      </Layout>
    </Layout>
  );
}
export default Layouts;
