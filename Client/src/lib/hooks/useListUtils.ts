import { useEffect, useState } from 'react';

export const useListUtils = fetchList => {
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    fetchList()
      .then((l: any[]) => setList(l))
      .catch((err: unknown) => console.error(err));
  }, []);

  /**
   * Adds a new media item to the list.
   *
   * @param {Object} item - The media item to be added.
   */
  const addToList = (item: any) => {
    setList((prevList: any) => [item, ...prevList]);
  };

  /**
   * Removes a media item from the list based on its ID.
   *
   * @param {number} id - The ID of the media item to be removed.
   */
  const removeFromList = (id: number) => {
    setList((prevList: any[]) => prevList.filter(i => i.id !== id));
  };

  /**
   * Updates the list by replacing an existing media item with a new one.
   *
   * @param {Object} item - The updated media item.
   */
  const updateList = (item: any) => {
    setList((prevList: any[]) => [
      item,
      ...prevList.filter(i => i.id !== item.id)
    ]);
  };

  return [list, addToList, removeFromList, updateList];
};
