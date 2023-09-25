import { Router } from 'express';
import { createTicket, getTickets, getTicketsTypes } from '@/controllers/ticket-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { TicketTypeId } from '@/protocols';
import { createTicketSchema } from '@/schemas/ticket-schemas';

const ticketsRouter = Router();
ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketsTypes)
  .get('/', getTickets)
  .post('/', validateBody<TicketTypeId>(createTicketSchema), createTicket);

export { ticketsRouter };
