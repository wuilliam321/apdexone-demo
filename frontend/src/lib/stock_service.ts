import { HttpClient, HttpResponse } from "./http";
import {
  IStockService,
  ListStockParams,
  ListStockResponse,
} from "./interfaces";
import { Stock } from "./models";
// import { Validate } from "./validations";

export class StockService implements IStockService {
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async list(_params?: ListStockParams): Promise<[Error?, ListStockResponse?]> {
    const [err, res] = await this.http.get<Stock[], HttpResponse<Stock[]>>(
      "/stock",
      undefined
    );
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, new ListStockResponse(res?.data)];
    }

    return [undefined, new ListStockResponse([] as Stock[])];
  }
}
