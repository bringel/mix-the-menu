import { nanoid } from 'nanoid';
import React, { useCallback, useState } from 'react';
import { useAuthContext } from '../firebase/FirebaseAuthContext';
import { useFirestoreDocument } from '../firebase/useFirestoreDocument';
import { collections } from '../firebaseCollections';
import { MealCategory, UserSettings } from '../types/UserSettings';

type Props = {};

const CategorySettings = (props: Props) => {
  const [categoryToAdd, setCategoryToAdd] = useState('');
  const authContext = useAuthContext();

  const [userSettings, userSettingsDocRef] = useFirestoreDocument<UserSettings>(
    collections.userSettings,
    authContext?.user?.uid ?? ''
  );

  const addCategory = useCallback(() => {
    if (categoryToAdd !== '') {
      const id = nanoid();

      const newCategory: MealCategory = {
        id: id,
        displayName: categoryToAdd
      };

      let settings = userSettings;
      if (settings) {
        if (settings.categories) {
          settings = {
            ...userSettings,
            categories: [...settings.categories, newCategory]
          };
        } else {
          settings = {
            ...userSettings,
            categories: [newCategory]
          };
        }
      } else {
        settings = {
          categories: [newCategory]
        };
      }

      userSettingsDocRef?.set(settings).then(() => {
        setCategoryToAdd('');
      });
    }
  }, [categoryToAdd, userSettings, userSettingsDocRef]);

  return (
    <>
      <h3 className="text-lg">Meal Categories</h3>
      <div className="border border-gray-600 rounded-sm">
        <div className="flex flex-row">
          <input
            name="addCategory"
            placeholder="Add a category"
            value={categoryToAdd}
            onChange={e => setCategoryToAdd(e.target.value)}
            className="px-2 flex-grow"
          />
          <button onClick={addCategory} className="btn bg-green-600 rounded-none text-white">
            Add
          </button>
        </div>
        {userSettings?.categories?.length ? (
          userSettings.categories.map(c => (
            <div key={c.id} className="p-2 border-t border-gray-600">
              {c.displayName}
            </div>
          ))
        ) : (
          <div className="p-8 flex justify-center italic text-gray-600">
            You have no saved meal categories. Add some categories so you can create your first randomized meal plan{' '}
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySettings;
