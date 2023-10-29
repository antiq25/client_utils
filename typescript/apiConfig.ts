import axios, { AxiosError } from 'axios';


export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

//  conditionally set the bearer token if the request calls for it & store the server jwt.
//  intercept if token doesnt match
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error("Error in request interceptor:", error);
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => response, error => {
  console.error(error.response?.data);
  const clientErrorMessage = error.response?.data?.forClient
      ? error.response.data.message
      : 'Something went wrong. Please try again later.';
  return Promise.reject(clientErrorMessage);
});

