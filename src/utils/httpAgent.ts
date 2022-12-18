import axios, { Method } from "axios";

class HttpAgent {
  private _headers = {};
  private _baseURL: string;

  constructor(url: string = "") {
    this._baseURL = url;
  }

  setHeaders(headers: any) {
    this._headers = { ...this._headers, ...headers };
  }

  resetHeaders() {
    this._headers = {};
  }

  request(method: Method, url: string, data?: any) {
    return new Promise<any>((resolve, reject) => {
      axios
        .request({
          baseURL: this._baseURL,
          method,
          url,
          data,
          headers: this._headers,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  }
}

export default HttpAgent;
