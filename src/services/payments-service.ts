import { TicketStatus } from '@prisma/client';
import { CardData, PaymentParams } from '@/protocols';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { enrollmentRepository, paymentsRepository, ticketsRepository } from '@/repositories';

async function verifyTicketAndEnrollment(userId: number, ticketId: number) {
  if (!ticketId || isNaN(ticketId)) throw invalidDataError('ticketId');

  const ticket = await ticketsRepository.findTicketByEnrollmentId(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (ticket.Ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  return { ticket, enrollment };
}

async function getPaymentByTicketId(userId: number, ticketId: number) {
  await verifyTicketAndEnrollment(userId, ticketId);

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  return payment;
}

async function paymentProcess(ticketId: number, userId: number, cardData: CardData) {
  const { ticket } = await verifyTicketAndEnrollment(userId, ticketId);

  const paymentData: PaymentParams = {
    ticketId,
    value: ticket.Ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(ticketId, paymentData);
  await ticketsRepository.ticketProcessPayment(ticketId, TicketStatus.PAID);
  return payment;
}

export const paymentsService = {
  getPaymentByTicketId,
  paymentProcess,
};
