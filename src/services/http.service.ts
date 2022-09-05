import axios, { AxiosPromise } from "axios";
import { userInfoType } from "./types";

export interface httpImpl {
  get(url: string, accessToken?: string): AxiosPromise;

  post(
    url: string,
    option: userInfoType | null,
    refreshToken?: string
  ): AxiosPromise;
}

class HttpService implements httpImpl {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  get(url: string, accessToken?: string) {
    return this.request({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  post(url: string, body: userInfoType | null, refreshToken?: string) {
    return this.request({
      method: "post",
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }
}

export default new HttpService();
