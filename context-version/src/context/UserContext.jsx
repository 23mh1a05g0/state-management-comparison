import {
  createContext,
  useReducer,
} from "react";

export const UserContext =
  createContext();

const initialState = {
  name: "Vali",
  isLoggedIn: true,
};

function userReducer(
  state,
  action
) {
  switch (action.type) {

    default:
      return state;
  }
}

export function UserProvider({
  children,
}) {

  const [state] =
    useReducer(
      userReducer,
      initialState
    );

  return (
    <UserContext.Provider
      value={{ state }}
    >
      {children}
    </UserContext.Provider>
  );
}