import Joi from 'joi';
import { CardData, PaymentProcess } from '@/protocols';

export const paymentSchema = Joi.object<PaymentProcess>({
  ticketId: Joi.number().required(),
  cardData: Joi.object<CardData>({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }).required(),
  // cardData: { // the schema could be like that too
  //   issuer: Joi.string().required(),
  //   number: Joi.string().required(),
  //   name: Joi.string().required(),
  //   expirationDate: Joi.string().required(),
  //   cvv: Joi.string().required(),
  // },
});
