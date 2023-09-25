import { notFoundError, unauthorizedError } from "@/errors";
import { CardData } from "@/protocols";
import { ticketRepository } from "@/repositories";
import { paymentRepository } from "@/repositories/payment-repository";
import { LAST_DIGITS } from "@/utils/constants";
import { Payment, TicketStatus } from "@prisma/client";

async function create(userId: number, ticketId: number, cardData: CardData): Promise<Payment> {
    const result = await ticketRepository.findById(ticketId);

    if (result?.id == null) throw notFoundError();
    if (userId !== result.Enrollment.userId) throw unauthorizedError();

    const { price } = result.TicketType;
    const { issuer, number } = cardData;
    const cardLastDigits = number.toString().slice(LAST_DIGITS);
    const payment = await paymentRepository.create(ticketId, price, issuer, cardLastDigits);
    
    await ticketRepository.updateTicket(ticketId, TicketStatus.PAID);
    return payment;
}

async function get(userId: number, ticketId: number): Promise<Payment> {
    const result = await paymentRepository.get(ticketId);

    if (result == null) throw notFoundError();
    if (userId !== result.Ticket.Enrollment.userId) throw unauthorizedError();

    const { Ticket, ...payment } = result;
    return payment;
}

export const paymentService = {
    create, get
};