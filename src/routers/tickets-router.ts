import { getTickets, getTicketsTypes } from "@/controllers/ticket-controller";
import { Router } from "express";

const ticketsRouter = Router();
ticketsRouter
    .get('/types', getTicketsTypes)
    .get('/', getTickets);

export { ticketsRouter };