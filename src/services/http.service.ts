import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface httpImpl {
  get(url: string, option?: AxiosRequestConfig): AxiosPromise;

  post(url: string, data: any, option?: AxiosRequestConfig): AxiosPromise;
}

class HttpService implements httpImpl {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  get(url: string, option?: AxiosRequestConfig) {
    return this.request.get(url, option);
  }

  post(url: string, data: any, option?: AxiosRequestConfig) {
    return this.request.post(url, data, option);
  }
}

export default new HttpService();
