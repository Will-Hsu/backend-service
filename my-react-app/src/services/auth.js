import * as api from "./api";
// auth.js

export const register = async (formData) => {
  try {
    // combine firstName and lastName into name
    formData.name = `${formData.firstName} ${formData.lastName}`;
    // Call registerUser function from api.js
    const token = await api.register(formData);
    return token;
  } catch (error) {
    // Handle error
    throw error;
  }
};

export const login = async (formData) => {
  try {
    // Call loginUser function from api.js
    const token = await api.login(formData);
    // Handle successful login
    return token;
  } catch (error) {
    // Handle error
    throw error;
  }
};
