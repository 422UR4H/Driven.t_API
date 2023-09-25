export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type CEP = {
  cep: string;
};

export type TicketTypeId = {
  ticketTypeId: number;
};

export type CardData = {
  issuer: string;
  number: string;
  name: string;
  expirationDate: string;
  // expirationDate: Date;
  cvv: string
}

export type PaymentProcess = {
  ticketId: number;
  cardData: CardData;
};