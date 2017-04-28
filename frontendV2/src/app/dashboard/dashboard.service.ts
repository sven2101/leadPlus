import { Injectable } from "@angular/core";

@Injectable()
export class DashboardService {

  openLeads = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13];
  leadsInContact = [4, 5];
  offers = [0];
  doneOffers = [0];
  sales = [0];

  openLeadsValue;
  inContactsValue;
  openOffersValue;
  doneOffersValue;
  closedSalesValue;

  constructor() { }

}
