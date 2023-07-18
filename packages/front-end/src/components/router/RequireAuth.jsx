import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

export default function RequireAuth({ children }) {
  const isSignedIn = true;
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
}
