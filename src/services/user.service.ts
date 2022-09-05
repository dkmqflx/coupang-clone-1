import Service from "./service";
import HttpService, { httpImpl } from "./http.service";
import CookieService, { cookieImpl } from "./cookie.service";

class UserService extends Service {
  constructor(public cookie: cookieImpl, public http: httpImpl) {
    super(cookie, http);
  }

  me = async () => {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }
    const { data } = await this.get("/users/me", accessToken);
    return data;
  };

  read = async (id: number) => {
    const { data } = await this.get("/users/" + id);
    return data;
  };
}

export default new UserService(CookieService, HttpService);
