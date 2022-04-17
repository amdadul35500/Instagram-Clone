import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useGlobalContext();
  return currentUser ? children : <Navigate to="/login" />;
};

export const PrivateRoute2 = ({ children }) => {
  const { currentUser } = useGlobalContext();
  return currentUser ? <Navigate to="/" /> : children;
};

export const PrivateRoute3 = ({ children }) => {
  const { currentUser } = useGlobalContext();
  return currentUser ? <Navigate to="/" /> : children;
};
