// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// interface PrivateRouteProps {
//   children: React.ReactNode;
//   requireAdmin?: boolean;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireAdmin = false }) => {
//   const { currentUser } = useAuth();
  
//   if (!currentUser) {
//     // User is not logged in, redirect to login page
//     return <Navigate to="/login" />;
//   }
  
//   if (requireAdmin && !currentUser.isAdmin) {
//     // User is not an admin, redirect to home page
//     return <Navigate to="/" />;
//   }
  
//   return <>{children}</>;
// };

// export default PrivateRoute;