import { Hotel, Payment, Ticket } from '@prisma/client';

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

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export type CardData = {
  issuer: string;
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
};

export type PaymentProcess = {
  ticketId: number;
  cardData: CardData;
};

export type InputPaymentBody = {
  ticketId: number;
  cardData: CardData;
};

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateHotel = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;