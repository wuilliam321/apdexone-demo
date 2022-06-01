import { HttpClient, HttpResponse } from "./http";
import {
  IStockService,
  ListStockParams,
  ListStockResponse,
  ReportStockParams,
  ReportStockResponse,
} from "./interfaces";
import { Stock, StockRecord } from "./models";
import { Validate } from "./validations";

export class StockService implements IStockService {
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async list(_params?: ListStockParams): Promise<[Error?, ListStockResponse?]> {
    const [err, res] = await this.http.get<
      StockRecord[],
      HttpResponse<StockRecord[]>
    >("/stock", undefined);
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, new ListStockResponse(res?.data)];
    }

    return [undefined, new ListStockResponse([] as StockRecord[])];
  }

  async report(
    params?: ReportStockParams
  ): Promise<[Error?, ReportStockResponse?]> {
    let url = "/stock/report";
    if (params && params.groupBy) {
      url += `?groupBy=${params.groupBy}`;
    }
    const [err, res] = await this.http.get<Stock[], HttpResponse<Stock[]>>(
      url,
      undefined
    );
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, new ReportStockResponse(res?.data)];
    }

    return [undefined, new ReportStockResponse([] as Stock[])];
  }

  async create(stockRecord: StockRecord): Promise<[Error?, string?]> {
    const [error, isValid] = Validate.saveStockRecord(stockRecord);
    if (!isValid) {
      return [error];
    }

    const [err, res] = await this.http.post<
      StockRecord,
      HttpResponse<StockRecord>
    >("/stock", undefined, {
      code: stockRecord.code,
      product_code: stockRecord.product_code,
      quantity: stockRecord.quantity,
      category: stockRecord.category,
      size: stockRecord.size,
      color: stockRecord.color,
      amount: stockRecord.amount,
    });
    if (err) {
      return [err];
    }
    if (res && res.status === 201) {
      return [undefined, res?.data.code];
    }

    return [undefined, ""];
  }
}
