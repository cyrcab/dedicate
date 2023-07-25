import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
