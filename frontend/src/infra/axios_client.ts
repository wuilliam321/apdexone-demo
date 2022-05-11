import { HttpClient } from "@/lib/http";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

export class AxiosClient implements HttpClient {
  async post<T = unknown, U = unknown, D = unknown>(
    uri: string,
    _config?: D,
    body?: T
  ): Promise<[Error?, U?]> {
    const res = await http.post<T, U>(uri, body);
    return [undefined, res];
  }
  async get<T = unknown, U = unknown, D = unknown>(
    uri: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _config?: D
  ): Promise<[Error?, U?]> {
    const res = await http.get<T, U, D>(uri);
    return [undefined, res];
  }
  async put<T = unknown, U = unknown, D = unknown>(
    uri: string,
    _config?: D,
    body?: T
  ): Promise<[Error?, U?]> {
    const res = await http.put<T, U>(uri, body);
    return [undefined, res];
  }
  async delete<T = unknown, U = unknown, D = unknown>(
    uri: string,
    _config?: D,
    body?: T
  ): Promise<[Error?, U?]> {
    const res = await http.delete<T, U>(uri, body);
    return [undefined, res];
  }
}
