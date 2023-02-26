import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


interface ProtectedRouteProps {
  isLoggedIn: boolean;
  redirectPath?: string;
  children?: any;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isLoggedIn, redirectPath, children}) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath || '/'} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
