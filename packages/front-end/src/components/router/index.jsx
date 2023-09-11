import RequireAuth from './RequireAuth';
import Layout from '../layout';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Playlists from '../../pages/playlist';
import PlaylistDetails from '../../pages/playlist/components/PlaylistDetails';
import MyEvents from '../../pages/myEvents';
// import Users from '../../pages/users';
import Settings from '../../pages/settings';
import CreateEvent from '../../pages/myEvents/component/CreateEvent';
import UpdateEvent from '../../pages/myEvents/component/UpdateEvent';
import EventDetails from '../../pages/myEvents/component/EventDetails';
import StyleSettings from '../../pages/settings/style';
import ProfileSettings from '../../pages/settings/profile';

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <RequireAuth>
            <MyEvents />
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
        path: '/events/create',
        element: (
          <RequireAuth>
            <CreateEvent />
          </RequireAuth>
        ),
      },
      {
        path: '/events/edit/:id',
        element: (
          <RequireAuth>
            <UpdateEvent />
          </RequireAuth>
        ),
      },
      {
        path: 'events/:id',
        element: (
          <RequireAuth>
            <EventDetails />
          </RequireAuth>
        ),
      },
      {
        path: 'playlists',
        element: (
          <RequireAuth>
            <Playlists />
          </RequireAuth>
        ),
      },
      {
        path: 'playlists/:id',
        element: (
          <RequireAuth>
            <PlaylistDetails />
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
      {
        path: 'settings/style',
        element: (
          <RequireAuth>
            <StyleSettings />
          </RequireAuth>
        ),
      },
      {
        path: 'settings/profile',
        element: (
          <RequireAuth>
            <ProfileSettings />
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
