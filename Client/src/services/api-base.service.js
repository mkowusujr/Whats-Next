import toast from 'react-hot-toast';

/**
 * Makes a POST request to the specified API endpoint.
 * @param {string} apiUrl - The URL of the API endpoint.
 * @param {Object} body - The request body in JSON format.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const postRequest = async (apiUrl, body) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a GET request to the specified API endpoint.
 * @param {string} apiUrl - The URL of the API endpoint.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const getRequest = async apiUrl => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a PUT request to the specified API endpoint.
 * @param {string} apiUrl - The URL of the API endpoint.
 * @param {Object} body - The request body in JSON format.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const updateRquest = async (apiUrl, body) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * Makes a DELETE request to the specified API endpoint.
 * @param {string} apiUrl - The URL of the API endpoint.
 * @returns {Promise} - A promise that resolves to the response data or rejects with an error.
 */
export const deleteRequest = async apiUrl => {
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const apiToast = apiCall => {
  toast.promise(
    apiCall,
    {
      loading: 'Loading...',
      success: msg => msg,
      error: err => `This just happened: ${err.toString()}`
    },
    {
      success: {
        duration: 3000,
        icon: '🔥'
      }
    }
  );
};
