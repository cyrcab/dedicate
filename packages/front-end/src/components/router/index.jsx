import RequireAuth from './RequireAuth';
import Layout from '../layout';
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Playlist from '../../pages/playlist';
import MyEvents from '../../pages/myEvents';
import Users from '../../pages/users';
import Settings from '../../pages/settings';

const routes = [
  {
    element: <Layout />,

    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: 'events',
        element: (
          <RequireAuth>
            <MyEvents />
          </RequireAuth>
        ),
      },
      {
        path: 'playlist',
        element: (
          <RequireAuth>
            <Playlist />
          </RequireAuth>
        ),
      },
      {
        path: 'users',
        element: (
          <RequireAuth>
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: 'settings',
        element: (
          <RequireAuth>
            <Settings />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <h1>404</h1>,
  },
];

export default routes;
