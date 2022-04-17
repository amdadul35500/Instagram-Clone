import React, { useState, useEffect, createContext, useContext } from "react";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people") || null)
  );

  const [none, setNone] = useState(true);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const handleModal = () => {
    setNone(!none);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        handleModal,
        none,
        setCurrentUser,
        setPeople,
        people,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
