import Service from './service';
import HttpService, { httpImpl } from './http.service';

class UserService extends Service {
  constructor(public http: httpImpl) {
    super(http);
  }

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

export default new UserService(HttpService);
