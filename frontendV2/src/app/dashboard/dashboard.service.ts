import { Injectable } from "@angular/core";

@Injectable()
export class DashboardService {

  openLeads = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }];
  leadsInContact = [];
  offers = [{ id: 10 }];
  doneOffers = [];
  sales = [{ id: 11 }];

  openLeadsValue;
  inContactsValue;
  openOffersValue;
  doneOffersValue;
  closedSalesValue;

  constructor() { }

}
