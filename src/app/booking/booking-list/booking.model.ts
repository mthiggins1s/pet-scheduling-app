
export interface Booking {
  _id?: string;
  date: string;
  times: string[];
  numVisits: number;
  totalCost: number;
  user?: {
    _id: string;
    fullName: string;
    petName: string;
  };
  createdAt?: string;
}
