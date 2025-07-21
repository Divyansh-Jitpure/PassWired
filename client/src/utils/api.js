import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Backend API URL
  withCredentials: true, // Important for sending cookies (refresh token)
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔐 Checking for expired token (403) and ensure we don't retry infinitely
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ⚠️ Used a SEPARATE Axios instance to avoid infinite loop
        const refreshRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = refreshRes.data.accessToken;

        // ✅ Add new token to the original request headers
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 👉 Update default for future requests
        API.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        // 🔁 Retry the original request with new token
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        window.location.href = "/login"; // Redirect to login page
      }
    }

    return Promise.reject(error);
  },
);

export default API;
