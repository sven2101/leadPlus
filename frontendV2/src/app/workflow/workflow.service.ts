import { User } from "./../user/user.model";
import { Address } from "./address.model";
import { WorkflowUnit } from "./workflowUnit.model";
import { HttpClient } from "./../common/http-client";
import { Injectable } from "@angular/core";
import { OrderPosition } from "./../product/order-position.model";

const SALE_BY_INVOICE_NUMBER = "/api/rest/sales/invoiceNumber";

@Injectable()
export class WorkflowService {



  constructor(private HttpClient: HttpClient) { }

  getSaleByInvoiceNumber(invoiceNumber: string): Promise<Array<WorkflowUnit>> {
    return this.HttpClient.post(SALE_BY_INVOICE_NUMBER, { "invoiceNumber": invoiceNumber });
  }

  public sumOrderPositions(array: Array<OrderPosition>): number {
    if (array == null) { return 0; }
    return Math.round(array.reduce((sum, orderPosition) => sum += (orderPosition.amount * orderPosition.netPrice), 0) * 100) / 100;
  }

  public getAddressLine(address: Address): string {
    if (address == null) {
      return "";
    }
    let addressStr = "";
    if (address.street != null && address.street !== "") {
      addressStr += address.street;
      if (address.number != null) {
        addressStr += " " + address.number;
      }
      addressStr += ", ";
    }
    if (address.city != null && address.city !== "") {
      if (address.zip != null) {
        addressStr += address.zip + " ";
      }
      addressStr += address.city;
      addressStr += ", ";
    }
    if (address.state != null && address.state !== "") {
      addressStr += address.state;
      addressStr += ", ";
    }
    if (address.country != null) {
      addressStr += address.country;
    }
    if (addressStr.endsWith(", ")) {
      addressStr = addressStr.slice(0, -2);
    }
    return addressStr;
  }

  getNameOfUser = function (user: User): string {
    if (user == null) {
      return "";
    } else if (user.firstname != null && user.firstname !== "" && user.lastname != null && user.lastname !== "") {
      return user.firstname + " " + user.lastname;
    } else {
      return user.email;
    }
  }

}
