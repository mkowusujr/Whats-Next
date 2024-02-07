import { useEffect, useState } from 'react';

export const useListUtils = fetchList => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchList()
      .then(l => setList(l))
      .catch(err => console.error(err));
  }, []);

  /**
   * Adds a new media item to the list.
   *
   * @param {Object} item - The media item to be added.
   */
  const addToList = item => {
    setList(prevList => [item, ...prevList]);
  };

  /**
   * Removes a media item from the list based on its ID.
   *
   * @param {number} id - The ID of the media item to be removed.
   */
  const removeFromList = id => {
    setList(prevList => prevList.filter(i => i.id !== id));
  };

  /**
   * Updates the list by replacing an existing media item with a new one.
   *
   * @param {Object} item - The updated media item.
   */
  const updateList = item => {
    setList(prevList => [item, ...prevList.filter(i => i.id !== item.id)]);
  };

  return [list, addToList, removeFromList, updateList];
};
