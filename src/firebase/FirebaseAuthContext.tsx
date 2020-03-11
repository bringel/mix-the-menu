import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
  } from 'react';
import firebase from '../firebase';

type AuthContextValue = {
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
  const authRef = useRef(firebase.auth());
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = authRef.current.onIdTokenChanged(user => {
      setUser(user);
      setIsSignedIn(user !== null);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => {
    return {
      isSignedIn: isSignedIn,
      user: user
    };
  }, [isSignedIn, user]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
