import axios, { AxiosRequestConfig } from "axios";

export const client = axios.create({
  withCredentials: true,
  maxRedirects: 10,
  timeout: 15 * 1000,
});

client.defaults.baseURL = process.env.NEXT_PUBLIC_ENV_API_HOST;

export interface ResponseError {
  code: string; // 에러가 발생한 코드
  message: string; // 에러 발생 메세지
  key?: string; // 에러 발생 메세지 키
  object?: Record<string, string[]>;
}

export class CustomError extends Error {
  public code: string;
  public key?: string;
  public object?: Record<any, string[]>;
  public objectKey?: string;
  public objectMessage?: string;

  constructor(errData: ResponseError) {
    super(errData.message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.code = errData.code;
    this.message = errData.message;
    this.key = errData.key;
    this.object = errData.object;
    if (this.object) {
      const { key, value } = getCustomErrorValue(this.object);
      this.objectKey = key;
      this.objectMessage = value;
    }
  }
}

// customError 에 object 에러중 첫번째 값을 가져온다.
const getCustomErrorValue = <T>(errorObj: Record<any, string[]>) => {
  const key = Object.keys(errorObj)[0] as keyof T;
  if (errorObj[key] && errorObj[key].length > 0) {
    const value = errorObj[key][0];
    return { key, value };
  }
};

const INTERNAL_SERVER_ERROR_CODE = "server_internal_error";

export const request = async (options: AxiosRequestConfig) => {
  try {

    if (process.env.NODE_ENV == "test") {
      return;
    }
    if (process.env.NODE_ENV == "development" && options) {
      console.log(
        "request ",
        options.method,
        options.url,
        options.params || options.data || {},
        // options.headers,
      );
    }
    const result = await client.request(options);
    return result.data;
  } catch (error) {
    if (options.url != "/api/users/me") {
      console.log("error ", options.url, "", error.response?.data);
    }
    let detailErrorCode;
    if (!error.response) {
      detailErrorCode = 100000;
    } else if (error.response.status >= "500") {
      detailErrorCode = 100001;
    } else if (error.response.status == "403") {
      detailErrorCode = 100002;
    } else if (error.response.data && !error.response.data.message) {
      detailErrorCode = 100003;
    }
    let errData;
    if (detailErrorCode) {
      errData = {
        code: INTERNAL_SERVER_ERROR_CODE,
        message: `server internal error: (${detailErrorCode})`,
        key: null,
      };
    } else if (error.response?.data) {
      errData = error.response.data;
    } else {
      errData = {
        code: INTERNAL_SERVER_ERROR_CODE,
        message: "unknown_error_message",
        key: null,
      };
    }

    if (errData.code == INTERNAL_SERVER_ERROR_CODE) {
      console.error(error);
    }
    throw new CustomError(errData);
  }
};

export default client;