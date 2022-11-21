import axios, { AxiosRequestConfig } from 'axios';

class HttpService {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  get(url: string, token?: string) {
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  post(url: string, data: any, option?: AxiosRequestConfig) {
    return this.request.post(url, data, option);
  }
}

export default HttpService;
