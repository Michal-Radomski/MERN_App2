// Save login  response > (user's name and token) to session storage
export const authenticate = (response: {data: {token: string; name: string}}, callback: () => void) => {
  if (window) {
    // console.log({window});
    // console.log("Authenticate:", response.data);
    sessionStorage.setItem("token", JSON.stringify(response.data.token)); //* Converts JS object to JSON
    sessionStorage.setItem("user", JSON.stringify(response.data.name));
  }
  callback();
};

// Access token name from session storage
export const getToken = () => {
  if (window) {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token") as string);
    } else {
      return false;
    }
  }
};

// Access user name from session storage
export const getUser = () => {
  if (window) {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user") as string); //* Converts JSON to JS object
    } else {
      return false;
    }
  }
};

// Remove token from session storage
export const logout = (callback: () => void) => {
  if (window) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
  callback();
};
