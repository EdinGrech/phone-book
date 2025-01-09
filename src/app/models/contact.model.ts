export interface ContactSummery {
  id: number;
  name: string;
  surname: string;
}

export interface Contact extends ContactSummery {
  phone: string;
  email: string;
  address: string;
}
