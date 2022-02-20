import React, { useReducer, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const displayAlert = () => {
  //   dispatch({ type: DISPLAY_ALERT });
  //   clearAlert();
  // };
  // return (
  //   <AppContext.Provider value={{ ...state, displayAlert }}>
  //     {children}
  //   </AppContext.Provider>
  // );
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext };
