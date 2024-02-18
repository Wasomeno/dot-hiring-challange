export type City = {
  id: string;
  name: string;
};

export type ShippingCost = {
  origin: string;
  destination: string;
  courierCosts: Courier[];
};

export type Courier = {
  code: string;
  name: string;
  costs: {
    service: string;
    description: string;
    cost: { value: string; etd: string; note: string }[];
  }[];
};
