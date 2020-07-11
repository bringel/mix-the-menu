import { useCallback, useEffect, useState } from 'react';
import firebase from '../firebase';

type SignInMode = 'popup' | 'redirect';

const useFirebaseAuth = () => {
  const [authError, setAuthError] = useState<firebase.auth.Error | null>(null);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .catch(error => {
        setAuthError(error);
      });
  }, []);

  const signInWithFacebook = useCallback((mode: SignInMode = 'redirect') => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    if (mode === 'popup') {
      return firebase.auth().signInWithPopup(fbProvider);
    } else {
      firebase.auth().signInWithRedirect(fbProvider);
    }
  }, []);

  const signInWithGoogle = useCallback((mode: SignInMode = 'redirect') => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    if (mode === 'popup') {
      return firebase.auth().signInWithPopup(googleProvider);
    } else {
      firebase.auth().signInWithRedirect(googleProvider);
    }
  }, []);

  const signInWithMicrosoft = useCallback((mode: SignInMode = 'redirect') => {
    const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

    if (mode === 'popup') {
      return firebase.auth().signInWithPopup(microsoftProvider);
    } else {
      firebase.auth().signInWithRedirect(microsoftProvider);
    }
  }, []);

  const signInWithEmail = useCallback((email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        setAuthError(error);
      });
  }, []);

  const createUserWithEmail = useCallback((email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        setAuthError(error);
      });
  }, []);

  return {
    signInWithEmail,
    createUserWithEmail,
    signInWithFacebook,
    signInWithGoogle,
    signInWithMicrosoft,
    authError
  };
};

export default useFirebaseAuth;
