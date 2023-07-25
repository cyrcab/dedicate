import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Layout from '../layout';
import Home from '../../pages/home';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Playlist from '../../pages/playlist';
import AuthLayout from '../layout/AuthLayout';
import MyEvents from '../../pages/myEvents';

const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: 'playlist',
        element: (
          <Layout>
            <Playlist />
          </Layout>
        ),
      },
      {
        path: 'events',
        element: (
          <Layout>
            <MyEvents />
          </Layout>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  // {
  //   path: '/register',
  //   element: <Register />,
  // },
]);

export default router;
