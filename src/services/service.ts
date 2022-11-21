import cookies from 'js-cookie';
import HttpService from './http.service';

class Service extends HttpService {
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

  get(url: string, accessToken?: string) {
    return super.get(url, accessToken);
  }

  post(url: string, data: any | null, refreshToken?: string) {
    return super.post(url, data, refreshToken);
  }
}

export default Service;
