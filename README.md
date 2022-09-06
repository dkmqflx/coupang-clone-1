## NUMBLE - 가장 실무에 가까운 쿠팡 클론코딩 1회차

<img width="752" alt="(220531)메인이미지_쿠팡클론코딩챌린지 (1)" src="https://user-images.githubusercontent.com/103182032/174029124-6e64d0c2-fc52-48c9-bd73-b91546682242.png" style="width:100%">

[챌린지 페이지](https://www.numble.it/84b74183-c72e-4502-91c9-e41fbf0aa7aa)

이번 챌린지에서는 로그인을 위해 필요한 Data Fetching 모듈을 만들어볼게요!

주어진 Interface에 맞게 Class 및 Function들을 만들어보며 지속가능한 모듈 설계와 프론트엔드에서의 객체지향에 대해서 고민해보아요.

---

[1회차 : 로그인 페이지 - 좋은 ‘모듈' 설계하고 구현해보기](https://thoughtful-arch-8c2.notion.site/2e386a766d1348fc8a2774055b310386)

- 해당링크에서 첫번째, 두번째 문제를 확인할 수 있습니다.

---

## 첫번째 문제

- 첫번째 문제는 기존의 코드를 재사용성과 확장성을 고려해서 리팩토링하는 것입니다.
- 위 코드를 개선하기 위해서 우선 기능에 따라 http 전송 관련 클래스와 cookie 관련 클래스를 정의하는 방식으로 코드를 수정했습니다.

- http 전송을 담당하는 클래스를 아래와 같이 정의해주었습니다.

  ```jsx
  // http.service.ts

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
  ```

- 토큰을 관리하는 cookie 관련 클래스는 아래와 같이 정의해주었습니다.

  ```jsx
  // cookie.service.ts

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
  ```

- 각각의 클래스를 정의해줌으로써 기능에 따라 모듈화를 시켜주었습니다.
- 그리고 이 때 각각의 클래스는 인터페이스를 구현하도록 처리했는데 그 이유는 인터페이스를 통한 컴포지션을 통해 재사용성과 확장성을 높일 수 있기 때문입니다.
- 아래 Service 클래스를 통해서 이를 확인할 수 있습니다.
- Service 클래스는 생성자의 인자로 인터페이스 cookieImpl, httpImpl를 전달 받을 수 있도록 처리했습니다.
- 인터페이스를 구현하는 방식이 아니라, 각각의 클래스를 Dependency Injection으로 생성자에 전달하는 방식으로 처리했다면 생성자 타입이 특정한 클래스로 한정되지만, 인터페이스를 생정자의 타입으로 정해줌으로써 httpImpl, cookieImpl를 구현하는 클래스는 모두 전달될 수 있습니다.

```jsx
// service.ts

import { cookieImpl } from "./cookie.service";
import { httpImpl } from "./http.service";
import { userInfoType } from "./types";

class Service {
  constructor(public cookie: cookieImpl, public http: httpImpl) {}

  getAccessToken = () => {
    return this.cookie.getAccessToken();
  };

  getRefreshToken = () => {
    return this.cookie.getRefreshToken();
  };

  setAccessToken = (accessToken: string, expires: number) => {
    this.cookie.setAccessToken(accessToken, expires);
  };

  setRefreshToken = (refreshToken: string, expires: number) => {
    this.cookie.setRefreshToken(refreshToken, expires);
  };

  get = (url: string, accessToken?: string) => {
    return this.http.get(url, accessToken);
  };

  post = (url: string, body: userInfoType | null, refreshToken?: string) => {
    return this.http.post(url, body, refreshToken);
  };
}

export default Service;
```

---

- 위와 같이 코드를 정의한 이후에 기존의 AuthService와 UserService 코드를 수정하였습니다.

- 기존의 AuthService 클래스 코드는 아래처럼 수정하였습니다.

- 수정 전

```jsx
// auth.service.ts

import axios from "axios";
import cookies from "js-cookie";

type SignupAgreements = {
  privacy: boolean,
  ad:
    | {
        email: boolean,
        sms: boolean,
        app: boolean,
      }
    | false,
};

class AuthService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }

    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/refresh",
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/signup",
      { email, password, name, phoneNumber, agreements }
    );

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/login",
      { email, password }
    );

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }
}

export default new AuthService();
```

- 수정 후

```jsx
// auth.service.ts

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
```

---

- 기존의 UserService 클래스 코드는 아래처럼 수정하였습니다.

- 수정 전

```jsx
// user.service.ts

import axios from "axios";
import cookies from "js-cookie";

class UserService {
  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_HOST + "/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }

  async read(id: number) {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_HOST + "/users/" + id
    );

    return data;
  }
}

export default new UserService();
```

- 수정 후

```jsx
// user.service.ts

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
```

---

## 두번째 문제

- 문제에서 “useRequest는 API request를 보내주는 모듈입니다. react-query에 의존성 역전 원칙을 적용하기 위해 사용합니다!” 라고 언급되어있습니다.

- 따라서 react-query를 직접 사용하는 것이 아니라 API request를 위한 추상화된 모듈을 가져다 사용할 수 있도록 아래처럼 useRequest 정의해주는 방식으로 react-query의 useQuery를 격리해주었습니다.

```jsx
// useRequest.ts

import {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "react-query";

export const useRequest = (
  key: QueryKey,
  request: QueryFunction,
  option: UseQueryOptions
) => {
  return useQuery(key, request, { ...option });
};
```
