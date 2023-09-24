import { ticketRepository } from "@/repositories";

function getTicketsTypes() {
    return ticketRepository.findTypes();
}

function getTickets(id: number) {
    return ticketRepository.findTickets(id);
}

export const ticketService = {
    getTicketsTypes, getTickets
};