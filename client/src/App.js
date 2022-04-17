import React, { useRef } from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Messanger from "./pages/Messanger";
import PeopleProfile from "./pages/PeopleProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  PrivateRoute,
  PrivateRoute2,
  PrivateRoute3,
} from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute3>
                <SignUp />
              </PrivateRoute3>
            }
          />
          <Route
            path="/login"
            element={
              <PrivateRoute2>
                <Login />
              </PrivateRoute2>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/peopleprofile" element={<PeopleProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
