import { notFoundError, invalidDataError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

function getTicketsTypes() {
  return ticketsRepository.findTypes();
}

async function getTickets(id: number) {
  const result = await ticketsRepository.findTicketByEnrollmentId(id);
  if (result?.Ticket == null) throw notFoundError();
  return result.Ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw invalidDataError('ticketTypeId');
  const result = await enrollmentRepository.findEnrollmentId(userId);

  if (result?.id == null) throw notFoundError();
  // const ticketData: CreateTicketParams = {
  //   enrollmentId: enrollment.id,
  //   ticketTypeId,
  //   status: TicketStatus.RESERVED,
  // };
  // const ticket = await ticketsRepository.createTicket(ticketData);
  return ticketsRepository.createTicket(ticketTypeId, result.id);
}

export const ticketService = {
  getTicketsTypes,
  getTickets,
  createTicket,
};
