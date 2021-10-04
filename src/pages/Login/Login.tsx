import Meta from '@components/Meta';
import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockFilled } from '@ant-design/icons';
import Logo from '@assets/vector/logo.svg';
import { login } from '@service/login';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function Login() {
  const [state, setState] = useState<any>({
    email: '',
    password: '',
    isLoginError: false,
    isLoading: false,
  });
  const history = useHistory();
  const openNotificationWithIcon = () => {
    notification.error({
      message: 'User Not Found',
      description: 'Please Check email and password, fill the correct!!!',
    });
  };

  const handleLogin = async () => {
    setState({ ...state, isLoading: true });
    await login({ email: state.email, password: state.password })
      .then((res) => {
        if (res) {
          Cookies.set('token', res?.data?.token);
          history.push('/');
        }
        if (res?.status === 'failure') {
          setState({ ...state, email: '', password: '', isLoading: false });
          openNotificationWithIcon();
        }
      })
      .catch((err) => {
        if (err) {
          setState({ ...state, email: '', password: '', isLoading: false });
          openNotificationWithIcon();
        }
      });
  };

  return (
    <React.Fragment>
      <Meta title="Login Admin">
        <div className="parent-login">
          <div className="box-login">
            <div className="section-logo">
              <img src={Logo} alt="logos" />
            </div>
            <div className="section-form">
              <p>Email</p>
              <Input
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                placeholder="Masukkan Email"
                prefix={<UserOutlined />}
                allowClear
              />
            </div>
            <div className="section-form">
              <p>Password</p>
              <Input.Password
                placeholder="Masukkan Password"
                value={state.password}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                prefix={<LockFilled />}
              />
            </div>
            <Button
              disabled={state.email === '' || state.password === ''}
              type="primary"
              block
              style={{ marginTop: 10 }}
              loading={state.isLoading}
              onClick={handleLogin}
            >
              {state.isLoading ? 'Loading' : 'Login'}
            </Button>
          </div>
        </div>
      </Meta>
    </React.Fragment>
  );
}
export default Login;
