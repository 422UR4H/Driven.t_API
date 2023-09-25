import { prisma } from "@/config";
import { CardData } from "@/protocols";

function create(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
    return prisma.payment.create({
        data: { ticketId, value, cardIssuer, cardLastDigits }
    });
}

export const paymentRepository = {
    create
};