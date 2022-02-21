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
  GET_TICKETS_ERROR,
  SET_EDIT_TICKET,
  EDIT_TICKET_BEGIN,
  EDIT_TICKET_SUCCESS,
  EDIT_TICKET_ERROR,
  DELETE_TICKET_BEGIN,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      usertype: action.payload.usertype,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editTicketId: "",
      description: "",
      project: "",
      ticketType: "administrative",
      status: "open",
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_TICKET_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_TICKET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Ticket Created!",
    };
  }
  if (action.type === CREATE_TICKET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_TICKETS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_TICKETS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tickets: action.payload.tickets,
      totalTickets: action.payload.totalTickets,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_TICKETS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_TICKET_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_TICKET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Ticket Updated!",
    };
  }
  if (action.type === EDIT_TICKET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SET_EDIT_TICKET) {
    const ticket = state.tickets.find(
      (ticket) => ticket._id === action.payload.id
    );
    const { _id, title, description, priority, ticketType, status } = ticket;
    return {
      ...state,
      isEditing: true,
      editTicketId: _id,
      title,
      description,
      priority,
      ticketType,
      status,
    };
  }

  if (action.type === DELETE_TICKET_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_TICKETS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_TICKETS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tickets: action.payload.tickets,
      totalTickets: action.payload.totalTickets,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === GET_TICKETS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
};

export default reducer;
