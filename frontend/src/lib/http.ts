export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  // headers: AxiosResponseHeaders;
  // config: AxiosRequestConfig<D>;
  request?: any;
}

export interface HttpClient {
  post<T = any, U = any, D = any>(
    uri: string,
    config?: D,
    body?: T
  ): Promise<[Error?, U?]>;
  get<_T = any, U = any, D = any>(
    uri: string,
    config?: D
  ): Promise<[Error?, U?]>;
  put<T = any, U = any, D = any>(
    uri: string,
    config?: D,
    body?: T
  ): Promise<[Error?, U?]>;
  delete<T = any, U = any, D = any>(
    uri: string,
    config?: D,
    body?: T
  ): Promise<[Error?, U?]>;
}
