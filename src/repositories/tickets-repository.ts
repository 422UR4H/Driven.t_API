import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

function findTypes() {
  return prisma.ticketType.findMany();
}

function findTickets(id: number) {
  return prisma.enrollment.findFirst({
    where: { userId: id },
    select: { Ticket: { include: { TicketType: true } } },
  });
}

function findById(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      TicketType: { select: { price: true } },
      Enrollment: { select: { userId: true } }
    }
  });
}

function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: { ticketTypeId, enrollmentId, status: TicketStatus.RESERVED },
    include: { TicketType: true },
  });
}

function updateTicket(id: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: { id },
    data: { status }
  });
}

export const ticketRepository = {
  findTypes,
  findTickets,
  findById,
  createTicket,
  updateTicket
};
