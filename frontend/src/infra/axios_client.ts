import { HttpClient } from "@/lib/http";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

export class AxiosClient implements HttpClient {
  async post<T = any, U = any, D = any>(
    uri: string,
    _config?: D,
    body?: T
  ): Promise<[Error?, U?]> {
    const res = await http.post<T, U>(uri, body);
    return [undefined, res];
  }
  async get<T = any, U = any, D = any>(
    uri: string,
    _config?: D
  ): Promise<[Error?, U?]> {
    const res = await http.get<T, U, D>(uri);
    return [undefined, res];
  }
}
