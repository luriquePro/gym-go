interface IApiResponse<T> {
  success: boolean;
  response: T;
}

interface IApiErrorResponseDetails {
  field: string;
  message: string;
  code: string;
}

interface IApiErrorResponseResponse {
  error: string;
  details?: Array<IApiErrorResponseDetails>;
}

export interface IApiSuccessResponse<T> extends IApiResponse<T> {
  success: true;
  response: T;
}

export interface IApiErrorResponse
  extends IApiResponse<IApiErrorResponseResponse> {
  success: false;
  response: IApiErrorResponseResponse;
}
