import React, { useContext, useMemo } from 'react';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import { useFirestoreDocument } from '../firebase/useFirestoreDocument';
import { collections } from '../firebaseCollections';
import { UserSettings } from '../types/UserSettings';

type UserSettingsContextValue = {
  settings: UserSettings | null | undefined;
};

export const UserSettingsContext = React.createContext<UserSettingsContextValue | null>(null);

export const useUserSettingsContext = () => {
  const v = useContext(UserSettingsContext);

  if (v === null) {
    throw new Error('useUserSettingsContext must be used inside a UserSettingsContextProvider');
  }

  return v;
};

type Props = {
  children: React.ReactNode;
};

export const UserSettingsContextProvider = (props: Props) => {
  const authContext = useAuthContext();

  const [settings] = useFirestoreDocument<UserSettings>(collections.userSettings, authContext.user?.uid ?? '');

  const value = useMemo(() => {
    return {
      settings: settings
    };
  }, [settings]);
  return <UserSettingsContext.Provider value={value}>{props.children}</UserSettingsContext.Provider>;
};
