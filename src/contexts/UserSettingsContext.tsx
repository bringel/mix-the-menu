import { nanoid } from 'nanoid';
import React, { useContext, useMemo } from 'react';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import { useFirestoreDocument } from '../firebase/useFirestoreDocument';
import { collections } from '../firebaseCollections';
import { UserSettings } from '../types/UserSettings';

type UserSettingsContextValue = {
  settings: UserSettings | null | undefined;
  addCategory: (categoryName: string) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
};

const defaultSettings: UserSettings = {
  categories: [],
  startMealPlanOn: 'Sunday',
  includeLunch: true,
  includeDinner: true,
  leftoversCount: 0,
  takeoutCount: 0
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

  const [settings, settingsDocRef] = useFirestoreDocument<UserSettings>(
    collections.userSettings,
    authContext.user?.uid ?? ''
  );

  const value = useMemo(() => {
    const addCategory = (categoryName: string) => {
      if (settingsDocRef) {
        let updatedSettings = settings;
        const id = nanoid();
        const newCategory = {
          id: id,
          displayName: categoryName
        };
        if (updatedSettings) {
          updatedSettings = {
            ...updatedSettings,
            categories: [...updatedSettings.categories, newCategory]
          };
        } else {
          updatedSettings = {
            ...defaultSettings,
            categories: [newCategory]
          };
        }
        return settingsDocRef.set(updatedSettings);
      } else {
        return Promise.reject(new Error('Could not get document ref to user settings'));
      }
    };

    const removeCategory = (id: string) => {
      if (settingsDocRef && settings) {
        const updatedSettings: UserSettings = {
          ...settings,
          categories: settings.categories.filter(c => c.id !== id)
        };
        return settingsDocRef.set(updatedSettings);
      } else {
        return Promise.reject(new Error('Could not get document ref to user settings'));
      }
    };

    return {
      settings: settings,
      addCategory: addCategory,
      removeCategory: removeCategory
    };
  }, [settings, settingsDocRef]);
  return <UserSettingsContext.Provider value={value}>{props.children}</UserSettingsContext.Provider>;
};
