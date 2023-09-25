import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketRepository } from '@/repositories';

function getTicketsTypes() {
  return ticketRepository.findTypes();
}

async function getTickets(id: number) {
  const result = await ticketRepository.findTickets(id);
  if (result?.Ticket == null) throw notFoundError();
  return result.Ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const result = await enrollmentRepository.findEnrollmentId(userId);
  if (result?.id == null) throw notFoundError();
  return ticketRepository.createTicket(ticketTypeId, result.id);
}

export const ticketService = {
  getTicketsTypes,
  getTickets,
  createTicket,
};
