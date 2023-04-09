import Axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiClient {
  api: AxiosInstance;
  option: {
    contentType: string;
  };

  constructor(params: string, _option?: { contentType: string }, timeout = 30000) {
    this.option = _option
      ? _option
      : { contentType: "application/json; charset=utf-8" };

    this.api = Axios.create({
      // baseURL: 
      baseURL: `https://cors-anywhere.herokuapp.com/http://openapi.foodsafetykorea.go.kr/api/76c96a42df6b41f396f6/I2790/json/1/20/FOOD_CD=${params}`,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": this.option?.contentType,
        "Access-Control-Allow-Origin": "*"
      },
      timeout: timeout,
    });

  }

  get<T = any, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
    console.log("API get:", url, params);
    return this.api.get(url, params);
  }
  delete<T = any, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
    console.log("API delete:", url);
    return this.api.delete(url, params);
  }
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    console.log("API post:", url);
    data && console.log("body:", data);
    return this.api.post(url, data);
  }
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    console.log("API put:", url);
    data && console.log("body:", data);
    return this.api.put(url, data);
  }
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any): Promise<R> {
    console.log("API patch:", url);
    data && console.log("body:", data);
    return this.api.patch(url, data);
  }
}

export default ApiClient;
