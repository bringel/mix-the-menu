import React, { useContext, useEffect, useReducer } from 'react';
import firebase from '../firebase';

type AuthContextValue = {
  initialized: boolean;
  isSignedIn: boolean;
  user: null | firebase.User;
};

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const v = useContext(AuthContext);
  if (v === null) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return v;
};

type Props = {
  children: React.ReactNode;
};

type State = {
  isSignedIn: boolean;
  user: firebase.User | null;
  initialized: boolean;
};

type TokenChangedAction = {
  type: 'tokenChanged';
  user: firebase.User | null;
};

type Actions = TokenChangedAction;

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'tokenChanged':
      return {
        ...state,
        user: action.user,
        isSignedIn: action.user !== null,
        initialized: true
      };
    default:
      return state;
  }
}

export const AuthContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    isSignedIn: false,
    user: null,
    initialized: false
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(user => {
      dispatch({
        type: 'tokenChanged',
        user: user
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};
