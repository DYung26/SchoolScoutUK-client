import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 240000,
  headers: {
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${apiBaseUrl}/api/auth/refresh-token`, { data: { refreshToken } });
	console.log(data);
	console.log(data?.data?.accessToken);
        localStorage.setItem("accessToken", data?.data?.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data?.data?.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        alert("hold on");
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
