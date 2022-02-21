import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_TICKET_BEGIN,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  GET_TICKETS_BEGIN,
  GET_TICKETS_SUCCESS,
  SET_EDIT_TICKET,
  EDIT_TICKET_BEGIN,
  EDIT_TICKET_SUCCESS,
  EDIT_TICKET_ERROR,
  DELETE_TICKET_BEGIN,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  isEditing: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  editTicketId: "",
  title: "",
  description: "",
  project: "",
  ticketType: "",
  priority: "",
  status: "",
  createdBy: "",
  statusOptions: ["open", "closed", "archived"],
  ticketTypeOptions: ["security", "accident", "administrative", "logistic"],
  priorityOptions: ["high", "medium", "low"],
  tickets: [],
  totalTickets: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchStatus: "all",
  searchType: "all",
  searchPriority: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

// create context
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const [state, setState] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // User Register
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/users/${endPoint}`, currentUser);
      const { user, token } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // User Logout
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/users/update", currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const createTicket = async () => {
    dispatch({ type: CREATE_TICKET_BEGIN });
    try {
      const { title, description, project, ticketType, priority } = state;
      await authFetch.post("/tickets", {
        title,
        description,
        project,
        ticketType,
        priority,
      });
      dispatch({ type: CREATE_TICKET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_TICKET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getTickets = async () => {
    const { page, searchStatus, searchType, sort, searchPriority } = state;

    let url = `/tickets?page=${page}&status=${searchStatus}&ticketType=${searchType}&sort=${sort}&priority=${searchPriority}`;
    // let url = `/tickets/all`;
    console.log(url);
    dispatch({ type: GET_TICKETS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { tickets, totalTickets, numOfPages } = data;
      dispatch({
        type: GET_TICKETS_SUCCESS,
        payload: {
          tickets,
          totalTickets,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // dispatch({
      //   type: GET_TICKETS_ERROR,
      //   payload: { msg: error.response.data.msg },
      // });
    }
    clearAlert();
  };

  const setEditTicket = (id) => {
    dispatch({ type: SET_EDIT_TICKET, payload: { id } });
  };

  const editTicket = async () => {
    dispatch({ type: EDIT_TICKET_BEGIN });

    try {
      const { title, description, project, ticketType, priority } = state;
      await authFetch.patch(`/tickets/${state.editTicketId}`, {
        title,
        description,
        project,
        ticketType,
        priority,
      });
      dispatch({ type: EDIT_TICKET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_TICKET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteTicket = async (ticketId) => {
    dispatch({ type: DELETE_TICKET_BEGIN });
    try {
      await authFetch.delete(`/tickets/${ticketId}`);
      getTickets();
    } catch (error) {
      logoutUser();
    }
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        createTicket,
        handleChange,
        clearValues,
        clearFilters,
        changePage,
        getTickets,
        setEditTicket,
        editTicket,
        deleteTicket,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );

  // return (
  //   <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  // );
};

// create a custom hook for children to useContext
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
