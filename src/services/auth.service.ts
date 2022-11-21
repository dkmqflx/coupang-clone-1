import Service from './service';
import HttpService from './http.service';
import CookieService from './cookie.service';
import { userInfoType } from './types';

class AuthService extends Service {
  async refresh() {
    const refreshToken = super.getRefreshToken();

    if (!refreshToken) {
      return;
    }

    const { data } = await super.post('/auth/refresh', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    super.setAccessToken(data.access, 1);
    super.setRefreshToken(data.refresh, 7);
  }

  async signup({
    email,
    password,
    name,
    phoneNumber,
    agreements,
  }: userInfoType) {
    const { data } = await super.post('/auth/signup', {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    super.setAccessToken(data.access, 1);
    super.setRefreshToken(data.refresh, 7);
  }

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await super.post('/auth/login', { email, password });
    super.setAccessToken(data.access, 1);
    super.setRefreshToken(data.refresh, 7);
  }
}

export default new AuthService(CookieService, HttpService);
