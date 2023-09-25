import { prisma } from '@/config';

function create(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({
    data: { ticketId, value, cardIssuer, cardLastDigits },
  });
}

function get(ticketId: number) {
  return prisma.payment.findUnique({
    where: { ticketId },
    include: {
      Ticket: {
        include: {
          Enrollment: { select: { userId: true } },
        },
      },
    },
  });
}

export const paymentRepository = {
  create,
  get,
};
