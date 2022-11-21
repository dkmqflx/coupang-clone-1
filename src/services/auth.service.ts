import Service from './service';
import { userInfoType } from './types';

class AuthService extends Service {
  private static ACCESS_TOKEN_EXPIRE = 1;
  private static REFRESH_TOKEN_EXPIRE = 7;

  async refresh() {
    const refreshToken = super.getRefreshToken();

    if (!refreshToken) {
      return;
    }

    const { data } = await super.post('/auth/refresh', null, refreshToken);

    super.setAccessToken(data.access, AuthService.ACCESS_TOKEN_EXPIRE);
    super.setRefreshToken(data.refresh, AuthService.REFRESH_TOKEN_EXPIRE);
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

    super.setAccessToken(data.access, AuthService.ACCESS_TOKEN_EXPIRE);
    super.setRefreshToken(data.refresh, AuthService.REFRESH_TOKEN_EXPIRE);
  }

  async login({ email, password }: { email: string; password: string }) {
    const { data } = await super.post('/auth/login', { email, password });
    super.setAccessToken(data.access, AuthService.ACCESS_TOKEN_EXPIRE);
    super.setRefreshToken(data.refresh, AuthService.REFRESH_TOKEN_EXPIRE);
  }
}

export default new AuthService();
