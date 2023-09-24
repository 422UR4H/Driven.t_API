import { createTicket, getTickets, getTicketsTypes } from "@/controllers/ticket-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { TicketTypeId } from "@/protocols";
import { createTicketSchema } from "@/schemas/ticket-schemas";
import { Router } from "express";

const ticketsRouter = Router();
ticketsRouter
    .get('/types', getTicketsTypes)
    .get('/', getTickets)
    .post('/', authenticateToken, validateBody<TicketTypeId>(createTicketSchema), createTicket);

export { ticketsRouter };