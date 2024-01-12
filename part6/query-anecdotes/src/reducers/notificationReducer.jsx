import { createContext, useContext, useReducer } from "react";

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return "anecdote " + `'${action.payload}'` + " created!";
    case "VOTE":
      return "anecdote " + `'${action.payload}'` + " voted!";
    case "ERROR":
      return "anecdote must be 5 characters!";
    case "RESET":
      return null;
    default:
      return state;
  }
};

const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    0
  );
  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(notificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(notificationContext);
  return notificationAndDispatch[1];
};

export default notificationContext;
