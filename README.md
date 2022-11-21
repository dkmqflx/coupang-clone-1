# NUMBLE - 가장 실무에 가까운 쿠팡 클론코딩 1회차

- [1회차 : 로그인 페이지 - 좋은 ‘모듈' 설계하고 구현해보기](https://thoughtful-arch-8c2.notion.site/2e386a766d1348fc8a2774055b310386)

  - 해당링크에서 첫번째, 두번째 문제를 확인할 수 있습니다.

<br/>

## 첫번째 문제

- 첫번째 문제는 기존의 코드를 재사용성과 확장성을 고려해서 리팩토링하는 것입니다.

- 코드를 개선하기 위해서 우선 http 전송을 담당하는 클래스를 아래와 같이 정의해주었습니다.

```ts
// http.service.ts

import axios from 'axios';

class HttpService {
  private request;

  constructor() {
    this.request = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
    });
  }

  get(url: string, accessToken?: string) {
    return this.request.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  post(url: string, data: any | null, refreshToken?: string) {
    return this.request.post(url, data, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }
}

export default HttpService;
```

<br/>

- 이렇게 정의한 클래스를 AuthService, UserService 클래스에서 바로 상속하는 것이 아니라 Service라는 클래스를 정의하고 이 클래스를 AuthService, UserService 클래스에서 상속하도록 했습니다.

- 이 때 토큰을 가져오고 설정하는 함수가 AuthService, UserService 클래스에서 각각 정의되어 있었기 때문에 Service 클래스에 토큰 관련된 함수를 정의해서 상속받는 클래스에서 공통으로 사용할 수 있도록 했습니다.

- Service 클래스는 아래와 같습니다.

```ts
// service.ts

import { cookieImpl } from './cookie.service';
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
```

<br/>

- 위와 같이 코드를 정의한 이후에 기존의 AuthService와 UserService 코드를 수정하였습니다.

- 기존의 AuthService 클래스 코드는 아래처럼 수정하였습니다.

### 수정 전

```ts
// auth.service.ts

import axios from 'axios';
import cookies from 'js-cookie';

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

class AuthService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
      return;
    }

    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + '/auth/refresh',
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    cookies.set('accessToken', data.access, { expires: 1 });
    cookies.set('refreshToken', data.refresh, { expires: 7 });
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
      process.env.NEXT_PUBLIC_API_HOST + '/auth/signup',
      { email, password, name, phoneNumber, agreements }
    );

    cookies.set('accessToken', data.access, { expires: 1 });
    cookies.set('refreshToken', data.refresh, { expires: 7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_HOST + '/auth/login',
      { email, password }
    );

    cookies.set('accessToken', data.access, { expires: 1 });
    cookies.set('refreshToken', data.refresh, { expires: 7 });
  }
}

export default new AuthService();
```

### 수정 후

- 또한 Service 클래스를 상속해서 부모 클래스의 post 요청과 관련된 함수를 불러서 사용했고 private static 변수로 사용해서 token 만료 시간을 클래스 차원에서 공통으로 사용할 수 있도록 했습니다.

```ts
// auth.service.ts

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
```

<br/>

- 기존의 UserService 클래스 코드는 아래처럼 수정하였습니다.

### 수정 전

```jsx
// user.service.ts

import axios from 'axios';
import cookies from 'js-cookie';

class UserService {
  async me() {
    const accessToken = cookies.get('accessToken');
    if (!accessToken) {
      return;
    }

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_HOST + '/users/me',
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
      process.env.NEXT_PUBLIC_API_HOST + '/users/' + id
    );

    return data;
  }
}

export default new UserService();
```

### 수정 후

- 또한 Service 클래스를 상속해서 부모 클래스의 get 요청과 관련된 함수를 불러서 사용했습니다.

```ts
// user.service.ts

import Service from './service';

class UserService extends Service {
  async me() {
    const accessToken = super.getAccessToken();

    if (!accessToken) {
      return;
    }
    const { data } = await super.get('/users/me', accessToken);

    return data;
  }

  async read(id: number) {
    const { data } = await super.get(`/users/${id}`);
    return data;
  }
}

export default new UserService();
```

---

## 두번째 문제

- 문제에서 “useRequest는 API request를 보내주는 모듈입니다. react-query에 의존성 역전 원칙을 적용하기 위해 사용합니다!” 라고 언급되어있습니다.

- 따라서 react-query를 직접 사용하는 것이 아니라 추상화된 모듈을 가져다 사용할 수 있도록 아래처럼 useRequest 정의해주는 방식으로 react-query의 useQuery를 격리해주었습니다.

```jsx
// useRequest.ts

import { useQuery } from 'react-query';

type QueryOptions = {
  refetchInterval?: number,
};

export const useRequest = (
  key: string | string[],
  request: () => Promise<any>,
  option?: QueryOptions
) => {
  return useQuery(key, request, { ...option });
};
```
