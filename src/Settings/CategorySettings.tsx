import React, { KeyboardEvent, useCallback, useState } from 'react';
import { X } from 'react-feather';
import { useUserSettingsContext } from '../contexts/UserSettingsContext';

type Props = {};

const CategorySettings = (props: Props) => {
  const [categoryToAdd, setCategoryToAdd] = useState('');
  const { settings, addCategory, removeCategory } = useUserSettingsContext();

  let enteringDuplicate = false;
  if (settings) {
    const existingIndex = settings.categories.findIndex(c => {
      return c.displayName.toLowerCase() === categoryToAdd.toLowerCase();
    });

    enteringDuplicate = existingIndex !== -1;
  }

  const addMealCategory = useCallback(() => {
    if (categoryToAdd !== '' && !enteringDuplicate) {
      addCategory(categoryToAdd).then(() => {
        setCategoryToAdd('');
      });
    }
  }, [addCategory, categoryToAdd, enteringDuplicate]);

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addMealCategory();
      }
    },
    [addMealCategory]
  );

  const handleDeleteClicked = (id: string) => {
    removeCategory(id);
  };

  return (
    <>
      <h3 className="text-lg font-header">Meal Categories</h3>
      {settings && (
        <div className="border border-gray-600 rounded-sm">
          <div className="flex flex-row">
            <input
              name="addCategory"
              placeholder="Add a category"
              value={categoryToAdd}
              onChange={e => setCategoryToAdd(e.target.value)}
              className="px-2 flex-grow"
              onKeyDown={handleEnter}
            />
            <button
              onClick={addMealCategory}
              className="btn bg-primary-500 hover:bg-primary-600 rounded-none text-white"
              disabled={enteringDuplicate}>
              Add
            </button>
          </div>
          {settings?.categories.length ? (
            settings.categories.map(c => (
              <div key={c.id} className="border-t border-gray-600 flex flex-row justify-between content-center p-2">
                <span>{c.displayName}</span>
                <X className="hover:text-red-600 cursor-pointer" onClick={() => handleDeleteClicked(c.id)} />
              </div>
            ))
          ) : (
            <div className="p-8 flex justify-center italic text-gray-600">
              You have no saved meal categories. Add some categories so you can create your first randomized menu
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategorySettings;
