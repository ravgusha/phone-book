export interface IContact {
  key: number;
  person: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    id: number;
  };
}

export type IPerson = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  id: number;
};
