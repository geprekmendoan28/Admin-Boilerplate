import { Route, Switch } from 'react-router';
import './app.less';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import Loading from '@components/Loading';
import { Suspense, useEffect, useState } from 'react';
import Home from '@pages/Home';
import Login from '@pages/Login';
import { useHistory, useLocation } from 'react-router-dom';
import Story from '@pages/StoryPage/Story';
import AddStory from '@pages/StoryPage/Add-Story';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import EditStory from '@pages/StoryPage/EditStory';
import { useThemes } from '@context/themeContext';
import { useAuth } from '@context/authContext';
import { getUserByToken } from '@service/user';
import { notification } from 'antd';
import Tags from '@pages/Tags/Tags';
import User from '@pages/Users/User';
import AddUser from '@pages/Users/AddUser';
import EditUser from '@pages/Users/EditUser';

function App() {
  const { status } = useThemeSwitcher();
  const [isLoading, setIsLoading] = useState(true);
  const { token, handleUser } = useAuth();
  const { push } = useHistory();
  let location = useLocation();
  const { theme } = useThemes();
  useEffect(() => {
    if (token || token !== '') {
      getUserByToken()
        .then((res) => {
          if (res.data) {
            handleUser(res?.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err) {
            notification.error({
              message: 'Error while get User!',
            });
            setIsLoading(false);
          }
        });
    } else {
      push('/login');
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [token]);
  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return (
    <Switch>
      <Suspense fallback={<Loading />}>
        {isLoading || theme === '' || status === 'loading' ? (
          <Loading />
        ) : (
          <>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/story" exact component={Story} />
            <Route path="/story/add" exact component={AddStory} />
            <Route path="/story/edit/:id" exact component={EditStory} />
            <Route path="/users" exact component={User} />
            <Route path="/users/add" exact component={AddUser} />
            <Route path="/users/edit/:id" exact component={EditUser} />
            <Route path="/tags" exact component={Tags} />
          </>
        )}
      </Suspense>
    </Switch>
  );
}

export default App;
