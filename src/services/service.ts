import { AxiosRequestConfig } from 'axios';
import cookies from 'js-cookie';
import { httpImpl } from './http.service';

class Service {
  constructor(public http: httpImpl) {}

  getAccessToken(): string | undefined {
    return cookies.get('accessToken');
  }

  getRefreshToken(): string | undefined {
    return cookies.get('refreshToken');
  }

  setAccessToken(accessToken: string, expires: number) {
    cookies.set('accessToken', accessToken, { expires });
  }

  setRefreshToken(refreshToken: string, expires: number) {
    cookies.set('refreshToken', refreshToken, { expires });
  }

  get(url: string, option?: AxiosRequestConfig) {
    return this.http.get(url, option);
  }

  post(url: string, data: any, option?: AxiosRequestConfig) {
    return this.http.post(url, data, option);
  }
}

export default Service;
