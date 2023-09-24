import { AuthenticatedRequest } from "@/middlewares";
import { ticketService } from "@/services/ticket-service";
import { Request, Response } from "express";

export async function getTicketsTypes(_req: Request, res: Response): Promise<void> {
    const result = await ticketService.getTicketsTypes();
    res.send(result);
}

export async function getTickets(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { userId } = req;
    const result = await ticketService.getTickets(userId);
    res.send(result);
}

export async function createTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    const result = await ticketService.createTicket(userId, ticketTypeId);
    res.send(result);
}