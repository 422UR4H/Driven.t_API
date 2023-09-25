import { CardData, PaymentProcess } from "@/protocols";
import Joi from "joi";

export const paymentSchema = Joi.object<PaymentProcess>({
	ticketId: Joi.number().integer().required(),
	cardData: Joi.object<CardData>({
		issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.date().greater('now').required(),
        cvv: Joi.number().required()
	}).required()
});