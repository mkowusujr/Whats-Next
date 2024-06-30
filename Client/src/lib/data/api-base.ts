// import toast from 'react-hot-toast';

export const apiUrl = import.meta.env.VITE_API_URI

/**
 * Makes a POST request to the specified API endpoint.
 * @param apiUrl - The URL of the API endpoint.
 * @param body - The request body in JSON format.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const postRequest = async <ReturnType, BodyType>(
  apiUrl: string,
  body: BodyType
): Promise<ReturnType | undefined> => {
  try {
    const response = await fetch(apiUrl, {
      // mode: "cors",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = (await response.json()) as ReturnType;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a GET request to the specified API endpoint.
 * @param apiUrl - The URL of the API endpoint.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const getRequest = async <Type>(
  apiUrl: string
): Promise<Type | undefined> => {
  try {
    const response = await fetch(apiUrl);
    const data = (await response.json()) as Type;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a PUT request to the specified API endpoint.
 * @param apiUrl - The URL of the API endpoint.
 * @param body - The request body in JSON format.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const updateRquest = async <ReturnType, BodyType>(
  apiUrl: string,
  body: BodyType
): Promise<ReturnType | undefined> => {
  try {
    const response = await fetch(apiUrl, {
      // mode: "cors",
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = (await response.json()) as ReturnType;
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a DELETE request to the specified API endpoint.
 * @param apiUrl - The URL of the API endpoint.
 * @returns - A promise that resolves to the response data or rejects with an error.
 */
export const deleteRequest = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl, {
      // mode: "cors",
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// export const apiToast = (apiCall: Promise<string>) => {
//   toast.promise(
//     apiCall,
//     {
//       loading: 'Loading...',
//       success: msgs => msgs,
//       error: err => `This just happened: ${err.toString()}`
//     },
//     {
//       success: {
//         duration: 3000,
//         icon: '🔥'
//       }
//     }
//   );
// };
