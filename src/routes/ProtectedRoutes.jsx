import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PropTypes from "prop-types";
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = ({ children }) => {
    const location = useLocation();
    const token = useAuth();
    let isAuth = false;
    if(token) {
        isAuth = true;
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp) {
                  const currentTime = new Date().getTime() / 1000;
                  if(currentTime > decodedToken.exp) {
                    localStorage.clear();
                    isAuth = false;
                  }
                } 
    }
  return isAuth ? children :  <Navigate to="/" replace state={{ from: location}} />
};
ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default  ProtectedRoutes ;

