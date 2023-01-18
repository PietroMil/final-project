import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface InputAuthRouteProps {
  children?: React.ReactNode;
}

const AuthRoute: React.FunctionComponent<InputAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        navigate("/");
      } else {
        navigate("/login");
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading)
    return (
      <div className="text-center">
        <div role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return <>{children}</>;
};

export default AuthRoute;
