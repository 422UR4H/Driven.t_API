import { prisma } from '@/config';
import { enrollmentRepository } from './enrollments-repository';

function findTypes() {
    return prisma.ticketType.findMany();
}

function findTickets(id: number) {
    return prisma.enrollment.findFirst({
        where: { userId: id },
        select: { Ticket: true }
    });
}

function createTicket(ticketTypeId: number, enrollmentId: number) {
    return prisma.ticket.create({
        data: { ticketTypeId, enrollmentId, status: "RESERVED" }
    });
}

export const ticketRepository = {
    findTypes, findTickets, createTicket
};
