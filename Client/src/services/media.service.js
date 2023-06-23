import { ratings, sortByOptions } from "../components/FormFields";

const baseUrl = "http://localhost:3000/media";

const getSortUtils = (option) => {
  const sortOption = Object.values(sortByOptions).find(
    (o) => o.label == option
  );
  return {
    sortByProp: sortOption.sortBy,
    findNullProps: sortOption.findNullProps,
  };
};

const applyFilters = (mediaList, filters) => {
  if (filters.watchStatus != "") {
    mediaList = mediaList.filter((m) => filters.watchStatus === m.watchStatus);
  }

  if (filters.mediaType != "") {
    mediaList = mediaList.filter((m) => filters.mediaType === m.mediaType);
  }

  if (filters.sortBy.prop) {
    const { sortByProp, findNullProps } = getSortUtils(filters.sortBy.prop);

    const nullMedia = mediaList.filter(findNullProps);
    const sortedMediaList = mediaList
      .filter((m) => !findNullProps(m))
      .sort(sortByProp);

    mediaList = sortedMediaList;

    if (filters.sortBy.desc) {
      mediaList = mediaList.reverse();
    }

    mediaList = [...sortedMediaList, ...nullMedia];
  }

  return mediaList;
};

export const addMedia = (media) => {
  const apiUrl = `${baseUrl}`;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(media),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const listMedia = (filters) => {
  const apiUrl = `${baseUrl}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((mediaList) => {
      return applyFilters(mediaList, filters);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updateMedia = (media) => {
  const apiUrl = `${baseUrl}`;
  return fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(media),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const deleteMedia = (media) => {
  const apiUrl = `${baseUrl}/${media.id}`;
  return fetch(apiUrl, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
