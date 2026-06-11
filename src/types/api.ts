export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

export class RequestError extends Error {
  status?: number;
  bizCode?: number;
  isCancel?: boolean;

  constructor(message: string, status?: number, bizCode?: number, isCancel?: boolean) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.bizCode = bizCode;
    this.isCancel = isCancel;
  }
}
