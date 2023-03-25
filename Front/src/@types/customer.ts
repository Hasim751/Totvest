import { Address } from "./address";


export type Customer = {
  id: number;
  customerId: string;
  customerCategory: string;
  customerName: string;
  tenure : string;
  investmentType : string;
  dealType : string;
  discount: number;
  minSubscription : number;
  target : number;
  enddate : string;
  docs: string;
  returnRate: string;
  video : string;
  subscribers : number;
  subscribtionDays : number;
  captialToRaise : number;
  subscriptionOffered : number;

  status: boolean
}

export type CustForm = Omit<Customer, "id" | "customerId" | "status">

export interface CustomerWithAddress extends CustForm {
  addresses: Address[];
}
