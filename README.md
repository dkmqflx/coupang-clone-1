## 구현 과제

### 첫번째 과제

- AuthService

  - AuthService는 인증 관련 비즈니스 로직들을 다루는 모듈입니다.

  - 기본적인 코드는 아래와 같습니다.

```tsx
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

- 가장 먼저 제시된 코드를 리팩토링 해주세요.

- 이미 추가된 UserService와, 이후 추가될 수 있을 OrderService, ItemService 등을 편하고 직관적으로 대응할 수 있도록, 하나의 부모클래스를 extend 하는 방법으로 구현해주세요.

---

<br/>

### 두번째 문제

- useRequest

  - useRequest는 API request를 보내주는 모듈입니다.

  - react-query에 의존성 역전 원칙을 적용하기 위해 사용합니다.

  - 앞서 구현한 Service에 useQuery를 그대로 적용한 코드는 아래와 같습니다. (pages/index.tsx 경로에서 확인할 수 있습니다.

```tsx
import { useQuery } from 'react-query';

import { UserService } from '../src/services';

const Home: NextPage = () => {
  const { data: me } = useQuery('me', UserService.me, {
    refetchInterval: 500,
  });

  console.log('내 정보입니다', me);

  // ...
};
```

---

<br/>

## 구현 결과

### 첫번째 과제

- 첫번째 과제는 기존의 코드를 재사용성과 확장성을 고려해서 리팩토링하는 것입니다.

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

- 이를 통해 이후 추가될 수 있는 OrderService, ItemService와 같은 클래스에서도
  Service라는 하나의 부모클래스를 extend 할 수 있도록 처리했습니다.

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

<br/>

### 수정 후

- Service 클래스를 상속해서 부모 클래스의 token 및 post 요청과 관련된 함수를 사용했고 private static 변수를 사용해서 token 만료 시간을 클래스 차원에서 공통으로 사용할 수 있도록 했습니다.

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

```ts
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

<br/>

### 수정 후

- Service 클래스를 상속해서 부모 클래스의 토큰 및 get 요청과 관련된 함수를 불러서 사용했습니다.

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

<br/>

## 두번째 문제

- 문제에서 “useRequest는 API request를 보내주는 모듈입니다. react-query에 의존성 역전 원칙을 적용하기 위해 사용합니다” 라고 언급되어있습니다.

- 따라서 react-query를 직접 사용하는 것이 아니라 아래처럼 필요한 인터페이스를 새롭게 정의해었습니다.

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
