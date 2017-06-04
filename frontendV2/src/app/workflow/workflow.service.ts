import { WorkflowUnit } from "./workflowUnit.model";
import { HttpClient } from "./../common/http-client";
import { Injectable } from "@angular/core";

const SALE_BY_INVOICE_NUMBER = "/api/rest/sales/invoice";

@Injectable()
export class WorkflowService {



  constructor(private HttpClient: HttpClient) { }

  getSaleByInvoiceNumber(invoiceNumber: string): Promise<Array<WorkflowUnit>> {
    return this.HttpClient.post(SALE_BY_INVOICE_NUMBER, { "invoiceNumber": invoiceNumber });
  }

}
