import { notFoundError, unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import { ticketRepository } from "@/repositories";
import { paymentRepository } from "@/repositories/payment-repository";
import { LAST_DIGITS } from "@/utils/constants";
import { Ticket } from "@prisma/client";

async function create(userId: number, ticketId: number, cardData: CardData) {
    const result = await ticketRepository.findById(ticketId);

    if (result == null) throw notFoundError();
    if (userId !== result.Enrollment.userId) throw unauthorizedError();

    const { price } = result.TicketType;
    const { issuer, number } = cardData;
    const cardLastDigits = number.toString().slice(LAST_DIGITS);
    const payment = await paymentRepository.create(ticketId, price, issuer, cardLastDigits);

    return payment;
}

export const paymentService = {
    create
};