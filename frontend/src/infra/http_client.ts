import { HttpClient } from "@/lib/interfaces";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

export class AxiosClient implements HttpClient {
  async post<T, U>(
    uri: string,
    _headers?: Headers,
    body?: T
  ): Promise<[Error?, U?]> {
    const res = await http.post<T, U>(uri, body);
    return [undefined, res];
  }
  async get<T>(uri: string, _headers?: Headers): Promise<[Error?, T?]> {
    const res = await http.get<T, any>(uri);
    return [undefined, res];
  }
}
