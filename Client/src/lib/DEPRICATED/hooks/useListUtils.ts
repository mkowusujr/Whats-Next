import { useEffect, useState } from 'react';

interface WithId {
  id: number;
}

type UseListUtilsReturnType<Type> = {
  list: Type[];
  addToList: AddToList<Type>;
  removeFromList: RemoveFromList;
  updateList: UpdateList<Type>;
};

export const useListUtils = <Type extends WithId>(
  fetchList: () => Promise<Type[] | undefined>
): UseListUtilsReturnType<Type> => {
  const [list, setList] = useState<Type[]>([]);

  useEffect(() => {
    fetchList()
      .then((l: Type[] | undefined) => setList(l!))
      .catch((err: unknown) => console.error(err));
  }, []);

  /**
   * Adds a new media item to the list.
   *
   * @param {Object} item - The media item to be added.
   */
  const addToList = (item: Type) => {
    setList((prevList: Type[]) => [item, ...prevList]);
  };

  /**
   * Removes a media item from the list based on its ID.
   *
   * @param {number} id - The ID of the media item to be removed.
   */
  const removeFromList = (id: number) => {
    setList((prevList: Type[]) => prevList.filter(i => i.id !== id));
  };

  /**
   * Updates the list by replacing an existing media item with a new one.
   *
   * @param {Object} item - The updated media item.
   */
  const updateList = (item: Type) => {

    setList((prevList: Type[]) => {
      const copyList = [...prevList]
      let oldItem = copyList.find(i => i.id === item.id)
      oldItem = item
      return copyList
    }
    );
  };

  return {
    list: list,
    addToList: addToList,
    removeFromList: removeFromList,
    updateList: updateList
  };
};
