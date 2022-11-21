import Service from './service';
import HttpService from './http.service';
import CookieService from './cookie.service';

class UserService extends Service {
  async me() {
    const accessToken = super.getAccessToken();

    if (!accessToken) {
      return;
    }
    const { data } = await super.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async read(id: number) {
    const { data } = await super.get(`/users/${id}`);
    return data;
  }
}

export default new UserService(CookieService, HttpService);
