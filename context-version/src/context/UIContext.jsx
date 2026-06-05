import {
  createContext,
  useReducer,
} from "react";

export const UIContext =
  createContext();

const initialState = {
  theme: "light",
  notification: null,
};

function uiReducer(
  state,
  action
) {
  switch (action.type) {

    default:
      return state;
  }
}

export function UIProvider({
  children,
}) {

  const [state] =
    useReducer(
      uiReducer,
      initialState
    );

  return (
    <UIContext.Provider
      value={{ state }}
    >
      {children}
    </UIContext.Provider>
  );
}