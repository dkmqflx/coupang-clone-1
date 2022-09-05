import cookies from "js-cookie";

export interface cookieImpl {
  getAccessToken(): string | undefined;
  getRefreshToken(): string | undefined;

  setAccessToken(accessToken: string, expires: number): void;
  setRefreshToken(refreshToken: string, expires: number): void;
}

class CookieService implements cookieImpl {
  getAccessToken(): string | undefined {
    return cookies.get("accessToken");
  }

  getRefreshToken(): string | undefined {
    return cookies.get("refreshToken");
  }

  setAccessToken(accessToken: string, expires: number) {
    cookies.set("accessToken", accessToken, { expires });
  }

  setRefreshToken(refreshToken: string, expires: number) {
    cookies.set("refreshToken", refreshToken, { expires });
  }
}

export default new CookieService();
