import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';

export interface Error {
  Succeeded: boolean;
  Message: string;
  Errors: any;
  Data: any;
}
const axiosClient = axios.create({
  baseURL: '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params),
  },
});

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig | any) => {
    return config;
  },
  error => {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<Error>) => {
    const originalConfig: any = error.config;
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
