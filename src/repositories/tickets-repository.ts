import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';
// import { CreateTicketParams } from '@/protocols';

function findTypes() {
  return prisma.ticketType.findMany();
}

function findTicketByEnrollmentId(id: number) {
  return prisma.enrollment.findFirst({
    where: { userId: id },
    select: { Ticket: { include: { TicketType: true } } },
  });
  // return prisma.ticket.findUnique({ // received enrollmentId in parameters
  //   where: { enrollmentId },
  //   include: { TicketType: true },
  // });
}

function findById(id: number) {
  return prisma.ticket.findUnique({
    where: { id },
    include: {
      TicketType: { select: { price: true } },
      Enrollment: { select: { userId: true } },
    },
  });
}

function createTicket(ticketTypeId: number, enrollmentId: number) { // ticket: CreateTicketParams
  return prisma.ticket.create({
    data: { ticketTypeId, enrollmentId, status: TicketStatus.RESERVED }, // data: ticket,
    include: { TicketType: true },
  });
}

function ticketProcessPayment(id: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: { id },
    data: { status },
  });
}

export const ticketsRepository = {
  findTypes,
  findTicketByEnrollmentId,
  findById,
  createTicket,
  ticketProcessPayment,
};
