import Service from "./service";
import HttpService, { httpImpl } from "./http.service";
import CookieService, { cookieImpl } from "./cookie.service";
import { userInfoType } from "./types";

class AuthService extends Service {
  constructor(public cookie: cookieImpl, public http: httpImpl) {
    super(CookieService, HttpService);
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  refresh = async () => {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return;
    }

    const { data } = await this.post("/auth/refresh", null, refreshToken);
    this.setAccessToken(data.access, 1);
    this.setRefreshToken(data.refresh, 7);
  };

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  signup = async ({
    email,
    password,
    name,
    phoneNumber,
    agreements,
  }: userInfoType) => {
    const { data } = await this.post("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });
    this.setAccessToken(data.access, 1);
    this.setRefreshToken(data.refresh, 7);
  };

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await this.post("/auth/login", { email, password });
    this.setAccessToken(data.access, 1);
    this.setRefreshToken(data.refresh, 7);
  };
}

export default new AuthService(CookieService, HttpService);
