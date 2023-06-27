export const postRequest = async (apiUrl, body) => {
  try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const getRequest = async (apiUrl) => {
  try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const updateRquest = async (apiUrl, body) => {
  try {
		const response = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};

export const deleteRequest = async (apiUrl) => {
  try {
		const response = await fetch(apiUrl, {
			method: "DELETE",
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
};
