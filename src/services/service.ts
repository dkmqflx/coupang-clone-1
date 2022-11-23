import HttpService from './http.service';

class Service extends HttpService {
  get(url: string, accessToken?: string) {
    return super.get(url, accessToken);
  }

  post(url: string, data: any | null, refreshToken?: string) {
    return super.post(url, data, refreshToken);
  }
}

export default Service;
