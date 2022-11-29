import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({user, children }:any) => {
const { uid } = user
    if (!uid) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  export default ProtectedRoute;