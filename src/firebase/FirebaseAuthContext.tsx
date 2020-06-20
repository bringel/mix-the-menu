import React, {
  useContext,
  useEffect,
  useMemo,
  useState
  } from 'react';
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

export const AuthContextProvider = (props: Props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(user => {
      setUser(user);
      setIsSignedIn(user !== null);
      setInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }, []);

  const value = useMemo(() => {
    return {
      initialized: initialized,
      isSignedIn: isSignedIn,
      user: user
    };
  }, [initialized, isSignedIn, user]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
