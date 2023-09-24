import { prisma } from '@/config';

function findTypes() {
    return prisma.ticketType.findMany();
}

function findTickets(id: number) {
    return prisma.user.findFirst({
        where: { id },
        select: {
            Enrollment: {
                select: { Ticket: true }
            }
        }
    });
}

export const ticketRepository = {
    findTypes, findTickets
};
