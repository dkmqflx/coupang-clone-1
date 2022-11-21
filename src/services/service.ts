import { AxiosRequestConfig } from 'axios';
import { cookieImpl } from './cookie.service';
import { httpImpl } from './http.service';
import { userInfoType } from './types';

class Service {
  constructor(public cookie: cookieImpl, public http: httpImpl) {}

  getAccessToken() {
    return this.cookie.getAccessToken();
  }

  getRefreshToken = () => {
    return this.cookie.getRefreshToken();
  };

  setAccessToken = (accessToken: string, expires: number) => {
    this.cookie.setAccessToken(accessToken, expires);
  };

  setRefreshToken = (refreshToken: string, expires: number) => {
    this.cookie.setRefreshToken(refreshToken, expires);
  };

  get(url: string, option?: AxiosRequestConfig) {
    return this.http.get(url, option);
  }

  post = (url: string, body: userInfoType | null, refreshToken?: string) => {
    return this.http.post(url, body, refreshToken);
  };
}

export default Service;
